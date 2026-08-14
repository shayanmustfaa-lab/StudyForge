(() => {
  'use strict';

  const BASE_STORE = 'studyforge-study-center-v1';
  const PLUS_STORE = 'studyforge-study-center-plus-v1';
  const TOTAL_BLOCKS = 87;
  const seedStudyDates = ['2026-08-07','2026-08-08','2026-08-10','2026-08-12','2026-08-13','2026-08-14'];
  const knownPending = [
    {subject:'Maths',topic:'Unit 2 · Quadratic Equations and Inequalities'},
    {subject:'Physics',topic:'Chapter 11'},
    {subject:'Computer',topic:'Chapter 2'},
    {subject:'Urdu',topic:'Naat — pending sher / revision'},
    {subject:'English',topic:'Grammar + paper-ready answers'},
    {subject:'Pak Studies',topic:'Chapter 1 revision'}
  ];

  const qbank = [
    {id:1,s:'Maths',type:'Short',d:'Easy',q:'For z = −3 + 4i, find |z|.',a:'5',keys:['5'],topic:'Complex-number modulus'},
    {id:2,s:'Maths',type:'Short',d:'Medium',q:'Solve x² − 5x + 6 = 0.',a:'x = 2, 3',keys:['2','3'],topic:'Quadratic factorization'},
    {id:3,s:'Maths',type:'MCQ',d:'Easy',q:'What is i²?',a:'−1',keys:['-1','−1'],topic:'Powers of i'},
    {id:4,s:'Physics',type:'Short',d:'Easy',q:'Write the specific heat capacity equation.',a:'Q = mcΔT',keys:['q','mc','dt'],topic:'Specific heat capacity'},
    {id:5,s:'Physics',type:'Concept',d:'Medium',q:'A rigid sealed gas container is heated. What happens to volume and pressure?',a:'Volume remains constant; pressure increases.',keys:['constant','pressure','increase'],topic:'Gas expansion'},
    {id:6,s:'Chemistry',type:'Short',d:'Easy',q:'How does average kinetic energy change when absolute temperature increases?',a:'It increases.',keys:['increase'],topic:'Kinetic theory'},
    {id:7,s:'Computer',type:'Short',d:'Easy',q:'What is the core part of an operating system called?',a:'Kernel',keys:['kernel'],topic:'Operating system'},
    {id:8,s:'Computer',type:'Short',d:'Medium',q:'Which scheduling method runs processes in arrival order?',a:'FCFS',keys:['fcfs'],topic:'CPU scheduling'},
    {id:9,s:'English',type:'Short',d:'Easy',q:'What does emancipation mean?',a:'Freedom from slavery.',keys:['freedom','slavery'],topic:'Vocabulary'},
    {id:10,s:'English',type:'Grammar',d:'Medium',q:'Correct: “Islam protects orphans by protect their property.”',a:'Islam protects orphans by protecting their property.',keys:['by protecting'],topic:'Gerund after by'},
    {id:11,s:'Pak Studies',type:'Short',d:'Medium',q:'State one importance of ideology for a nation.',a:'It unites the nation and gives it a distinct identity.',keys:['unite','identity'],topic:'Ideology'},
    {id:12,s:'Tarjuma-tul-Quran',type:'Short',d:'Easy',q:'State one central teaching of Surah Al-An‘am.',a:'Tawheed — worship Allah alone.',keys:['tawheed','allah'],topic:'Surah Al-An‘am'},
    {id:13,s:'Urdu',type:'Short',d:'Medium',q:'Hamd aur Naat mein bunyadi farq kya hai?',a:'Hamd Allah ki tareef hai; Naat Hazrat Muhammad ﷺ ki tareef hai.',keys:['allah','naat'],topic:'Hamd vs Naat'},
    {id:14,s:'Maths',type:'Concept',d:'Hard',q:'If z₁+z₂=6+2i and z₁−z₂=2+4i, find z₁.',a:'z₁ = 4 + 3i',keys:['4','3i'],topic:'Simultaneous complex equations'},
    {id:15,s:'Physics',type:'Concept',d:'Hard',q:'Why does a flexible container not build pressure like a rigid sealed container when gas is heated?',a:'Its volume can increase, so pressure does not rise as sharply.',keys:['volume','increase','pressure'],topic:'Gas pressure and volume'}
  ];

  const esc = s => String(s ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const readJSON = (k, fallback={}) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback)); } catch { return fallback; } };
  const baseState = () => readJSON(BASE_STORE, {});
  const defaultPlus = () => ({
    plannerMinutes:150,
    plannerDone:[],
    predictor:{total:1200,target:1100,expected:90},
    earnedXP:0,
    qbank:{subject:'All',type:'All',difficulty:'All',index:0,revealed:false,correct:0,wrong:0},
    mock:null,
    weakExtra:[],
    studyDates:[],
    notes:[],
    examDate:''
  });
  let state = {...defaultPlus(), ...readJSON(PLUS_STORE, {})};
  const save = () => localStorage.setItem(PLUS_STORE, JSON.stringify(state));

  const plusTabs = [
    ['planner','Planner'],
    ['predictor','Marks Predictor'],
    ['xp','XP & Levels'],
    ['qbank','Question Bank'],
    ['exam','Exam Mode'],
    ['radar','Weak Radar'],
    ['streak','Streak'],
    ['backup','Backup'],
    ['notes','Notes'],
    ['countdown','Countdown']
  ];

  function statuses(){ return baseState().statuses || {}; }
  function mistakes(){ return baseState().mistakes || []; }
  function masteryCount(){ return Object.values(statuses()).filter(v => v === 'Mastered').length; }
  function uniqueStudyDates(){ return [...new Set([...seedStudyDates, ...(state.studyDates||[])])].sort(); }
  function addXP(n){ state.earnedXP = (state.earnedXP||0) + n; save(); }
  function totalXP(){ return 7*100 + 21*20 + 237 + (state.earnedXP||0); }
  function levelInfo(){ const xp=totalXP(), level=Math.floor(xp/500)+1, into=xp%500; return {xp,level,into,next:500-into}; }
  function normalize(s){ return String(s||'').toLowerCase().replace(/[−–—]/g,'-').replace(/δ/g,'d').replace(/[^a-z0-9+\-/ ]/g,' ').replace(/\s+/g,' ').trim(); }
  function answerGood(ans,q){ const n=normalize(ans); return q.keys.every(k => n.includes(normalize(k))) || q.keys.filter(k=>normalize(k).length>2).some(k=>n.includes(normalize(k))); }

  function ensureTabs(){
    const center=document.getElementById('sf-center');
    if(!center) return;
    const tabs=center.querySelector('.sf-tabs');
    if(!tabs || tabs.dataset.plusReady==='1') return;
    tabs.dataset.plusReady='1';
    const divider=document.createElement('span');
    divider.className='sfp-tab-divider';
    divider.textContent='POWER';
    tabs.appendChild(divider);
    plusTabs.forEach(([id,label])=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='sfp-tab';
      b.dataset.plusTab=id;
      b.textContent=label;
      b.addEventListener('click',()=>renderPlus(id));
      tabs.appendChild(b);
    });
  }

  function renderPlus(id){
    const center=document.getElementById('sf-center');
    if(!center) return;
    ensureTabs();
    center.querySelectorAll('.sf-tabs button').forEach(b=>b.classList.remove('active'));
    const btn=center.querySelector(`[data-plus-tab="${id}"]`); if(btn) btn.classList.add('active');
    const body=center.querySelector('.sf-body');
    const views={planner:plannerView,predictor:predictorView,xp:xpView,qbank:qbankView,exam:examView,radar:radarView,streak:streakView,backup:backupView,notes:notesView,countdown:countdownView};
    body.innerHTML=views[id]();
    wire(id,body);
  }

  function plannerCandidates(){
    const st=statuses();
    const weighted=[];
    Object.entries(st).forEach(([key,val])=>{
      const [subject,topic]=key.split('|');
      if(val==='Revision Due') weighted.push({subject,topic,priority:1,why:'Revision due'});
      if(val==='In Progress') weighted.push({subject,topic,priority:2,why:'Already in progress'});
    });
    (state.weakExtra||[]).forEach(w=>weighted.push({subject:w.subject||'Practice',topic:w.topic,priority:1,why:'Recent weak answer'}));
    mistakes().filter(m=>m.status!=='Paper Ready').forEach(m=>weighted.push({subject:m.type||'Correction',topic:m.topic,priority:2,why:'Mistake Bank'}));
    knownPending.forEach(x=>weighted.push({...x,priority:3,why:'Planned syllabus progress'}));
    const seen=new Set();
    return weighted.sort((a,b)=>a.priority-b.priority).filter(x=>{const k=x.subject+'|'+x.topic;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,6);
  }

  function plannerView(){
    const mins=Math.max(45,Number(state.plannerMinutes)||150), c=plannerCandidates();
    const splits=[Math.round(mins*.4),Math.round(mins*.35),Math.max(15,mins-Math.round(mins*.4)-Math.round(mins*.35))];
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">SMART DAILY PLANNER</span><h3>Today ka best study order</h3><p>Weak topics, revision due aur in-progress syllabus ko priority milti hai.</p></div><label class="sfp-mini-input">Total minutes<input id="sfp-plan-min" type="number" min="45" step="15" value="${mins}"></label></div><div class="sfp-grid three">${c.slice(0,3).map((x,i)=>`<article class="sfp-card"><div class="sfp-rank">${i+1}</div><span class="sfp-badge">${esc(x.subject)}</span><h4>${esc(x.topic)}</h4><p>${esc(x.why)}</p><div class="sfp-duration">${splits[i]} min</div><button class="sfp-primary" data-plan-done="${i}">${(state.plannerDone||[]).includes(x.subject+'|'+x.topic)?'Completed ✓':'Mark complete +25 XP'}</button></article>`).join('')}</div><div class="sfp-card sfp-plan-rest"><h4>Next up</h4>${c.slice(3).map(x=>`<div class="sfp-row"><b>${esc(x.subject)}</b><span>${esc(x.topic)}</span><small>${esc(x.why)}</small></div>`).join('')||'<p>No extra priority item right now.</p>'}</div></section>`;
  }

  function predictorView(){
    const p=state.predictor||{}, total=Number(p.total)||1200, target=Number(p.target)||1100, expected=Math.max(1,Math.min(100,Number(p.expected)||90));
    const recorded=100, mastered=masteryCount(), masteryPct=Math.round(mastered/TOTAL_BLOCKS*100);
    const blended=recorded*.35+expected*.65;
    const projection=Math.round(total*blended/100);
    const uncertainty=Math.max(20,Math.round((1-masteryPct/100)*70));
    const lo=Math.max(0,projection-uncertainty), hi=Math.min(total,projection+uncertainty);
    const targetPct=Math.round(target/total*1000)/10;
    const gap=Math.max(0,target-projection);
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">MARKS PREDICTOR</span><h3>${lo}–${hi} estimated range</h3><p>Planning estimate hai, guarantee nahi. Syllabus coverage barhne ke sath range tighter hogi.</p></div><div class="sfp-score-ring"><strong>${projection}</strong><span>mid estimate</span></div></div><div class="sfp-grid three"><article class="sfp-card"><span class="sfp-label">Recorded test accuracy</span><strong class="sfp-big">100%</strong><p>Current recorded final marks: 237/237.</p></article><article class="sfp-card"><span class="sfp-label">Syllabus mastery signal</span><strong class="sfp-big">${masteryPct}%</strong><p>${mastered}/${TOTAL_BLOCKS} tracked blocks currently mastered.</p></article><article class="sfp-card"><span class="sfp-label">Target requirement</span><strong class="sfp-big">${targetPct}%</strong><p>${gap?`${gap} marks below current midpoint.`:'Current midpoint is at/above target.'}</p></article></div><article class="sfp-card"><div class="sfp-form-grid"><label>Total Matric marks<input id="sfp-total" type="number" value="${total}"></label><label>Your target<input id="sfp-target" type="number" value="${target}"></label><label>Expected exam accuracy %<input id="sfp-expected" type="number" min="1" max="100" value="${expected}"></label></div><p class="sfp-note">Expected exam accuracy ko realistic estimate par rakho. Predictor recent recorded accuracy + expected exam accuracy ko blend karta hai aur incomplete syllabus ke liye uncertainty add karta hai.</p></article></section>`;
  }

  function xpView(){
    const l=levelInfo(), pct=Math.round(l.into/500*100);
    const rewards=[['Day 20','Focus Room'],['Day 50','Smart Revision Deck'],['Day 90','Recovery Pass'],['Day 120','Performance Insights'],['Day 150','Board Challenge'],['Day 180','Full Mock Arena']];
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">XP + LEVEL SYSTEM</span><h3>Level ${l.level}</h3><p>Study, revision, questions, mocks aur notes se XP earn hota hai.</p></div><div class="sfp-score-ring"><strong>${l.xp}</strong><span>total XP</span></div></div><article class="sfp-card"><div class="sfp-progress"><span style="width:${pct}%"></span></div><div class="sfp-between"><b>${l.into}/500 XP in Level ${l.level}</b><span>${l.next} XP to next level</span></div></article><div class="sfp-grid three">${rewards.map((r,i)=>`<article class="sfp-card"><span class="sfp-badge">${r[0]}</span><h4>${r[1]}</h4><p>${i===0?'25-min focus timer + session counter.':i===1?'Mistake corrections into smart revision cards.':i===2?'One planned recovery day without guilt.':i===3?'Subject accuracy and revision priorities.':i===4?'Random board-style challenge with timer.':'Mixed-subject mock arena.'}</p></article>`).join('')}</div></section>`;
  }

  function filteredBank(){
    const f=state.qbank||{};
    return qbank.filter(q=>(f.subject==='All'||!f.subject||q.s===f.subject)&&(f.type==='All'||!f.type||q.type===f.type)&&(f.difficulty==='All'||!f.difficulty||q.d===f.difficulty));
  }
  function qbankView(){
    const f=state.qbank||{}, list=filteredBank(), idx=list.length?(f.index||0)%list.length:0, q=list[idx];
    const subs=['All',...new Set(qbank.map(x=>x.s))],types=['All',...new Set(qbank.map(x=>x.type))],diffs=['All','Easy','Medium','Hard'];
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">BOARD QUESTION BANK</span><h3>Board-style practice by filter</h3><p>Wrong answer Weak Radar mein automatically add hota hai.</p></div><div class="sfp-inline-stats"><b>${f.correct||0} ✓</b><b>${f.wrong||0} ✕</b></div></div><article class="sfp-card"><div class="sfp-form-grid"><label>Subject<select id="sfp-q-sub">${subs.map(x=>`<option ${x===f.subject?'selected':''}>${esc(x)}</option>`).join('')}</select></label><label>Type<select id="sfp-q-type">${types.map(x=>`<option ${x===f.type?'selected':''}>${esc(x)}</option>`).join('')}</select></label><label>Difficulty<select id="sfp-q-diff">${diffs.map(x=>`<option ${x===f.difficulty?'selected':''}>${x}</option>`).join('')}</select></label></div></article>${q?`<article class="sfp-card sfp-question"><div class="sfp-between"><span class="sfp-badge">${esc(q.s)} · ${q.type} · ${q.d}</span><span>${idx+1}/${list.length}</span></div><h3>${esc(q.q)}</h3><textarea id="sfp-q-answer" placeholder="Apna answer likho..."></textarea><div class="sfp-actions"><button class="sfp-secondary" id="sfp-reveal">Reveal answer</button><button class="sfp-secondary" id="sfp-q-prev">Previous</button><button class="sfp-primary" id="sfp-q-check">Check & next</button></div><div id="sfp-q-feedback">${f.revealed?`<div class="sfp-feedback neutral"><b>Paper-ready answer:</b> ${esc(q.a)}</div>`:''}</div></article>`:'<article class="sfp-card"><p>No questions match these filters.</p></article>'}</section>`;
  }

  function startMock(){
    const shuffled=[...qbank].sort(()=>Math.random()-.5).slice(0,5);
    state.mock={ids:shuffled.map(q=>q.id),index:0,answers:{},started:Date.now(),finished:false,score:0}; save();
  }
  function mockQuestions(){ return (state.mock?.ids||[]).map(id=>qbank.find(q=>q.id===id)).filter(Boolean); }
  function examView(){
    const m=state.mock;
    if(!m) return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">EXAM MODE</span><h3>5-question mixed mock</h3><p>10-minute timer · 2 marks each · automatic weak-topic capture.</p></div><button class="sfp-primary" id="sfp-start-mock">Start Mock</button></div><div class="sfp-grid three"><article class="sfp-card"><strong class="sfp-big">5</strong><p>Questions</p></article><article class="sfp-card"><strong class="sfp-big">10</strong><p>Total marks</p></article><article class="sfp-card"><strong class="sfp-big">10 min</strong><p>Time limit</p></article></div></section>`;
    const qs=mockQuestions();
    if(m.finished) return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">MOCK RESULT</span><h3>${m.score}/10</h3><p>${m.score>=8?'Strong attempt.':'Use Weak Radar + Revision before next mock.'}</p></div><button class="sfp-primary" id="sfp-new-mock">New Mock</button></div><div class="sfp-grid two">${qs.map((q,i)=>`<article class="sfp-card"><span class="sfp-badge">Q${i+1} · ${esc(q.s)}</span><h4>${esc(q.q)}</h4><p><b>Your answer:</b> ${esc(m.answers[q.id]||'—')}</p><p><b>Paper-ready:</b> ${esc(q.a)}</p></article>`).join('')}</div></section>`;
    const q=qs[m.index], elapsed=Math.floor((Date.now()-m.started)/1000), left=Math.max(0,600-elapsed);
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">FULL MOCK</span><h3>Question ${m.index+1}/5</h3><p>${esc(q.s)} · ${q.type} · ${q.d}</p></div><div class="sfp-timer" id="sfp-mock-clock">${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}</div></div><article class="sfp-card sfp-question"><h3>${esc(q.q)}</h3><textarea id="sfp-mock-answer" placeholder="Paper-style answer...">${esc(m.answers[q.id]||'')}</textarea><div class="sfp-actions"><button class="sfp-secondary" id="sfp-mock-prev" ${m.index===0?'disabled':''}>Previous</button><button class="sfp-primary" id="sfp-mock-next">${m.index===4?'Submit Mock':'Save & Next'}</button></div></article></section>`;
  }

  function radarItems(){
    const out=[];
    Object.entries(statuses()).forEach(([key,val])=>{const [subject,topic]=key.split('|');if(val==='Revision Due')out.push({subject,topic,severity:1,why:'Revision Due'});else if(val==='In Progress')out.push({subject,topic,severity:2,why:'In Progress'});});
    mistakes().filter(m=>m.status!=='Paper Ready').forEach(m=>out.push({subject:m.type||'Mistake',topic:m.topic,severity:m.status==='Weak'?1:2,why:m.status||'Correction'}));
    (state.weakExtra||[]).forEach(w=>out.push({subject:w.subject,topic:w.topic,severity:1,why:'Question Bank / Mock'}));
    const seen=new Set();return out.sort((a,b)=>a.severity-b.severity).filter(x=>{const k=x.subject+'|'+x.topic;if(seen.has(k))return false;seen.add(k);return true;});
  }
  function radarView(){
    const items=radarItems(), red=items.filter(x=>x.severity===1), orange=items.filter(x=>x.severity===2), mastered=masteryCount();
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">WEAK TOPIC RADAR</span><h3>${red.length} high-priority weak areas</h3><p>Test mistakes, Revision Due aur In Progress topics ek jagah.</p></div></div><div class="sfp-grid three"><article class="sfp-card sfp-radar red"><strong class="sfp-big">${red.length}</strong><p>Fix first</p></article><article class="sfp-card sfp-radar orange"><strong class="sfp-big">${orange.length}</strong><p>Needs practice</p></article><article class="sfp-card sfp-radar green"><strong class="sfp-big">${mastered}</strong><p>Tracked mastered</p></article></div><div class="sfp-grid two">${items.map(x=>`<article class="sfp-card"><span class="sfp-badge ${x.severity===1?'danger':'warn'}">${x.severity===1?'HIGH':'MEDIUM'}</span><h4>${esc(x.subject)}</h4><p>${esc(x.topic)}</p><small>${esc(x.why)}</small></article>`).join('')||'<article class="sfp-card"><p>No weak topics detected.</p></article>'}</div></section>`;
  }

  function streakCalc(){
    const ds=uniqueStudyDates(); if(!ds.length)return 0;
    let streak=1;
    for(let i=ds.length-1;i>0;i--){const a=new Date(ds[i]+'T12:00:00'),b=new Date(ds[i-1]+'T12:00:00');const diff=Math.round((a-b)/86400000);if(diff===1)streak++;else break;}
    return streak;
  }
  function streakView(){
    const dates=uniqueStudyDates(), streak=streakCalc(), today=new Date().toLocaleDateString('en-CA'), studied=dates.includes(today);
    const first=new Date('2026-08-07T12:00:00'), now=new Date(), elapsed=Math.max(1,Math.floor((now-first)/86400000)+1), consistency=Math.min(100,Math.round(dates.length/elapsed*100));
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">STUDY STREAK + CONSISTENCY</span><h3>${streak}-day current calendar streak</h3><p>Recorded study dates ko consecutive calendar days ke hisaab se count kiya gaya hai.</p></div><button class="sfp-primary" id="sfp-mark-today" ${studied?'disabled':''}>${studied?'Today recorded ✓':'Mark today studied +50 XP'}</button></div><div class="sfp-grid three"><article class="sfp-card"><strong class="sfp-big">${dates.length}</strong><p>Unique study dates</p></article><article class="sfp-card"><strong class="sfp-big">${consistency}%</strong><p>Consistency since 7 Aug</p></article><article class="sfp-card"><strong class="sfp-big">${Math.max(0,20-7)}</strong><p>Recorded study days to Day-20 reward</p></article></div><article class="sfp-card"><h4>Recent recorded dates</h4><div class="sfp-chipline">${dates.slice(-12).map(d=>`<span>${d}</span>`).join('')}</div></article></section>`;
  }

  function backupView(){
    const keys=Object.keys(localStorage).filter(k=>k.startsWith('studyforge'));
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">BACKUP / RESTORE</span><h3>Protect your StudyForge data</h3><p>Browser reset ya laptop change se pehle JSON backup save kar lo.</p></div></div><div class="sfp-grid two"><article class="sfp-card"><h3>Export Backup</h3><p>${keys.length} StudyForge local data stores milay.</p><button class="sfp-primary" id="sfp-export">Download Backup</button></article><article class="sfp-card"><h3>Restore Backup</h3><p>StudyForge backup JSON select karo. Existing local StudyForge data replace ho sakta hai.</p><input id="sfp-import-file" type="file" accept="application/json"><button class="sfp-secondary" id="sfp-import">Restore selected backup</button></article></div><article class="sfp-card sfp-warning"><b>Important:</b> Backup mein sirf StudyForge ke localStorage keys export hote hain; GitHub source code ya account credentials nahi.</article></section>`;
  }

  function notesView(){
    const notes=state.notes||[];
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">DAILY NOTES / NOTEBOOK</span><h3>${notes.length} saved notes</h3><p>Formula, paper-ready line, definition ya quick revision note save karo.</p></div></div><article class="sfp-card"><div class="sfp-form-grid"><label>Subject<select id="sfp-note-sub">${['Maths','Physics','Chemistry','Computer','English','Urdu','Pak Studies','Tarjuma-tul-Quran'].map(s=>`<option>${s}</option>`).join('')}</select></label><label>Topic<input id="sfp-note-topic" placeholder="Topic name"></label><label>Note<input id="sfp-note-text" placeholder="Short paper-ready note"></label></div><button class="sfp-primary" id="sfp-add-note">Save note +10 XP</button></article><div class="sfp-grid two">${notes.slice().reverse().map((n,ri)=>{const i=notes.length-1-ri;return `<article class="sfp-card"><span class="sfp-badge">${esc(n.subject)}</span><h4>${esc(n.topic)}</h4><p>${esc(n.text)}</p><div class="sfp-between"><small>${esc(n.when)}</small><button class="sfp-ghost" data-note-delete="${i}">Delete</button></div></article>`}).join('')||'<article class="sfp-card"><p>No notes yet.</p></article>'}</div></section>`;
  }

  function countdownView(){
    const date=state.examDate||''; let days=null,weeks=null;
    if(date){const diff=new Date(date+'T09:00:00')-new Date();days=Math.max(0,Math.ceil(diff/86400000));weeks=Math.max(1,days/7);}
    const mastered=masteryCount(), remaining=Math.max(0,TOTAL_BLOCKS-mastered), pace=weeks?Math.ceil(remaining/weeks*10)/10:null;
    return `<section class="sfp-wrap"><div class="sfp-hero"><div><span class="sfp-kicker">GOAL COUNTDOWN</span><h3>${days===null?'Set your board exam date':`${days} days remaining`}</h3><p>${days===null?'Exact exam date tum set karoge; StudyForge guess nahi karega.':`${Math.floor(days/7)} weeks + ${days%7} days`}</p></div><label class="sfp-mini-input">Board exam date<input id="sfp-exam-date" type="date" value="${esc(date)}"></label></div><div class="sfp-grid three"><article class="sfp-card"><strong class="sfp-big">${mastered}/${TOTAL_BLOCKS}</strong><p>Tracked syllabus mastered</p></article><article class="sfp-card"><strong class="sfp-big">${remaining}</strong><p>Blocks remaining</p></article><article class="sfp-card"><strong class="sfp-big">${pace===null?'—':pace}</strong><p>${pace===null?'blocks/week after date set':'required blocks/week'}</p></article></div><article class="sfp-card"><h4>Target</h4><p>1100+ marks. Countdown pace syllabus completion ko time remaining ke saath combine karta hai; final marks test accuracy aur revision quality par bhi depend karte hain.</p></article></section>`;
  }

  let mockTicker=null;
  function wire(id,body){
    if(mockTicker){clearInterval(mockTicker);mockTicker=null;}
    if(id==='planner'){
      body.querySelector('#sfp-plan-min').onchange=e=>{state.plannerMinutes=Number(e.target.value)||150;save();renderPlus('planner')};
      body.querySelectorAll('[data-plan-done]').forEach((b,i)=>b.onclick=()=>{const x=plannerCandidates()[i],k=x.subject+'|'+x.topic;state.plannerDone=state.plannerDone||[];if(!state.plannerDone.includes(k)){state.plannerDone.push(k);addXP(25);}save();renderPlus('planner')});
    }
    if(id==='predictor'){
      ['total','target','expected'].forEach(k=>{const el=body.querySelector('#sfp-'+k);el.onchange=()=>{state.predictor=state.predictor||{};state.predictor[k]=Number(el.value);save();renderPlus('predictor')}});
    }
    if(id==='qbank'){
      [['#sfp-q-sub','subject'],['#sfp-q-type','type'],['#sfp-q-diff','difficulty']].forEach(([sel,k])=>{body.querySelector(sel).onchange=e=>{state.qbank[k]=e.target.value;state.qbank.index=0;state.qbank.revealed=false;save();renderPlus('qbank')}});
      const list=filteredBank(); if(list.length){
        body.querySelector('#sfp-reveal').onclick=()=>{state.qbank.revealed=true;save();renderPlus('qbank')};
        body.querySelector('#sfp-q-prev').onclick=()=>{state.qbank.index=(state.qbank.index-1+list.length)%list.length;state.qbank.revealed=false;save();renderPlus('qbank')};
        body.querySelector('#sfp-q-check').onclick=()=>{const q=list[(state.qbank.index||0)%list.length],ans=body.querySelector('#sfp-q-answer').value.trim(),good=answerGood(ans,q);if(good){state.qbank.correct=(state.qbank.correct||0)+1;addXP(15);}else{state.qbank.wrong=(state.qbank.wrong||0)+1;state.weakExtra=state.weakExtra||[];if(!state.weakExtra.some(w=>w.topic===q.topic))state.weakExtra.push({subject:q.s,topic:q.topic});}state.qbank.index=((state.qbank.index||0)+1)%list.length;state.qbank.revealed=false;save();renderPlus('qbank')};
      }
    }
    if(id==='exam'){
      if(!state.mock){body.querySelector('#sfp-start-mock').onclick=()=>{startMock();renderPlus('exam')}}
      else if(state.mock.finished){body.querySelector('#sfp-new-mock').onclick=()=>{state.mock=null;save();renderPlus('exam')}}
      else{
        const qs=mockQuestions(),m=state.mock,q=qs[m.index];
        const saveAns=()=>{m.answers[q.id]=body.querySelector('#sfp-mock-answer').value.trim();save();};
        body.querySelector('#sfp-mock-answer').oninput=saveAns;
        const prev=body.querySelector('#sfp-mock-prev'); if(prev)prev.onclick=()=>{saveAns();m.index=Math.max(0,m.index-1);save();renderPlus('exam')};
        body.querySelector('#sfp-mock-next').onclick=()=>{saveAns();if(m.index<4){m.index++;save();renderPlus('exam');return;}let correct=0;qs.forEach(x=>{if(answerGood(m.answers[x.id]||'',x))correct++;else{state.weakExtra=state.weakExtra||[];if(!state.weakExtra.some(w=>w.topic===x.topic))state.weakExtra.push({subject:x.s,topic:x.topic});}});m.score=correct*2;m.finished=true;addXP(correct*20+20);save();renderPlus('exam')};
        mockTicker=setInterval(()=>{const el=document.getElementById('sfp-mock-clock');if(!el)return;const left=Math.max(0,600-Math.floor((Date.now()-m.started)/1000));el.textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;if(left===0){clearInterval(mockTicker);mockTicker=null;body.querySelector('#sfp-mock-next')?.click();}},1000);
      }
    }
    if(id==='streak'){
      const b=body.querySelector('#sfp-mark-today'); if(b&&!b.disabled)b.onclick=()=>{const today=new Date().toLocaleDateString('en-CA');state.studyDates=state.studyDates||[];if(!state.studyDates.includes(today)){state.studyDates.push(today);addXP(50);}save();renderPlus('streak')};
    }
    if(id==='backup'){
      body.querySelector('#sfp-export').onclick=()=>{const pack={version:1,exportedAt:new Date().toISOString(),data:{}};Object.keys(localStorage).filter(k=>k.startsWith('studyforge')).forEach(k=>pack.data[k]=localStorage.getItem(k));const blob=new Blob([JSON.stringify(pack,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`StudyForge-Backup-${new Date().toLocaleDateString('en-CA')}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
      body.querySelector('#sfp-import').onclick=()=>{const f=body.querySelector('#sfp-import-file').files[0];if(!f)return alert('Pehle backup JSON select karo.');const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);if(!p.data)throw new Error('Invalid');Object.entries(p.data).forEach(([k,v])=>{if(k.startsWith('studyforge'))localStorage.setItem(k,v)});alert('Backup restored. StudyForge reload ho raha hai.');location.reload();}catch{alert('Valid StudyForge backup file nahi hai.')}};r.readAsText(f)};
    }
    if(id==='notes'){
      body.querySelector('#sfp-add-note').onclick=()=>{const subject=body.querySelector('#sfp-note-sub').value,topic=body.querySelector('#sfp-note-topic').value.trim(),text=body.querySelector('#sfp-note-text').value.trim();if(!topic||!text)return alert('Topic aur note dono likho.');state.notes=state.notes||[];state.notes.push({subject,topic,text,when:new Date().toLocaleString()});addXP(10);save();renderPlus('notes')};
      body.querySelectorAll('[data-note-delete]').forEach(b=>b.onclick=()=>{state.notes.splice(Number(b.dataset.noteDelete),1);save();renderPlus('notes')});
    }
    if(id==='countdown') body.querySelector('#sfp-exam-date').onchange=e=>{state.examDate=e.target.value;save();renderPlus('countdown')};
  }

  const observer=new MutationObserver(()=>ensureTabs());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureTabs);else ensureTabs();
})();
