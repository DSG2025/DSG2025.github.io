const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const code = fs.readFileSync('assets/js/custom-trip.js', 'utf8');
const travelersInput = fs.readFileSync('custom-trip/index.html', 'utf8').match(/<input\b[^>]*\bid="travelers"[^>]*>/)[0];
assert(!/\s(?:value|required)(?:\s|=|>)/.test(travelersInput), 'Travelers must start empty and remain optional');
function run(key, {restored=false,type='navigate',throws=false,durationDefault='Not sure yet'}={}) {
 const handlers={}, states={};
 for(const id of ['customExperienceStatus','customExperiencePrefill','customExperienceFallback','customExperienceMessage','customExperienceReopen','customExperienceCopy'])states[id]={hidden:true,value:'',textContent:'',addEventListener(){},focus(){},select(){}};
 const dest=['Saigon','Cu Chi','Tay Ninh','Vung Tau','Mekong','Not sure yet'].map(value=>({value,checked:restored&&value==='Vung Tau'}));
 const interests=['History','Food','Local life'].map(value=>({value,checked:false}));const button={disabled:false};
 const form={elements:{tripIdea:{value:restored?'Only Vung Tau':''},tripDate:{value:''},travelers:{value:'',defaultValue:''},duration:{value:durationDefault,options:[{value:durationDefault}]}},querySelector:()=>button,querySelectorAll(s){const a=s.includes('destination')?dest:s.includes('interest')?interests:[...dest,...interests];return s.includes(':checked')?a.filter(x=>x.checked):a;},addEventListener:(t,f)=>handlers[t]=f};
 const document={body:{classList:{add(){}}},querySelector:s=>s==='#customExperienceForm'?form:states[s.slice(1)]};let features, openCount=0;
 vm.runInNewContext(code,{document,window:{location:{search:'?from='+encodeURIComponent(key)},performance:{getEntriesByType:()=>[{type}]},open:(u,t,f)=>{features=f;openCount++;if(throws)throw Error('blocked');return null},setTimeout:f=>f(),OG_SAIGON_SITE_DATA:{contact:{whatsappNumber:'84938033395'}}},URLSearchParams,encodeURIComponent,navigator:{}});
 const selected=dest.filter(x=>x.checked).map(x=>x.value);
 handlers.submit({preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(openCount,1);assert.equal(states.customExperienceFallback.hidden,false);
 for(const value of ['', '4', '']){form.elements.travelers.value=value;handlers.input();const expected=`Travelers: ${value || 'Not decided yet'}\n`;assert(states.customExperienceMessage.value.includes(expected));assert(new URL(states.customExperienceReopen.href).searchParams.get('text').includes(expected));}
 assert.equal(openCount,1, 'Editing travelers must not submit again');assert.equal(features,'noopener');assert.match(states.customExperienceReopen.href,/^https:\/\/wa.me\/84938033395\?text=/);
 states.customExperienceStatus.textContent='Message copied. Paste it into WhatsApp and tap Send.';
 form.elements.tripIdea.value='Changed after submit';handlers.input();handlers.change();assert.equal(states.customExperienceStatus.textContent,'Message copied. Paste it into WhatsApp and tap Send.');assert.match(states.customExperienceMessage.value,/Changed after submit/);assert.match(decodeURIComponent(states.customExperienceReopen.href),/Changed after submit/);
 return {selected,states};
}
assert.deepEqual(run('cu-chi-tunnels').selected,['Cu Chi']);
assert.deepEqual(run('cu-chi-war-museum').selected,['Saigon','Cu Chi']);
assert.deepEqual(run('hidden-saigon').selected,['Saigon']);
assert.deepEqual(run('transport').selected,[]);
const restored=run('cu-chi-tunnels',{restored:true});
assert.deepEqual(restored.selected,['Vung Tau']);assert.equal(restored.states.customExperiencePrefill.hidden,true);assert.match(restored.states.customExperienceMessage.value,/Started from: Cu Chi Tunnels experience/);
assert.equal(run('cu-chi-tunnels').states.customExperiencePrefill.hidden,false);
assert.deepEqual(run('cu-chi-tunnels',{durationDefault:'Help me decide'}).selected,['Cu Chi']);
for(const type of ['reload','back_forward']){const result=run('cu-chi-tunnels',{type});assert.deepEqual(result.selected,[]);assert.equal(result.states.customExperiencePrefill.hidden,true);}
for(const key of ['constructor','__proto__','<script>alert(1)</script>'])assert.equal(run(key).states.customExperiencePrefill.hidden,true);
run('hidden-saigon',{throws:true});
console.log('PASS: four prefills, restored choices, reload/back, unknown keys, noopener, blocked/throwing open, live fallback sync, accurate prefill note, stable status after edits, renamed duration default, optional empty travelers, empty/4/cleared WhatsApp text, one open per submit.');
