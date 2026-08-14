(() => {
  'use strict';
  const STORE='studyforge-book-solutions-v1';
  const data=()=>window.STUDYFORGE_BOOKS||{subjects:[]};
  const readState=()=>{try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch{return {}}};
  const writeState=s=>localStorage.setItem(STORE,JSON.stringify(s));
  let state={subject:'maths',unit:'m1',tab:'topics',...readState()};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function getSubject(id=state.subject){return data().subjects.find(s=>s.id===id)||data().subjects[0]}
  function getUnit(subject=getSubject(),id=state.unit){return subject?.units.find(u=>u.id===id)||subject?.units[0]}
  function hasContent(u){return (u?.topicQA?.length||0)+(u?.exercise?.length||0)>0}
  function totals(){let topics=0,exercise=0,ready=0,units=0;data().subjects.forEach(s=>s.units.forEach(u=>{units++;topics+=u.topicQA?.length||0;exercise+=u.exercise?.length||0;if(hasContent(u))ready++}));return {topics,exercise,ready,units}}

  function ensureNav(){
    const nav=document.querySelector('.sidebar nav');
    if(!nav||document.getElementById('sf-books-nav'))return;
    const b=document.createElement('button');
    b.id='sf-books-nav';b.type='button';
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"></path><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"></path></svg> Book Solutions';
    b.onclick=open;
    const marks=document.getElementById('sf-marks-nav'),study=document.getElementById('sf-center-nav');
    if(marks&&marks.nextSibling)nav.insertBefore(b,marks.nextSibling);else if(study&&study.nextSibling)nav.insertBefore(b,study.nextSibling);else nav.appendChild(b);
  }

  function ensurePanel(){
    if(document.getElementById('sf-book-solutions'))return;
    const wrap=document.createElement('div');wrap.id='sf-book-solutions';
    wrap.innerHTML=`<div class="sfbs-shell"><header class="sfbs-head"><div><span>STUDYFORGE · TEXTBOOK LIBRARY</span><h2>Book Solutions</h2><p>Subject → Unit / Chapter → Topic Q&A + Exercise Solutions</p></div><button class="sfbs-close" aria-label="Close">×</button></header><div class="sfbs-toolbar"><label>Subject<select id="sfbs-subject"></select></label><label>Search all solved content<input id="sfbs-search" placeholder="e.g. modulus, latent heat, kernel, emancipation..."></label><button class="sfbs-search-btn" id="sfbs-search-btn">Search</button></div><div class="sfbs-layout"><aside class="sfbs-unit-nav" id="sfbs-units"></aside><main class="sfbs-main" id="sfbs-main"></main></div></div>`;
    document.body.appendChild(wrap);
    wrap.querySelector('.sfbs-close').onclick=()=>wrap.classList.remove('open');
    wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.classList.remove('open')});
    wrap.querySelector('#sfbs-subject').onchange=e=>{state.subject=e.target.value;state.unit=getSubject()?.units[0]?.id||'';state.tab='topics';saveRender()};
    const run=()=>search(wrap.querySelector('#sfbs-search').value);
    wrap.querySelector('#sfbs-search-btn').onclick=run;
    wrap.querySelector('#sfbs-search').onkeydown=e=>{if(e.key==='Enter')run()};
  }

  function open(){
    document.getElementById('sf-center')?.classList.remove('open');
    document.getElementById('sf-marks-predictor')?.classList.remove('open');
    ensurePanel();render();document.getElementById('sf-book-solutions').classList.add('open');
  }
  function saveRender(){writeState(state);render()}

  function render(){
    ensurePanel();
    const subjects=data().subjects,subject=getSubject();if(!subject)return;
    if(!subject.units.some(u=>u.id===state.unit))state.unit=subject.units[0]?.id||'';
    const unit=getUnit(subject),select=document.getElementById('sfbs-subject');
    select.innerHTML=subjects.map(s=>`<option value="${esc(s.id)}" ${s.id===subject.id?'selected':''}>${esc(s.name)}</option>`).join('');
    const ready=subject.units.filter(hasContent).length;
    document.getElementById('sfbs-units').innerHTML=`<div class="sfbs-subject-title"><span class="sfbs-kicker">${esc(subject.name)}</span><h3>${subject.units.length} units / chapters</h3><p>${ready} currently contain verified solved content</p></div>${subject.units.map(u=>`<button class="sfbs-unit-btn ${u.id===unit.id?'active':''}" data-unit="${esc(u.id)}"><b>${esc(u.no)}</b><span>${esc(u.title)}</span></button>`).join('')}`;
    document.querySelectorAll('#sfbs-units [data-unit]').forEach(b=>b.onclick=()=>{state.unit=b.dataset.unit;state.tab='topics';saveRender()});
    renderUnit(subject,unit);
  }

  function renderUnit(subject,unit){
    const main=document.getElementById('sfbs-main'),topics=unit.topicQA||[],exercise=unit.exercise||[],ready=hasContent(unit);
    main.dir=subject.rtl?'rtl':'ltr';
    main.innerHTML=`<div class="sfbs-chapter-head"><div><span class="sfbs-kicker">${esc(subject.name)} · ${esc(unit.no)}</span><h3>${esc(unit.title)}</h3></div><span class="sfbs-status ${ready?'ready':''}">${ready?'✓ Verified solved batch':'Book index ready · solutions pending extraction'}</span></div><div class="sfbs-tabs"><button class="sfbs-tab ${state.tab==='topics'?'active':''}" data-tab="topics">Topic-wise Q&A (${topics.length})</button><button class="sfbs-tab ${state.tab==='exercise'?'active':''}" data-tab="exercise">Exercise Solutions (${exercise.length})</button></div><section class="sfbs-section ${state.tab==='topics'?'active':''}" id="sfbs-topics">${topics.length?topics.map(q=>qaCard(q)).join(''):empty('Topic Q&A not filled yet','This chapter is indexed from your textbook. Its topic-wise questions will be added only after reading the actual chapter pages — no guessed questions.')}</section><section class="sfbs-section ${state.tab==='exercise'?'active':''}" id="sfbs-exercise">${exercise.length?exercise.map(q=>qaCard(q,true)).join(''):empty('Exercise solutions not filled yet','The chapter is present in your uploaded book index, but its exercise pages have not yet been transcribed and solved. StudyForge will not invent exercise questions.')}</section><div class="sfbs-progress-note"><b>Source rule:</b> Exercise questions are taken from your uploaded Class 10 books and solved for StudyForge. Topic-wise Q&A is written from the chapter content. A chapter showing “pending extraction” is deliberately left blank instead of guessing.</div>`;
    main.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;saveRender()});
  }
  function qaCard(item,isExercise=false){return `<article class="sfbs-qa">${isExercise&&item.group?`<span class="sfbs-group">${esc(item.group)}</span>`:''}<div class="sfbs-q"><span class="sfbs-qmark">Q</span><span>${esc(item.q)}</span></div><div class="sfbs-a"><b>Answer:</b> ${esc(item.a)}</div></article>`}
  function empty(title,text){return `<div class="sfbs-empty"><b>${esc(title)}</b>${esc(text)}</div>`}

  function search(raw){
    const q=String(raw||'').trim().toLowerCase();if(!q){render();return}
    const results=[];
    data().subjects.forEach(s=>s.units.forEach(u=>{
      [...(u.topicQA||[]).map(x=>({...x,type:'Topic Q&A'})),...(u.exercise||[]).map(x=>({...x,type:x.group||'Exercise'}))].forEach(x=>{
        const hay=`${s.name} ${u.no} ${u.title} ${x.q} ${x.a} ${x.type}`.toLowerCase();if(hay.includes(q))results.push({s,u,x});
      });
    }));
    const main=document.getElementById('sfbs-main');main.dir='ltr';
    main.innerHTML=`<div class="sfbs-chapter-head"><div><span class="sfbs-kicker">SEARCH</span><h3>${results.length} result(s) for “${esc(raw)}”</h3></div></div><div class="sfbs-search-results">${results.length?results.slice(0,80).map(r=>`<article class="sfbs-result" ${r.s.rtl?'dir="rtl"':''}><small>${esc(r.s.name)} · ${esc(r.u.no)} · ${esc(r.x.type)}</small><h4>${esc(r.x.q)}</h4><p>${esc(r.x.a)}</p><button data-open-sub="${esc(r.s.id)}" data-open-unit="${esc(r.u.id)}">Open chapter</button></article>`).join(''):empty('No solved match found','Try a different keyword. Search currently covers the verified solved content already added to Book Solutions.')}</div>`;
    main.querySelectorAll('[data-open-unit]').forEach(b=>b.onclick=()=>{state.subject=b.dataset.openSub;state.unit=b.dataset.openUnit;state.tab='topics';document.getElementById('sfbs-search').value='';saveRender()});
  }

  const obs=new MutationObserver(ensureNav);obs.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureNav);else ensureNav();
  setInterval(ensureNav,1500);
})();
