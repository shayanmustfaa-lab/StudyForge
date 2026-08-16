(() => {
  'use strict';
  const BASE_STORE='studyforge-study-center-v1';
  const PLUS_STORE='studyforge-study-center-plus-v1';
  const DAY8_STORE='studyforge-day8-2026-08-16';
  const WRONG_DAY9_STORE='studyforge-day9-2026-08-16';
  const day8={
    day:8,
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

  if(localStorage.getItem(WRONG_DAY9_STORE)) localStorage.removeItem(WRONG_DAY9_STORE);
  write(DAY8_STORE,day8);

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
  if(!plus.studyDates.includes('2026-08-16')) plus.studyDates.push('2026-08-16');
  if(!plus.day8BaselineAdded && !plus.day9BaselineAdded){
    plus.earnedXP=(Number(plus.earnedXP)||0)+209;
    plus.day8BaselineAdded=true;
  } else if(plus.day9BaselineAdded){
    plus.day8BaselineAdded=true;
    delete plus.day9BaselineAdded;
  }
  write(PLUS_STORE,plus);

  const findKicker=text=>[...document.querySelectorAll('#sf-center .sf-kicker')].find(x=>x.textContent.trim()===text);

  function patchToday(){
    const k=findKicker('CURRENT PROGRESS'); if(!k)return;
    const card=k.closest('.sf-card'); if(!card)return;
    const h=card.querySelector('h3'); if(h)h.textContent='8 recorded study days';
    const stats=card.querySelectorAll('.sf-statrow strong');
    if(stats[0])stats[0].textContent='286/286';
    if(stats[1])stats[1].textContent='24';
    if(stats[2])stats[2].textContent='100%';
    const list=card.querySelector('.sf-list');
    if(list){
      list.querySelectorAll('[data-day9-row]').forEach(x=>x.remove());
      if(!list.querySelector('[data-day8-row]')){
        const row=document.createElement('div'); row.dataset.day8Row='1';
        row.innerHTML='<b>D8</b><span>16 Aug · Computer, Pak Studies, Tarjuma-tul-Quran</span><strong>49/49</strong>';
        list.prepend(row);
      }
    }
    if(!card.querySelector('[data-day8-extra]')){
      card.querySelector('[data-day9-extra]')?.remove();
      const p=document.createElement('p'); p.dataset.day8Extra='1'; p.className='sf-note';
      p.textContent='Extra practice: Maths Unit 2 — completing square, quadratic formula, discriminant, graphical roots and axis intersections.';
      card.appendChild(p);
    }
  }

  function patchCalendar(){
    const k=findKicker('CONSISTENCY'); if(!k)return;
    const card=k.closest('.sf-card');
    if(card){
      const h=card.querySelector('h3'); if(h)h.textContent='8 study days recorded';
      const stats=card.querySelectorAll('.sf-statrow strong');
      if(stats[0])stats[0].textContent='8'; if(stats[2])stats[2].textContent='33%';
    }
    document.querySelectorAll('#sf-center .sf-calendar .day').forEach(d=>{
      if(d.querySelector('strong')?.textContent.trim()==='16'){
        d.classList.add('study','test');
        const sm=d.querySelector('small'); if(sm)sm.textContent='Study + Day 9 Test';
      }
    });
  }

  function patchReports(){
    const report=document.querySelector('#sf-center #sf-report'); if(!report)return;
    const cards=report.querySelectorAll(':scope > .sf-card');
    const totals=[...cards].find(c=>c.querySelector('h3')?.textContent.trim()==='Current totals');
    if(totals){const s=totals.querySelectorAll('.sf-statrow strong'); if(s[0])s[0].textContent='8'; if(s[1])s[1].textContent='24'; if(s[2])s[2].textContent='286/286';}
    const checkpoint=[...cards].find(c=>c.querySelector('h3')?.textContent.trim()==='Next checkpoint');
    if(checkpoint){const p=checkpoint.querySelector('p'); if(p)p.innerHTML='<b>Day 9 Weekly Test</b><br>Sunday, 16 August · 7:00 PM';}
  }

  function patchTest(){
    const k=findKicker('SUNDAY · 7:00 PM'); if(!k)return;
    const card=k.closest('.sf-card'); if(!card)return;
    const h=card.querySelector('h3'); if(h)h.textContent='Day 9 Weekly Test';
    const p=card.querySelector('p'); if(p)p.textContent='Day 1–8 study coverage · one question at a time · wrong answers retest queue mein.';
  }

  function patchNotify(){
    const k=findKicker('REMINDER RULES'); if(!k)return;
    k.closest('.sf-card')?.querySelectorAll('.sf-list > div').forEach(r=>{
      const name=r.querySelector('b')?.textContent.trim();
      if(name==='Sunday test'){
        const span=r.querySelector('span'); if(span)span.textContent='Day 9 · 16 Aug · 7 PM';
      }
      if(name==='Milestone'){
        const span=r.querySelector('span'); if(span)span.textContent='12 days to Day-20 Focus Room from current 8-day record';
      }
    });
  }

  function patch(){patchToday();patchCalendar();patchReports();patchTest();patchNotify();}
  const obs=new MutationObserver(patch); obs.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
  setInterval(patch,1200);
})();
