import fs from 'node:fs/promises';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import * as yaml from 'js-yaml';
import MarkdownIt from 'markdown-it';
const root=process.cwd(), out=path.join(root,'dist');
const engine=new Liquid({root:path.join(root,'_includes'),jekyllInclude:true});
engine.registerFilter('jsonify',JSON.stringify);
const markdown=new MarkdownIt({html:true});
function front(s){const m=s.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);return m?{data:yaml.load(m[1])||{},body:s.slice(m[0].length)}:{data:{},body:s};}
const config=yaml.load(await fs.readFile('_config.yml','utf8'));
// Match Jekyll's configured timezone rather than the preview host timezone.
process.env.TZ = config.timezone || 'UTC';
const stories=[];
for(const name of await fs.readdir('_stories')){if(!name.endsWith('.md'))continue;const f=front(await fs.readFile('_stories/'+name,'utf8'));if(f.data.published!==true)continue;stories.push({...config.defaults[0].values,...f.data,url:'/stories/'+name.slice(0,-3)+'/',body:f.body});}
const site={...config,stories,time:new Date()};
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
async function write(rel,s){const dest=path.join(out,rel);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,s);}
function noindex(s){return s.replace(/<meta\s+name=["']robots["'][^>]*>/gi,'').replace('</head>','<meta name="robots" content="noindex, nofollow">\n</head>');}
async function walk(dir=''){for(const e of await fs.readdir(path.join(root,dir),{withFileTypes:true})){if(e.name.startsWith('.')||e.name.startsWith('_')||['node_modules','dist'].includes(e.name))continue;const rel=path.join(dir,e.name);if(e.isDirectory()){if(e.name==='assets'){await fs.cp(path.join(root,rel),path.join(out,rel),{recursive:true});}else await walk(rel);}else if(e.name.endsWith('.html')){const f=front(await fs.readFile(path.join(root,rel),'utf8'));await write(rel,noindex(await engine.parseAndRender(f.body,{site,page:f.data})));}else if(/\.(png|ico|webmanifest)$/.test(e.name)){await fs.copyFile(path.join(root,rel),path.join(out,rel));}}}
await walk();
const layout=await fs.readFile('_layouts/story.html','utf8');
for(const story of stories){if (await fs.stat(path.join(out,story.url,'index.html')).catch(()=>null)) throw new Error('Duplicate story output: '+story.url); const content=markdown.render(await engine.parseAndRender(story.body,{site,page:story}));await write(story.url.slice(1)+'index.html',noindex(await engine.parseAndRender(layout,{site,page:story,content})));}
await write('robots.txt','User-agent: *\nDisallow: /\n');
console.log(`Preview built with ${stories.length} published stories. Source CSS, JS and images preserved.`);
