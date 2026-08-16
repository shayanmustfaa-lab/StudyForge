(() => {
  'use strict';
  const BASE_STORE='studyforge-study-center-v1';
  const PLUS_STORE='studyforge-study-center-plus-v1';
  const DAY_STORE='studyforge-day9-2026-08-16';
  const day9={
    day:9,
    date:'2026-08-16',
    marks:[49,49],
    lessons:[
      ['Computer','RAM, virtual memory, process vs thread, multithreading and system calls'],
      ['Pak Studies','Chaudhry Rehmat Ali, Muslim economic deprivation and Quaid-e-Azam’s practical political struggle'],
      ['Tarjuma-tul-Quran','Surah Al-A’raf: introduction, core themes, Adam/Iblees, repentance, libas, israf, halal rizq and A’raf']
    ],
    extra:['Maths Unit 2 extra practice: completing square, quadratic formula, discriminant, graphical roots and coordinate-axis intersections']
  };
  const read=(k,f={})=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch{return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));

  // Seed Day 9 state before the normal Study Center modules read localStorage.
  if(!localStorage.getItem(DAY_STORE)){
    const base=read(BASE_STORE,{});
    base.statuses=base.statuses||{};
    base.statuses['Computer|Chapter 1']='Mastered';
    base.statuses['Pak Studies|Chapter 1']='Mastered';
    base.statuses['Tarjuma-tul-Quran|Surah / Lesson 2']='In Progress';
    base.mistakes=Array.isArray(base.mistakes)?base.mistakes:[];
    const corrected=[
      {type:'Maths method',topic:'Completing square form',note:'For x²+bx, add (b/2)² and write the left side as (x+b/2)². Do not use (x+b)².',status:'Corrected'},
      {type:'Maths sign',topic:'Quadratic square-root step',note:'When taking square root of both sides, include ± before solving the two cases.',status:'Corrected'},
      {type:'Maths graph',topic:'Axis intersection point form',note:'x-axis intersection is written (x,0); y-axis intersection is written (0,y).',status:'Corrected'}
    ];
    corrected.forEach(m=>{if(!base.mistakes.some(x=>x.topic===m.topic))base.mistakes.unshift(m)});
    write(BASE_STORE,base);

    const plus=read(PLUS_STORE,{});
    plus.studyDates=Array.isArray(plus.studyDates)?plus.studyDates:[];
    if(!plus.studyDates.includes('2026-08-16'))plus.studyDates.push('2026-08-16');
    if(!plus.day9BaselineAdded){
      plus.earnedXP=(Number(plus.earnedXP)||0)+209;
      plus.day9BaselineAdded=true;
    }
    write(PLUS_STORE,plus);
    write(DAY_STORE,day9);
  }

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const findKicker=(text)=>[...document.querySelectorAll('#sf-center .sf-kicker')].find(x=>x.textContent.trim()===text);

  function patchToday(){
    const k=findKicker('CURRENT PROGRESS');if(!k)return;
    const card=k.closest('.sf-card');if(!card)return;
    const h=card.querySelector('h3');if(h)h.textContent='8 recorded study days';
    const stats=card.querySelectorAll('.sf-statrow strong');
    if(stats[0])stats[0].textContent='286/286';if(stats[1])stats[1].textContent='24';if(stats[2])stats[2].textContent='100%';
    const list=card.querySelector('.sf-list');
    if(list&&!list.querySelector('[data-day9-row]')){
      const row=document.createElement('div');row.dataset.day9Row='1';
      row.innerHTML='<b>D9</b><span>16 Aug · Computer, Pak Studies, Tarjuma-tul-Quran</span><strong>49/49</strong>';
      list.prepend(row);
      if(!card.querySelector('[data-day9-extra]')){
        const p=document.createElement('p');p.dataset.day9Extra='1';p.className='sf-note';
        p.textContent='Extra practice: Maths Unit 2 — completing square, quadratic formula, discriminant, graphical roots and axis intersections.';
        card.appendChild(p);
      }
    }
  }

  function patchCalendar(){
    const k=findKicker('CONSISTENCY');if(!k)return;
    const card=k.closest('.sf-card');if(card){
      const h=card.querySelector('h3');if(h)h.textContent='8 study days recorded';
      const stats=card.querySelectorAll('.sf-statrow strong');if(stats[0])stats[0].textContent='8';if(stats[2])stats[2].textContent='33%';
    }
    document.querySelectorAll('#sf-center .sf-calendar .day').forEach(d=>{
      if(d.querySelector('strong')?.textContent.trim()==='16'){
        d.classList.add('study','test');
        const sm=d.querySelector('small');if(sm)sm.textContent='Study + Test';
      }
    });
  }

  function patchReports(){
    const report=document.querySelector('#sf-center #sf-report');if(!report)return;
    const cards=report.querySelectorAll(':scope > .sf-card');
    const totals=[...cards].find(c=>c.querySelector('h3')?.textContent.trim()==='Current totals');
    if(totals){const s=totals.querySelectorAll('.sf-statrow strong');if(s[0])s[0].textContent='8';if(s[1])s[1].textContent='24';if(s[2])s[2].textContent='286/286'}
    const coverage=[...cards].find(c=>c.querySelector('h3')?.textContent.trim()==='Subject coverage');
    coverage?.querySelectorAll('.sf-list > div').forEach(r=>{
      const name=r.querySelector('b')?.textContent.trim();
      if(['Computer','Pak Studies','Tarjuma-tul-Quran'].includes(name)){
        const span=r.querySelector('span');if(span)span.textContent='3 recorded lesson blocks';
      }
    });
  }

  function patchNotify(){
    const k=findKicker('REMINDER RULES');if(!k)return;
    k.closest('.sf-card')?.querySelectorAll('.sf-list > div').forEach(r=>{
      if(r.querySelector('b')?.textContent.trim()==='Milestone'){
        const span=r.querySelector('span');if(span)span.textContent='12 days to Day-20 Focus Room from current 8-day record';
      }
    });
  }

  const searchRows=[
    {subject:'Computer',topic:day9.lessons[0][1],note:'Day 9 · 49/49 combined core score'},
    {subject:'Pak Studies',topic:day9.lessons[1][1],note:'Day 9 · paper-ready concepts added to Book Solutions'},
    {subject:'Tarjuma-tul-Quran',topic:day9.lessons[2][1],note:'Day 9 · Surah Al-A’raf concepts'},
    {subject:'Maths',topic:day9.extra[0],note:'Day 9 extra practice'}
  ];
  function hookSearch(){
    const btn=document.querySelector('#sf-center #sf-search-btn'),input=document.querySelector('#sf-center #sf-search-input');
    if(!btn||!input||btn.dataset.day9Hook==='1')return;
    btn.dataset.day9Hook='1';
    const append=()=>setTimeout(()=>{
      const q=input.value.trim().toLowerCase();if(!q)return;
      const matches=searchRows.filter(x=>`${x.subject} ${x.topic} ${x.note}`.toLowerCase().includes(q));if(!matches.length)return;
      const out=document.querySelector('#sf-center #sf-search-results');if(!out)return;
      let box=out.querySelector('.sf-search-results');if(!box){box=document.createElement('div');box.className='sf-search-results';out.innerHTML='';out.appendChild(box)}
      matches.forEach(x=>{if(box.querySelector(`[data-day9-search="${x.subject}"]`))return;const a=document.createElement('article');a.className='sf-card';a.dataset.day9Search=x.subject;a.innerHTML=`<span class="sf-badge">${esc(x.subject)}</span><h4>${esc(x.topic)}</h4><p>${esc(x.note)}</p>`;box.appendChild(a)});
    },0);
    btn.addEventListener('click',append);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')append()});
  }

  function patch(){patchToday();patchCalendar();patchReports();patchNotify();hookSearch()}
  const obs=new MutationObserver(()=>patch());
  obs.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
  setInterval(patch,1200);
})();
