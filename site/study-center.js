(() => {
  'use strict';
  const BASE='/StudyForge/';
  const STORE='studyforge-study-center-v1';
  const subjects=['Maths','Physics','Chemistry','Computer','English','Urdu','Pak Studies','Tarjuma-tul-Quran'];
  const seedDays=[
    {d:1,date:'2026-08-07',marks:[20,20],lessons:[['Maths','Real/imaginary parts aur complex-number division'],['Physics','Linear thermal expansion: ΔL = αL₀ΔT'],['English','Pre-Islamic society and vocabulary']]},
    {d:2,date:'2026-08-08',marks:[30,30],lessons:[['Maths','Simultaneous complex equations — Section 1.6'],['Chemistry','Internal energy aur changes of state — Chapter 14'],['Urdu','Hamd by Ameer Minai']]},
    {d:3,date:'2026-08-10',marks:[20,20],lessons:[['Computer','Operating system, controller, kernel, shell aur multi-user OS'],['Pak Studies','Nazriya aur Nazriya-e-Pakistan'],['Tarjuma-tul-Quran',"Surah Al-An'am ka taaruf aur bunyadi taleemat"]]},
    {d:4,date:'2026-08-10',marks:[21,21],lessons:[['Maths','Simultaneous complex equations revision'],['Physics','Volume, real/apparent aur gas expansion'],['English','Rights of women, orphans and slaves']]},
    {d:5,date:'2026-08-12',marks:[40,40],lessons:[['Maths','Unit 1 complete mastery'],['Chemistry','Kinetic Theory'],['Urdu','Naat — first 4 sher mastered; 5th sher pending']]},
    {d:6,date:'2026-08-13',marks:[66,66],lessons:[['Computer','Process lifecycle, multitasking, concurrency, scheduling aur FCFS'],['Pak Studies','Ideology, Islamic values aur Two-Nation Theory'],['Tarjuma-tul-Quran',"Surah Al-An'am: Tawheed, Risalat, halal/haram aur ayaat 151–153"]]},
    {d:7,date:'2026-08-14',marks:[40,40],lessons:[['Maths','Quadratic equations aur factorization when a ≠ 1'],['Physics','Specific heat capacity, latent heat, Q=mcΔT aur Q=mL'],['English','Hazrat Bilal, human equality, Last Sermon aur modern relevance']]}
  ];
  const syllabus={
    Maths:['Unit 1 · Complex Numbers','Unit 2 · Quadratic Equations and Inequalities','Unit 3 · Matrices and Determinants','Unit 4 · Functions and Graphs','Unit 5 · Algebraic Fractions','Unit 6 · Vectors in Plane','Unit 7 · Trigonometry','Unit 8 · Chords and Arcs of a Circle','Unit 9 · Tangent and Angles of a Circle','Unit 10 · Practical Geometry of Circles','Unit 11 · Information Handling','Unit 12 · Probability'],
    Physics:Array.from({length:12},(_,i)=>`Chapter ${i+10}`),
    Chemistry:Array.from({length:13},(_,i)=>`Chapter ${i+14}`),
    Computer:Array.from({length:8},(_,i)=>`Chapter ${i+1}`),
    English:Array.from({length:10},(_,i)=>`Chapter ${i+1}`),
    Urdu:Array.from({length:20},(_,i)=>`Lesson ${i+1}`),
    'Pak Studies':Array.from({length:7},(_,i)=>`Chapter ${i+1}`),
    'Tarjuma-tul-Quran':['Surah / Lesson 1','Surah / Lesson 2','Surah / Lesson 3','Surah / Lesson 4','Remaining Surahs / Lessons']
  };
  const questionBank=[
    {s:'Maths',q:'For z = −3 + 4i, find |z|.',a:'5',why:'|z| = √((-3)² + 4²) = √25 = 5.'},
    {s:'Maths',q:'Simplify (3 + 4i)/(2 − i) into a + bi form.',a:'2/5 + 11/5i',why:'Multiply numerator and denominator by 2+i.'},
    {s:'Physics',q:'In a rigid sealed container, what happens to gas volume and pressure when heated?',a:'Volume remains constant and pressure increases.',why:'Rigid container cannot expand.'},
    {s:'Physics',q:'Write the specific heat equation.',a:'Q = mcΔT',why:'Heat gained/lost = mass × specific heat × temperature change.'},
    {s:'Chemistry',q:'What happens to average kinetic energy when absolute temperature increases?',a:'It increases.',why:'Average kinetic energy is proportional to absolute temperature.'},
    {s:'Computer',q:'What is the core part of an operating system called?',a:'Kernel',why:'Kernel directly manages CPU, memory and devices.'},
    {s:'Computer',q:'What scheduling method runs processes in arrival order?',a:'FCFS',why:'First Come, First Served.'},
    {s:'English',q:'What does emancipation mean?',a:'Freedom from slavery.',why:'This was mastered in the rights-of-slaves lesson.'},
    {s:'Pak Studies',q:'State one importance of ideology for a nation.',a:'It unites the nation or gives it a distinct identity.',why:'Both were tested and mastered.'},
    {s:'Tarjuma-tul-Quran',q:"What is a central teaching of Surah Al-An'am?",a:'Tawheed / worship Allah alone.',why:'Tawheed is one of the central teachings.'}
  ];
  const defaultMistakes=[
    {type:'Maths calculation',topic:'Complex-number modulus',note:'Use √(a²+b²), not √(a+b).',status:'Corrected'},
    {type:'Physics units',topic:'Volume conversion',note:'0.012 m³ = 12 L = 12,000,000 mm³.',status:'Corrected'},
    {type:'Physics concept',topic:'Flexible heated gas',note:'Pressure remains approximately constant; volume increases.',status:'Corrected'},
    {type:'English grammar',topic:'Orphans answer',note:'After “by”, use -ing form: by protecting / by preventing.',status:'Corrected'},
    {type:'Maths sign',topic:'Division by i',note:'1/i = −i; keep standard a + bi order.',status:'Corrected'}
  ];
  const statusSeed={
    'Maths|Unit 1 · Complex Numbers':'Mastered','Maths|Unit 2 · Quadratic Equations and Inequalities':'In Progress',
    'Physics|Chapter 10':'Mastered','Physics|Chapter 11':'In Progress','Chemistry|Chapter 14':'Mastered',
    'Computer|Chapter 1':'Mastered','Computer|Chapter 2':'In Progress','English|Chapter 1':'Mastered',
    'Urdu|Lesson 1':'Mastered','Pak Studies|Chapter 1':'Mastered','Tarjuma-tul-Quran|Surah / Lesson 1':'Mastered'
  };
  const clone=o=>JSON.parse(JSON.stringify(o));
  function initial(){return {statuses:{...statusSeed},mistakes:clone(defaultMistakes),revisions:[],today:{subjects:[],minutes:150,topic:''},test:{wrong:[],history:[]},notifications:true,installed:false};}
  let state; try{state={...initial(),...JSON.parse(localStorage.getItem(STORE)||'{}')};}catch{state=initial()}
  function save(){localStorage.setItem(STORE,JSON.stringify(state));}
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const fmt=d=>new Date(d+'T12:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short'});
  const allLessons=seedDays.flatMap(x=>x.lessons.map(l=>({day:x.d,date:x.date,subject:l[0],topic:l[1],marks:`${x.marks[0]}/${x.marks[1]}`})));
  function injectAssets(){
    if(!document.querySelector('link[data-study-center]')){let l=document.createElement('link');l.rel='stylesheet';l.href=BASE+'study-center.css';l.dataset.studyCenter='1';document.head.append(l)}
    if(!document.querySelector('link[rel="manifest"]')){let m=document.createElement('link');m.rel='manifest';m.href=BASE+'manifest.webmanifest';document.head.append(m)}
    if('serviceWorker'in navigator) navigator.serviceWorker.register(BASE+'sw.js',{scope:BASE}).catch(()=>{});
  }
  function addNav(){
    const nav=document.querySelector('.sidebar nav'); if(!nav||document.getElementById('sf-center-nav')) return;
    const b=document.createElement('button'); b.id='sf-center-nav'; b.type='button'; b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM8 8h3v3H8zM13 8h3v3h-3zM8 13h3v3H8zM13 13h3v3h-3z"></path></svg> Study Center';
    b.addEventListener('click',openCenter); nav.appendChild(b);
  }
  const tabs=[['today','Today'],['syllabus','Syllabus'],['test','Test Centre'],['revision','Revision'],['mistakes','Mistake Bank'],['calendar','Calendar'],['search','Search'],['mobile','Mobile'],['notify','Notifications'],['reports','Reports']];
  let active='today',testIndex=0,testTimer=null,testLeft=120,installPrompt=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(active==='mobile')render()});
  function openCenter(){
    if(!document.getElementById('sf-center')){
      const wrap=document.createElement('div'); wrap.id='sf-center'; wrap.innerHTML='<div class="sf-center-shell"><header class="sf-center-head"><div><span>STUDYFORGE</span><h2>Study Center</h2><p>Daily plan, tests, revision aur reports — ek jagah.</p></div><button class="sf-close" aria-label="Close">×</button></header><div class="sf-tabs"></div><div class="sf-body"></div></div>';
      document.body.append(wrap); wrap.querySelector('.sf-close').onclick=()=>wrap.classList.remove('open');
      wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.classList.remove('open')});
      const t=wrap.querySelector('.sf-tabs'); tabs.forEach(([id,label])=>{const b=document.createElement('button');b.textContent=label;b.dataset.tab=id;b.onclick=()=>{active=id;render()};t.append(b)});
    }
    document.getElementById('sf-center').classList.add('open'); render();
  }
  function render(){
    const c=document.getElementById('sf-center'); if(!c)return; c.querySelectorAll('.sf-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===active));
    const body=c.querySelector('.sf-body');
    const map={today:todayView,syllabus:syllabusView,test:testView,revision:revisionView,mistakes:mistakesView,calendar:calendarView,search:searchView,mobile:mobileView,notify:notifyView,reports:reportsView};
    body.innerHTML=map[active](); wire(active,body);
  }
  function todayView(){
    const chosen=state.today.subjects||[];
    return `<section class="sf-grid two"><article class="sf-card"><span class="sf-kicker">TODAY'S STUDY</span><h3>Plan the next focused block</h3><label>Current topic<input id="sf-topic" value="${esc(state.today.topic)}" placeholder="e.g. Maths Unit 2 practice"></label><label>Target minutes<input id="sf-minutes" type="number" min="15" step="15" value="${state.today.minutes||150}"></label><div class="sf-chipbox">${subjects.map(s=>`<button class="sf-chip ${chosen.includes(s)?'on':''}" data-subject="${esc(s)}">${esc(s)}</button>`).join('')}</div><button id="sf-start-focus" class="sf-primary">Start Focus</button></article><article class="sf-card"><span class="sf-kicker">CURRENT PROGRESS</span><h3>7 recorded study days</h3><div class="sf-statrow"><div><strong>237/237</strong><span>Recorded final marks</span></div><div><strong>21</strong><span>Lesson blocks</span></div><div><strong>100%</strong><span>Recorded mastery</span></div></div><div class="sf-list">${seedDays.slice(-3).reverse().map(x=>`<div><b>D${x.d}</b><span>${fmt(x.date)} · ${x.lessons.map(l=>l[0]).join(', ')}</span><strong>${x.marks[0]}/${x.marks[1]}</strong></div>`).join('')}</div></article></section>`;
  }
  function syllabusView(){
    let total=0,done=0; Object.entries(syllabus).forEach(([s,items])=>items.forEach(i=>{total++;if(state.statuses[s+'|'+i]==='Mastered')done++}));
    return `<div class="sf-section-head"><div><span class="sf-kicker">COMPLETE SYLLABUS TRACKER</span><h3>${done}/${total} blocks mastered</h3></div><div class="sf-progress"><span style="width:${Math.round(done/total*100)}%"></span></div></div><div class="sf-accordion">${Object.entries(syllabus).map(([s,items])=>`<details ${s==='Maths'?'open':''}><summary>${esc(s)} <small>${items.filter(i=>state.statuses[s+'|'+i]==='Mastered').length}/${items.length}</small></summary><div class="sf-syllabus-list">${items.map(i=>{const key=s+'|'+i,st=state.statuses[key]||'Not Started';return `<div><span>${esc(i)}</span><select data-status="${esc(key)}"><option ${st==='Not Started'?'selected':''}>Not Started</option><option ${st==='In Progress'?'selected':''}>In Progress</option><option ${st==='Mastered'?'selected':''}>Mastered</option><option ${st==='Revision Due'?'selected':''}>Revision Due</option></select></div>`}).join('')}</div></details>`).join('')}</div>`;
  }
  function countdown(){const target=new Date('2026-08-16T19:00:00+05:00'),ms=target-Date.now();if(ms<=0)return'Test window started';const h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4);return `${h}h ${m}m remaining`;}
  function testView(){
    const q=questionBank[testIndex%questionBank.length];
    return `<section class="sf-grid two"><article class="sf-card"><span class="sf-kicker">SUNDAY · 7:00 PM</span><h3>9-Day Combined Test</h3><div class="sf-countdown">${countdown()}</div><p>One question at a time · 2 minute timer · wrong answers retest queue mein.</p><div class="sf-testbox"><div><span>Q${testIndex+1}/${questionBank.length}</span><b>${esc(q.s)}</b><strong id="sf-clock">${Math.floor(testLeft/60)}:${String(testLeft%60).padStart(2,'0')}</strong></div><h4>${esc(q.q)}</h4><textarea id="sf-answer" placeholder="Apna answer yahan likho..."></textarea><div class="sf-actions"><button id="sf-timer" class="sf-secondary">Start timer</button><button id="sf-check" class="sf-primary">Check answer</button></div><div id="sf-feedback"></div></div></article><article class="sf-card"><span class="sf-kicker">RETEST QUEUE</span><h3>${state.test.wrong.length} question(s)</h3><div class="sf-list">${state.test.wrong.length?state.test.wrong.map((x,i)=>`<div><b>${esc(x.s)}</b><span>${esc(x.q)}</span><button data-retest="${i}">Retest</button></div>`).join(''):'<p class="sf-empty">Wrong answer aaye ga to automatic yahan save hoga.</p>'}</div><hr><span class="sf-kicker">TEST HISTORY</span><div class="sf-list">${state.test.history.slice(-5).reverse().map(x=>`<div><b>${esc(x.result)}</b><span>${esc(x.s)} · ${esc(x.q)}</span><strong>${esc(x.when)}</strong></div>`).join('')||'<p class="sf-empty">No Study Center test attempts yet.</p>'}</div></article></section>`;
  }
  function revisionView(){
    const due=[]; allLessons.forEach(l=>[1,3,7].forEach(gap=>{const d=new Date(l.date+'T12:00:00');d.setDate(d.getDate()+gap);if(d<=new Date())due.push({...l,gap,due:d.toISOString().slice(0,10)})}));
    return `<section><div class="sf-section-head"><div><span class="sf-kicker">SPACED REVISION</span><h3>1 day · 3 days · 7 days · final pre-test</h3></div></div><div class="sf-table"><div class="head"><span>Due</span><span>Subject</span><span>Topic</span><span>Cycle</span><span>Action</span></div>${due.slice(-18).reverse().map((r,i)=>`<div><span>${fmt(r.due)}</span><b>${esc(r.subject)}</b><span>${esc(r.topic)}</span><span>+${r.gap} day</span><button data-revise="${i}">Mark revised</button></div>`).join('')}</div></section>`;
  }
  function mistakesView(){return `<section><div class="sf-section-head"><div><span class="sf-kicker">MISTAKE BANK</span><h3>Corrections ko marks mein convert karo</h3></div><button id="sf-add-mistake" class="sf-primary small">+ Add mistake</button></div><div class="sf-mistakes">${state.mistakes.map((m,i)=>`<article class="sf-card"><span class="sf-badge">${esc(m.type)}</span><h4>${esc(m.topic)}</h4><p>${esc(m.note)}</p><div class="sf-actions"><select data-mstatus="${i}"><option ${m.status==='Weak'?'selected':''}>Weak</option><option ${m.status==='Corrected'?'selected':''}>Corrected</option><option ${m.status==='Paper Ready'?'selected':''}>Paper Ready</option></select><button data-delete-m="${i}" class="sf-ghost">Delete</button></div></article>`).join('')}</div></section>`}
  function calendarView(){
    const year=2026,month=7,first=new Date(year,month,1),days=new Date(year,month+1,0).getDate(),offset=(first.getDay()+6)%7;let cells='';for(let i=0;i<offset;i++)cells+='<div class="blank"></div>';for(let d=1;d<=days;d++){const ds=`2026-08-${String(d).padStart(2,'0')}`,studied=seedDays.some(x=>x.date===ds),test=d===16,rev=allLessons.some(l=>{let a=new Date(l.date+'T12:00:00');a.setDate(a.getDate()+3);return a.toISOString().slice(0,10)===ds});cells+=`<div class="day ${studied?'study':''} ${test?'test':''} ${rev?'revision':''}"><strong>${d}</strong>${studied?'<small>Study</small>':test?'<small>Test</small>':rev?'<small>Revision</small>':''}</div>`}
    return `<section class="sf-grid calendar-layout"><article class="sf-card"><span class="sf-kicker">AUGUST 2026</span><h3>Study Calendar</h3><div class="sf-week"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div class="sf-calendar">${cells}</div></article><article class="sf-card"><span class="sf-kicker">CONSISTENCY</span><h3>7 study days recorded</h3><p>Green = study complete · Purple = test · Orange = revision due.</p><div class="sf-statrow"><div><strong>7</strong><span>Study days</span></div><div><strong>1</strong><span>Scheduled test</span></div><div><strong>29%</strong><span>of 24-day Aug target</span></div></div></article></section>`;
  }
  function searchView(){return `<section><div class="sf-searchbar"><input id="sf-search-input" autofocus placeholder="Search chapter, topic, question, correction..."><button id="sf-search-btn" class="sf-primary">Search</button></div><div id="sf-search-results"><p class="sf-empty">Type “modulus”, “gas”, “kernel”, “women”, “Tawheed”...</p></div></section>`}
  function mobileView(){return `<section class="sf-grid two"><article class="sf-card"><span class="sf-kicker">MOBILE APP MODE</span><h3>Install StudyForge</h3><p>Home-screen icon, fullscreen launch aur offline shell service worker ke through available hai.</p><button id="sf-install" class="sf-primary" ${installPrompt?'':'disabled'}>${installPrompt?'Install StudyForge':'Install prompt will appear when browser allows'}</button><p class="sf-note">Chrome/Edge Android par menu → Add to Home screen bhi use kar sakte ho.</p></article><article class="sf-card"><span class="sf-kicker">OFFLINE</span><h3>Core interface cached</h3><p>App shell, styles aur Study Center offline open ho sakte hain. New cross-device syncing ke liye backend zaroori hota hai; current data isi device ke local storage mein rehta hai.</p><div class="sf-status ok">PWA manifest + service worker enabled</div></article></section>`}
  function notifyView(){return `<section class="sf-grid two"><article class="sf-card"><span class="sf-kicker">NOTIFICATIONS</span><h3>Study reminders</h3><label class="sf-switch"><input id="sf-notify-toggle" type="checkbox" ${state.notifications?'checked':''}><span></span> In-app reminders enabled</label><button id="sf-enable-notify" class="sf-primary">Enable browser notifications</button><button id="sf-test-notify" class="sf-secondary">Send test notification</button></article><article class="sf-card"><span class="sf-kicker">REMINDER RULES</span><div class="sf-list"><div><b>Today plan</b><span>When Study Center opens</span></div><div><b>Revision due</b><span>1d / 3d / 7d cycles</span></div><div><b>Sunday test</b><span>16 Aug · 7 PM</span></div><div><b>Milestone</b><span>13 days to Day-20 Focus Room from current 7-day record</span></div></div><p class="sf-note">System notification scheduling while the site is fully closed needs a push backend. In-app checks work whenever StudyForge is open.</p></article></section>`}
  function reportsView(){
    const subj={};allLessons.forEach(l=>{(subj[l.subject]??={n:0});subj[l.subject].n++});
    return `<section><div class="sf-section-head"><div><span class="sf-kicker">WEEKLY / MONTHLY REPORT</span><h3>Progress snapshot</h3></div><button id="sf-print" class="sf-primary">Print / Save PDF</button></div><div id="sf-report" class="sf-grid two"><article class="sf-card"><h3>Current totals</h3><div class="sf-statrow"><div><strong>7</strong><span>Study days</span></div><div><strong>21</strong><span>Lessons</span></div><div><strong>237/237</strong><span>Final marks</span></div></div><p>Target: 1100+ Matric marks · Month 1 foundation phase.</p></article><article class="sf-card"><h3>Subject coverage</h3><div class="sf-list">${Object.entries(subj).sort((a,b)=>b[1].n-a[1].n).map(([s,v])=>`<div><b>${esc(s)}</b><span>${v.n} recorded lesson blocks</span></div>`).join('')}</div></article><article class="sf-card"><h3>Weak / revision priorities</h3><div class="sf-list">${state.mistakes.filter(m=>m.status!=='Paper Ready').slice(0,6).map(m=>`<div><b>${esc(m.type)}</b><span>${esc(m.topic)} — ${esc(m.note)}</span></div>`).join('')}</div></article><article class="sf-card"><h3>Next checkpoint</h3><p><b>9-Day Combined Test</b><br>Sunday, 16 August · 7:00 PM</p><p>${countdown()}</p></article></div></section>`
  }
  function wire(tab,body){
    if(tab==='today'){
      body.querySelectorAll('[data-subject]').forEach(b=>b.onclick=()=>{const s=b.dataset.subject,a=state.today.subjects||[];state.today.subjects=a.includes(s)?a.filter(x=>x!==s):[...a,s];save();render()});
      const topic=body.querySelector('#sf-topic'),mins=body.querySelector('#sf-minutes');topic.oninput=()=>{state.today.topic=topic.value;save()};mins.oninput=()=>{state.today.minutes=+mins.value;save()};
      body.querySelector('#sf-start-focus').onclick=()=>{active='today';const btn=body.querySelector('#sf-start-focus');let sec=25*60;btn.disabled=true;const iv=setInterval(()=>{sec--;btn.textContent=`Focus ${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`;if(sec<=0){clearInterval(iv);btn.textContent='Focus complete ✓';btn.disabled=false}},1000)};
    }
    if(tab==='syllabus') body.querySelectorAll('[data-status]').forEach(s=>s.onchange=()=>{state.statuses[s.dataset.status]=s.value;save();render()});
    if(tab==='test'){
      const clock=body.querySelector('#sf-clock');body.querySelector('#sf-timer').onclick=()=>{if(testTimer)return;testTimer=setInterval(()=>{testLeft--;if(clock)clock.textContent=`${Math.floor(testLeft/60)}:${String(testLeft%60).padStart(2,'0')}`;if(testLeft<=0){clearInterval(testTimer);testTimer=null}},1000)};
      body.querySelector('#sf-check').onclick=()=>{const q=questionBank[testIndex%questionBank.length],ans=body.querySelector('#sf-answer').value.trim(),norm=x=>x.toLowerCase().replace(/[^a-z0-9√Δ=+\-\/ ]/g,'').replace(/\s+/g,' '),good=ans&&((norm(ans).includes(norm(q.a)))||(norm(q.a).split(' ').filter(x=>x.length>3).some(k=>norm(ans).includes(k))));body.querySelector('#sf-feedback').innerHTML=`<div class="sf-feedback ${good?'good':'bad'}"><b>${good?'✓ Correct / acceptable':'Needs correction'}</b><p><strong>Paper-ready:</strong> ${esc(q.a)}</p><small>${esc(q.why)}</small></div>`;state.test.history.push({s:q.s,q:q.q,result:good?'Correct':'Correction',when:new Date().toLocaleString()});if(!good&&!state.test.wrong.some(x=>x.q===q.q))state.test.wrong.push(q);save();setTimeout(()=>{testIndex=(testIndex+1)%questionBank.length;testLeft=120;if(testTimer){clearInterval(testTimer);testTimer=null}render()},2200)};
      body.querySelectorAll('[data-retest]').forEach(b=>b.onclick=()=>{const q=state.test.wrong[+b.dataset.retest],idx=questionBank.findIndex(x=>x.q===q.q);if(idx>=0)testIndex=idx;render()});
    }
    if(tab==='revision') body.querySelectorAll('[data-revise]').forEach(b=>b.onclick=()=>{state.revisions.push({when:new Date().toISOString(),index:b.dataset.revise});save();b.textContent='Revised ✓';b.disabled=true});
    if(tab==='mistakes'){
      body.querySelectorAll('[data-mstatus]').forEach(s=>s.onchange=()=>{state.mistakes[+s.dataset.mstatus].status=s.value;save()});
      body.querySelectorAll('[data-delete-m]').forEach(b=>b.onclick=()=>{state.mistakes.splice(+b.dataset.deleteM,1);save();render()});
      body.querySelector('#sf-add-mistake').onclick=()=>{const topic=prompt('Topic / mistake name?');if(!topic)return;const note=prompt('Correction / paper-ready rule?')||'';state.mistakes.unshift({type:'Custom',topic,note,status:'Weak'});save();render()};
    }
    if(tab==='search'){
      const run=()=>{const q=body.querySelector('#sf-search-input').value.trim().toLowerCase();const corpus=[...allLessons.map(x=>({...x,text:`${x.subject} ${x.topic}`})),...state.mistakes.map(x=>({subject:x.type,topic:x.topic,text:`${x.type} ${x.topic} ${x.note}`,note:x.note})),...questionBank.map(x=>({subject:x.s,topic:x.q,text:`${x.s} ${x.q} ${x.a} ${x.why}`,note:`Answer: ${x.a} — ${x.why}`}))];const res=corpus.filter(x=>x.text.toLowerCase().includes(q)).slice(0,30);body.querySelector('#sf-search-results').innerHTML=q?(res.length?`<div class="sf-search-results">${res.map(x=>`<article class="sf-card"><span class="sf-badge">${esc(x.subject)}</span><h4>${esc(x.topic)}</h4>${x.note?`<p>${esc(x.note)}</p>`:''}</article>`).join('')}</div>`:'<p class="sf-empty">No match found.</p>'):'<p class="sf-empty">Type something to search.</p>'};body.querySelector('#sf-search-btn').onclick=run;body.querySelector('#sf-search-input').onkeydown=e=>{if(e.key==='Enter')run()};
    }
    if(tab==='mobile'){const b=body.querySelector('#sf-install');if(b&&!b.disabled)b.onclick=async()=>{installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;state.installed=true;save();render()}}
    if(tab==='notify'){
      body.querySelector('#sf-notify-toggle').onchange=e=>{state.notifications=e.target.checked;save()};
      body.querySelector('#sf-enable-notify').onclick=async()=>{if(!('Notification'in window))return alert('Browser notifications supported nahi.');const p=await Notification.requestPermission();alert('Notification permission: '+p)};
      body.querySelector('#sf-test-notify').onclick=()=>{if(Notification.permission==='granted'){navigator.serviceWorker.ready.then(r=>r.showNotification('StudyForge',{body:'Study reminder test — system working ✅',icon:BASE+'favicon.svg'}))}else alert('Pehle browser notifications enable karo.')};
    }
    if(tab==='reports') body.querySelector('#sf-print').onclick=()=>window.print();
  }
  function boot(){injectAssets();addNav();setInterval(addNav,1500);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
