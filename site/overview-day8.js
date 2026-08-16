(() => {
  'use strict';
  const record={
    date:'16 Aug 2026',day:8,studyDays:8,lessons:24,marks:286,
    subjects:{'Maths':[53,'#7c5cff'],'Pak Studies':[42,'#f2c94c'],'Physics':[31,'#16c9a4'],'Computer':[46,'#a978ff'],'English':[27,'#ff9f43'],'Tarjuma-tul-Quran':[47,'#38d488'],'Chemistry':[20,'#f05d8b'],'Urdu':[20,'#46a7ff']},
    lessonsToday:[
      {id:'computer',subject:'Computer',marks:'15/15',color:'#a978ff',topic:'RAM, virtual memory, process vs thread, multithreading and system calls',explanation:'Day 8 mein memory aur operating-system execution concepts ko examples aur proper short questions ke through master kiya gaya.',qa:[
        ['RAM temporary memory hai ya permanent memory?','RAM temporary memory hai. Computer off hone par iska current data erase ho jata hai.','1/1'],
        ['RAM ka full form kya hai?','RAM ka full form Random Access Memory hai.','1/1'],
        ['Virtual memory kab use hoti hai?','Jab RAM full ho jaye aur kaam ko extra memory chahiye ho, OS HDD/SSD/NVMe ka hissa temporary extra memory ke taur par use karta hai.','1/1'],
        ['Virtual memory ko example ke saath samjhao.','Jab RAM full hoti hai to OS storage drive ka hissa temporary memory ke taur par use karta hai. Storage RAM se slow hoti hai, is liye zyada virtual memory use hone se performance slow ho sakti hai.','3/3'],
        ['Web browser ka example de kar process aur thread samjhao.','Process koi running program hota hai, jaise Chrome. Us process ke andar page loading, typing, video ya download jese chhote execution tasks threads ho sakte hain. Ek process ke multiple threads same memory aur resources share karte hain.','3/3'],
        ['Multithreading kya hai aur do faide batao.','Multithreading ek process ko multiple threads mein divide karti hai taake multiple tasks ek hi period mein progress kar saken. Is se performance/responsiveness improve hoti hai aur resources efficiently use hote hain.','3/3'],
        ['System call kya hoti hai?','System call program ki OS ko request hoti hai ke OS koi protected/system task perform kare. Misal ke taur par Notepad file save karte waqt OS ko storage par data write karne ki request bhejta hai.','3/3']
      ]},
      {id:'pak',subject:'Pak Studies',marks:'9/9',color:'#f2c94c',topic:'Chaudhry Rehmat Ali, Muslim economic deprivation and Quaid-e-Azam’s political struggle',explanation:'Pakistan ki nazriati bunyaad ke context mein 1933 ke Now or Never, Muslim economic deprivation aur Quaid-e-Azam ki practical siyasi struggle ko master kiya gaya.',qa:[
        ['Chaudhry Rehmat Ali ne 1933 mein kya important kaam kiya?','28 January 1933 ko unhon ne “Now or Never” pamphlet publish kiya, jis mein Muslims ke liye separate homeland ka idea diya aur “Pakistan” naam use kiya.','3/3'],
        ['British rule mein Muslims ki maashi halat kharab hone ki do wajahain batao.','British tijarati policies se local Muslim businesses ko nuksan hua aur Muslims ko government jobs aur kai economic opportunities se door rakha gaya; agricultural policies ne bhi unki financial condition ko weak kiya.','3/3'],
        ['Quaid-e-Azam ne Nazriya-e-Pakistan ko practical political movement mein kaise badla?','Quaid-e-Azam ne Hindu aur Muslim ko do alag qaumein qarar dete hue Muslims ko siyasi taur par organize kiya. 23 March 1940 ki Lahore Resolution ke baad separate Muslim homeland ki demand ko clear aur strong political movement bana diya.','3/3']
      ]},
      {id:'tarjuma',subject:'Tarjuma-tul-Quran',marks:'25/25',color:'#38d488',topic:'Surah Al-A’raf: introduction, themes, Adam/Iblees, repentance, libas, israf, halal rizq and A’raf',explanation:'Surah Al-A’raf ka taaruf aur bunyadi taleemat concept questions ke through master ki gayin.',qa:[
        ['Surah Al-A’raf ka taaruf do.','Ye Makki Surah hai, is mein 206 ayat aur 24 rukoo hain. Al-A’raf Jannat aur Jahannum ke darmiyan ek buland jagah ko kehte hain.','3/3'],
        ['Surah Al-A’raf ke chaar bunyadi mazameen batao.','Hazrat Adamؑ aur Iblees ka waqia, Ambiya ki itaat, Akhirat aur hisaab, aur Quran Majeed ki azmat.','4/4'],
        ['Iblees ne Hazrat Adamؑ ko sajda karne se inkar kyun kiya aur kya lesson milta hai?','Iblees ne takabbur ki wajah se inkar kiya. Lesson: takabbur Allah ki nafarmani tak le ja sakta hai aur Shaitan insan ka dushman hai, is liye uske behkaway se bachna chahiye.','3/3'],
        ['Hazrat Adamؑ aur Hazrat Hawwaؑ ne ghalti ke baad kya kiya?','Unhon ne apni ghalti maan kar Allah se maafi aur tauba ki. Lesson ye hai ke ghalti ke baad insan ko Allah ki taraf ruju karna chahiye.','3/3'],
        ['Libas ke bare mein kya taleem di gayi hai?','Allah ne libas ko jism dhakne aur zeenat ki ne’mat bataya aur Shaitan ke fitne se bachne ki warning di.','3/3'],
        ['Khane peene aur israf ke bare mein kya taleem hai?','Insan khaye aur piye lekin israf, had se barhne aur waste se bache.','3/3'],
        ['Halal zeenat aur paak rizq ke bare mein kya taleem hai?','Allah ki paida ki hui achhi zeenat aur paak rizq ko apni taraf se haram na kaha jaye, aur burai/be-hayai se bacha jaye.','3/3'],
        ['A’raf kya hai aur A’raf walon ka rawayya kya hoga?','A’raf Jannat aur Jahannum ke darmiyan buland jagah hai. A’raf walay log dono groups ko nishaniyon se pehchanenge, Jannat walon ko salam karenge aur Jahannum walon ko dekh kar Allah se zalimon mein shamil na karne ki dua karenge.','3/3']
      ]}
    ]
  };
  const set=(el,v)=>{if(el&&el.textContent!==v)el.textContent=v};
  const active=()=>[...document.querySelectorAll('.sidebar nav button')].find(b=>b.classList.contains('active'))?.textContent.trim()||'';

  function top(){set(document.querySelector('.date-card strong'),record.date);}
  function overview(){
    const hero=document.querySelector('.hero-card'); if(!hero)return;
    set(hero.querySelector('.live-pill'),'DAY 8 COMPLETE');
    set(hero.querySelector('.hero-copy h2'),'8 study days. Strong start.');
    const score=hero.querySelector('.hero-score strong'); if(score)score.innerHTML='286<small>/286</small>';
    set(hero.querySelector('.hero-score p'),'8 scored days');
    document.querySelectorAll('.metric-card').forEach(c=>{
      const l=c.querySelector('small')?.textContent.trim();
      if(l==='Study days'){set(c.querySelector('.metric-icon'),'08');set(c.querySelector('strong'),'8');set(c.querySelector('p'),'Day 1 to Day 8');}
      if(l==='Lessons logged')set(c.querySelector('strong'),'24');
      if(l==='Marks earned'){set(c.querySelector('strong'),'286');set(c.querySelector('p'),'Out of 286 recorded');}
      if(l==='Study duration')set(c.querySelector('strong'),'Starts Day 9');
    });
    const max=53;
    document.querySelectorAll('.subject-row').forEach(r=>{const name=r.querySelector('.subject-line span')?.textContent.trim(),info=record.subjects[name];if(!info)return;const [m,color]=info;set(r.querySelector('.subject-line strong'),`${m}/${m}`);const bar=r.querySelector('.bar-track span');if(bar){bar.style.width=`${m/max*100}%`;bar.style.background=color;}});
    chart(); latest(); nextTest();
  }
  function chart(){
    const svg=document.querySelector('.trend-chart svg'); if(!svg||svg.dataset.day8Chart==='1')return;
    const days=[[1,'20/20'],[2,'30/30'],[3,'20/20'],[4,'21/21'],[5,'40/40'],[6,'66/66'],[7,'40/40'],[8,'49/49']];
    const xs=days.map((_,i)=>38+i*(584/(days.length-1))),pts=xs.map(x=>`${x},22`).join(' ');
    const grids=[[172,'0'],[134.5,'25'],[97,'50'],[59.5,'75'],[22,'100']].map(([y,l])=>`<g><line x1="38" x2="622" y1="${y}" y2="${y}" class="grid-line"></line><text x="4" y="${Number(y)+4}" class="axis-label">${l}%</text></g>`).join('');
    const nodes=days.map(([d,m],i)=>`<g><circle cx="${xs[i]}" cy="22" r="8" class="point-halo"></circle><circle cx="${xs[i]}" cy="22" r="4.5" class="point"></circle><text x="${xs[i]}" y="198" text-anchor="middle" class="day-label">D${d}</text><title>Day ${d}: 100% (${m})</title></g>`).join('');
    svg.innerHTML=`${grids}<polyline points="${pts}" class="trend-glow"></polyline><polyline points="${pts}" class="trend-line"></polyline>${nodes}`;svg.dataset.day8Chart='1';
    set(document.querySelector('.trend-panel .chart-note'),'Day 1–8 final corrected scores shown. Day 9 is the weekly test.');
  }
  function latest(){
    const card=document.querySelector('.latest-card');if(!card)return;set(card.querySelector('.panel-heading h3'),'Day 8 snapshot');
    const grid=card.querySelector('.lesson-mini-grid');if(!grid||grid.dataset.day8Latest==='1')return;
    grid.innerHTML=record.lessonsToday.map(x=>`<button type="button" class="lesson-mini" data-day8-detail="${x.id}"><i style="background:${x.color}"></i><span>${x.subject}</span><strong>${x.marks}</strong><small>${x.topic}</small></button>`).join('');grid.dataset.day8Latest='1';
  }
  function nextTest(){const c=document.querySelector('.next-test-card');if(!c)return;set(c.querySelector('h3'),'Day 9 Weekly Test');const p=c.querySelector('p');if(p)set(p,'Sunday, 16 August · 7:00 PM · Day 1–8 coverage');}
  function historyCard(){
    const rows=record.lessonsToday.map(x=>`<button type="button" class="lesson-row" data-day8-detail="${x.id}"><span class="subject-name"><i style="background:${x.color}"></i>${x.subject}</span><span>${x.topic}</span><strong>${x.marks}</strong><span class="status-badge">Mastered</span></button>`).join('');
    const card=document.createElement('article');card.className='day-card';card.dataset.studyforgeDay8='1';
    card.innerHTML=`<div class="day-number"><span>DAY</span><strong>8</strong></div><div class="day-main"><div class="day-title-row"><div><p>16 AUG 2026 · DAY 8</p><h2>Computer + Pak Studies + Tarjuma-tul-Quran — full concept mastery</h2></div><div class="day-score"><strong>49/49</strong><span>Mastered</span></div></div><div class="lesson-table"><div class="lesson-head"><span>Subject</span><span>Topic</span><span>Marks</span><span>Status</span></div>${rows}</div><div class="retest-note"><span>+</span><p><b>Extra practice:</b> Maths Unit 2 — completing square, quadratic formula, discriminant, graphical roots and coordinate-axis intersections. Corrections were retested and mastered.</p></div></div>`;return card;
  }
  function history(){const list=document.querySelector('.history-view .day-list');if(!list)return;list.querySelectorAll('[data-studyforge-day9],[data-studyforge-day8]').forEach(x=>x.remove());list.prepend(historyCard());}
  function details(id){
    const x=record.lessonsToday.find(v=>v.id===id);if(!x)return;document.querySelector('[data-day8-modal]')?.remove();
    const m=document.createElement('div');m.className='lesson-modal-backdrop';m.dataset.day8Modal='1';
    m.innerHTML=`<section class="lesson-modal"><header class="lesson-modal-header"><div><div class="modal-meta"><span>Day 8</span><span>16 Aug 2026</span><span>${x.marks}</span></div><p class="section-kicker">${x.subject}</p><h2>${x.topic}</h2><p>Correction + retest ke baad paper-ready mastery record.</p></div><button type="button" class="modal-close" aria-label="Close">×</button></header><div class="lesson-modal-body"><div class="lesson-explanation"><span class="notebook-label">Lesson summary</span><p>${x.explanation}</p></div><section class="qa-section"><div class="qa-title-row"><div><span class="notebook-label">Test record</span><h3>Questions & paper-ready answers</h3></div><span class="qa-count">${x.qa.length} questions</span></div><div class="qa-list">${x.qa.map((q,i)=>`<article class="qa-card"><div class="qa-card-top"><span class="question-number">Q${i+1}</span><strong>${q[2]}</strong></div><h4>${q[0]}</h4><div class="answer-block paper-answer"><span>Paper-ready answer</span><p>${q[1]}</p></div></article>`).join('')}</div></section></div></section>`;document.body.appendChild(m);const close=()=>m.remove();m.querySelector('.modal-close').onclick=close;m.addEventListener('click',e=>{if(e.target===m)close()});
  }
  function patch(){top();const a=active();if(a==='Overview'||document.querySelector('.hero-card'))overview();if(a==='Daily history'||document.querySelector('.history-view'))history();}
  document.addEventListener('click',e=>{const d=e.target.closest('[data-day8-detail]');if(d){e.preventDefault();e.stopPropagation();details(d.dataset.day8Detail);}},true);
  let q=false;const queue=()=>{if(q)return;q=true;requestAnimationFrame(()=>{q=false;patch()})};new MutationObserver(queue).observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();setInterval(patch,1500);
})();
