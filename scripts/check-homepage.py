"""Static homepage/build checks. Does not claim browser/layout verification."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urljoin, urlsplit, unquote
import json, re, subprocess

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist'
class Element:
    def __init__(self,tag='',attrs=(),parent=None):
        self.tag=tag;self.attrs=dict(attrs);self.parent=parent;self.children=[];self.parts=[]
    def all(self,tag=None,cls=None,id=None):
        found=[]
        for child in self.children:
            if (tag is None or child.tag==tag) and (cls is None or cls in child.attrs.get('class','').split()) and (id is None or child.attrs.get('id')==id): found.append(child)
            found.extend(child.all(tag,cls,id))
        return found
    @property
    def text(self):return ''.join(self.parts)
class Document(HTMLParser):
    VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
    def __init__(self,text):
        super().__init__(convert_charrefs=True);self.root=Element();self.current=self.root;self.feed(text)
    def handle_starttag(self,tag,attrs):
        node=Element(tag,attrs,self.current);self.current.children.append(node)
        if tag not in self.VOID:self.current=node
    def handle_startendtag(self,tag,attrs):
        self.handle_starttag(tag,attrs)
        if tag not in self.VOID:self.handle_endtag(tag)
    def handle_endtag(self,tag):
        p=self.current
        while p.parent:
            if p.tag==tag:self.current=p.parent;return
            p=p.parent
    def handle_data(self,data):
        p=self.current
        while p:p.parts.append(data);p=p.parent

docs={p:Document(p.read_text()).root for p in OUT.rglob('*.html')}
errors=[];links=0;images=0;schemas=0
for p,doc in docs.items():
    ids=[x.attrs['id'] for x in doc.all() if 'id' in x.attrs]
    errors += [f'{p}: duplicate ID {id}' for id,n in Counter(ids).items() if n>1]
    assert len(doc.all('header'))==1 and len(doc.all('footer'))==1,p
    for script in doc.all('script'):
        if script.attrs.get('type')=='application/ld+json':json.loads(script.text);schemas+=1
    for node in doc.all():
        if node.tag=='img':
            images+=1
            assert node.attrs.get('alt') and node.attrs.get('width') and node.attrs.get('height'),(p,node.attrs)
        for key in ('src','href'):
            value=node.attrs.get(key,'')
            if not value:continue
            u=urlsplit(urljoin('/'+str(p.relative_to(OUT)),value))
            if u.scheme or u.netloc:continue
            target=OUT/unquote(u.path).lstrip('/')
            if target.is_dir():target=target/'index.html'
            if not target.exists():errors.append(f'{p.relative_to(OUT)}: missing {value}');continue
            links+=1
            if u.fragment and target.suffix=='.html':
                if not docs[target].all(id=unquote(u.fragment)):errors.append(f'{p.relative_to(OUT)}: missing anchor {value}')
assert not errors,'\n'.join(errors)
home=docs[OUT/'index.html']
assert 'home-intro-active' not in home.all('body')[0].attrs.get('class','').split(), 'No-JS footer contact must stay visible'
def one(id):return home.all(id=id)[0]
assert home.all('h1')[0].text=='See Saigon through local eyes.'
hero=one('home-hero');grid=hero.all(cls='hero-grid')[0]
assert [n.attrs.get('class') for n in grid.children]==['hero-intro','hero-media','hero-body']
assert len(hero.all('img'))==1 and len(hero.all('a'))==2
assert hero.all('a')[0].attrs['href']=='/custom-trip/#trip-builder'
assert len(one('home-intro').all('section'))==2
assert len(one('trust').all(cls='trust-item'))==3
proof=one('trust').all('a')[0]
assert proof.attrs['data-review-platform']=='tripadvisor'
assert not re.search(r'\d',proof.text),'Trust must not keep its own numeric rating/count'
assert len(one('start-here').all(cls='intent-card'))==4
assert not home.all(cls='intent-num') and not home.all(cls='intent-link')
assert [a.attrs['href'] for a in one('start-here').all(cls='intent-card')]==['/experiences/cu-chi-tunnels/','/experiences/hidden-saigon/','/custom-trip/#trip-builder','/transport/']
assert len(one('featured-experiences').all('article'))==2
assert not one('featured-experiences').all(cls='card')
assert len(one('meet-duy').all(cls='founder-principles')[0].children)==3
assert len(one('meet-duy').all('img'))==1
assert one('meet-duy').all('img')[0].attrs['src']=='/assets/images/duy-guiding-guests-cu-chi-tunnels.webp'
assert len(one('traveler-reviews').all('article'))==2
assert 'Casandra' not in home.text
assert len(one('traveler-reviews').all(cls='review-platform-proof'))==3
maps_url='https://maps.app.goo.gl/WbifDsGKfHmSeFuR7'
review_maps=[a for a in one('traveler-reviews').all('a') if a.attrs.get('href')==maps_url]
assert len(review_maps)==1 and review_maps[0].text=='View OG Saigon on Google Maps →'
for doc in docs.values():
    footer_maps=[a for a in doc.all('footer')[0].all('a') if a.attrs.get('href')==maps_url]
    assert len(footer_maps)==1 and footer_maps[0].text=='Google Maps'
    for a in footer_maps+review_maps:
        assert a.attrs.get('target')=='_blank' and 'noopener' in a.attrs.get('rel','').split()
        assert not any(k.startswith('data-review') or k=='data-platform-link' for k in a.attrs)

assert [n.text for n in one('faq').all('summary')]==['Are OG Saigon experiences private?','Can you customize an itinerary?','Do you provide hotel pickup?','How do I book?']
assert len(one('plan-your-saigon').all('li'))==3
cards=one('stories').all(cls='story-card')
assert len(cards)==2
assert [c.all('a')[0].attrs['href'] for c in cards]==['/stories/district-4-saigon-alleys/','/stories/cu-chi-without-crawling/']
assert not home.all(id='rain-story') and not home.all(id='how-it-works') and not home.all(id='og-approach')
rain='/stories/saigon-doesnt-stop-when-it-rains/'
assert rain not in [n.attrs.get('href') for n in home.all('a')]
assert rain in [n.attrs.get('href') for n in docs[OUT/'stories/index.html'].all('a')]
rainmain=docs[OUT/rain.lstrip('/')/'index.html'].all(id='main-content')[0]
assert len(rainmain.all('img'))==5
expected={'saigon-rain-food-tour-local-host.webp','saigon-rain-street-food-toast.webp','banh-mi-preparation-saigon-local-stall.webp','og-saigon-guests-banh-mi-local-shop.webp','saigon-rainy-night-street-reflections.webp'}
assert {Path(n.attrs['src']).name for n in rainmain.all('img')}==expected
selected=[]
for p in (ROOT/'_stories').glob('*.md'):
    if re.search(r'^homepage: true$',p.read_text(),re.M):selected.append(p.stem)
assert sorted(selected)==['cu-chi-without-crawling','district-4-saigon-alleys']
assert len(docs[OUT/'stories/index.html'].all(cls='story-index-card'))==6
assert not list((ROOT/'stories').glob('*/index.html'))
# Contract frozen by the user: compare against the reviewed CTA/form baseline.
base='9cca0cd841a176dad81fd6aa1006380f5f0cbe74'
protected=['_includes/site-header.html','_includes/site-footer.html','_layouts/story.html','assets/css/style.css','assets/css/custom-trip.css','assets/css/stories.css','assets/js/main.js','assets/js/site-data.js','assets/js/custom-trip.js','custom-trip/index.html','experiences/index.html','experiences/cu-chi-tunnels/index.html','experiences/cu-chi-war-museum/index.html','experiences/hidden-saigon/index.html','transport/index.html','sitemap.xml','robots.txt']
baseline_available=subprocess.run(['git','cat-file','-e',base],cwd=ROOT,capture_output=True).returncode==0
if baseline_available:
    for name in protected:
        old=subprocess.check_output(['git','show',base+':'+name],cwd=ROOT)
        # User-approved footer location standardization on 2026-10-06.
        if name=='_includes/site-footer.html':
            old=old.replace(b'Ho Chi Minh City, Vietnam',b'Saigon, Vietnam').replace(b'Sai Gon, Vietnam',b'Saigon, Vietnam')
            old=old.replace(b'<p class="footer-muted">Saigon, Vietnam</p>',b'<p><a href="https://maps.app.goo.gl/WbifDsGKfHmSeFuR7" rel="noopener" target="_blank">Google Maps</a></p>\n<p class="footer-muted">Saigon, Vietnam</p>')
        assert (ROOT/name).read_bytes()==old,'Changed protected source: '+name
    oldhome=subprocess.check_output(['git','show',base+':index.html'],cwd=ROOT,text=True)
    assert re.search(r'<head>[\s\S]*?</head>',oldhome)[0]==re.search(r'<head>[\s\S]*?</head>',(ROOT/'index.html').read_text())[0]
else:
    print('NOT VERIFIED: protected-source comparison, baseline commit unavailable in this checkout.')
print(f'PASS: {len(docs)} pages, {links} local links/assets/anchors, {images} image references, {schemas} JSON-LD blocks, unique IDs, one header/footer per page.')
print('PASS: homepage structure, 2 selected stories, 6 index stories, 5 rain photos, no duplicate story sources.')
print('NOT VERIFIED: actual Jekyll build, browser computed layout at 1440/390, physical mobile/in-app browsers.')

if baseline_available:print('PASS: protected source matches baseline with approved footer location and Google Maps link changes; homepage metadata/schema unchanged.')

print('PASS: exact Google Maps URL in homepage reviews and all shared footers; safe new-tab attributes; no Google rating binding.')
