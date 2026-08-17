(() => {
  'use strict';
  const BASE_STORE='studyforge-study-center-v1';
  const PLUS_STORE='studyforge-study-center-plus-v1';
  const TOTAL_BLOCKS=87;

  const read=(k,f={})=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch{return f}};
  const savePlus=p=>localStorage.setItem(PLUS_STORE,JSON.stringify(p));
  const base=()=>read(BASE_STORE,{});
  const plus=()=>read(PLUS_STORE,{});
  const masteryCount=()=>Object.values(base().statuses||{}).filter(v=>v==='Mastered').length;

  function predictorData(){
    const p=plus().predictor||{};
    const total=Number(p.total)||1200;
    const target=Number(p.target)||1100;
    const expected=Math.max(1,Math.min(100,Number(p.expected)||90));
    const recorded=85.2;
    const mastered=masteryCount();
    const masteryPct=Math.round(mastered/TOTAL_BLOCKS*100);
    const blended=recorded*.35+expected*.65;
    const projection=Math.round(total*blended/100);
    const uncertainty=Math.max(20,Math.round((1-masteryPct/100)*70));
    const lo=Math.max(0,projection-uncertainty);
    const hi=Math.min(total,projection+uncertainty);
    const targetPct=Math.round(target/total*1000)/10;
    const gap=Math.max(0,target-projection);
    return {total,target,expected,recorded,mastered,masteryPct,projection,lo,hi,targetPct,gap};
  }

  function ensureNav(){
    document.querySelectorAll('[data-plus-tab="predictor"]').forEach(el=>el.remove());
    const divider=document.querySelector('.sfp-tab-divider');
    if(divider && !document.querySelector('.sfp-tab')) divider.remove();

    const nav=document.querySelector('.sidebar nav');
    if(!nav || document.getElementById('sf-marks-nav')) return;
    const b=document.createElement('button');
    b.id='sf-marks-nav';
    b.type='button';
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16M6 16V9m4 7V5m4 11v-4m4 4V7"></path></svg> Marks Predictor';
    b.addEventListener('click',openPredictor);
    const study=document.getElementById('sf-center-nav');
    if(study && study.nextSibling) nav.insertBefore(b,study.nextSibling); else nav.appendChild(b);
  }

  function ensurePanel(){
    if(document.getElementById('sf-marks-predictor')) return;
    const wrap=document.createElement('div');
    wrap.id='sf-marks-predictor';
    wrap.innerHTML='<div class="sfmp-shell"><header class="sfmp-head"><div><span>STUDYFORGE</span><h2>Marks Predictor</h2><p>Tests, syllabus mastery aur expected exam accuracy se planning estimate.</p></div><button class="sfmp-close" aria-label="Close">×</button></header><main class="sfmp-body"></main></div>';
    document.body.appendChild(wrap);
    wrap.querySelector('.sfmp-close').onclick=()=>wrap.classList.remove('open');
    wrap.addEventListener('click',e=>{if(e.target===wrap)wrap.classList.remove('open')});
  }

  function openPredictor(){
    const center=document.getElementById('sf-center');
    if(center) center.classList.remove('open');
    ensurePanel();
    render();
    document.getElementById('sf-marks-predictor').classList.add('open');
  }

  function render(){
    const d=predictorData();
    const body=document.querySelector('#sf-marks-predictor .sfmp-body');
    if(!body) return;
    body.innerHTML=`
      <section class="sfmp-hero">
        <div><span class="sfmp-kicker">MARKS PREDICTOR</span><h3>${d.lo}–${d.hi} estimated range</h3><p>Ye planning estimate hai, guarantee nahi. Syllabus coverage aur test data barhne ke sath estimate zyada useful hota jayega.</p></div>
        <div class="sfmp-score"><strong>${d.projection}</strong><span>mid estimate</span></div>
      </section>
      <section class="sfmp-grid three">
        <article class="sfmp-card"><span>Recorded board-exam accuracy</span><strong>${d.recorded}%</strong><p>Board Exam Part 1: 52/61. Study mastery bank: 286/286.</p></article>
        <article class="sfmp-card"><span>Syllabus mastery signal</span><strong>${d.masteryPct}%</strong><p>${d.mastered}/${TOTAL_BLOCKS} tracked blocks currently mastered.</p></article>
        <article class="sfmp-card"><span>Target requirement</span><strong>${d.targetPct}%</strong><p>${d.gap?`${d.gap} marks below current midpoint.`:'Current midpoint is at/above target.'}</p></article>
      </section>
      <section class="sfmp-card sfmp-controls">
        <h3>Prediction settings</h3>
        <div class="sfmp-form">
          <label>Total Matric marks<input id="sfmp-total" type="number" value="${d.total}"></label>
          <label>Your target<input id="sfmp-target" type="number" value="${d.target}"></label>
          <label>Expected exam accuracy %<input id="sfmp-expected" type="number" min="1" max="100" value="${d.expected}"></label>
        </div>
        <p>Expected exam accuracy ko realistic rakho. Predictor latest board-exam accuracy aur expected exam accuracy ko blend karta hai, phir incomplete syllabus ke liye uncertainty add karta hai.</p>
      </section>`;

    ['total','target','expected'].forEach(k=>{
      const el=body.querySelector('#sfmp-'+k);
      el.onchange=()=>{
        const s=plus();
        s.predictor=s.predictor||{};
        s.predictor[k]=Number(el.value);
        savePlus(s);
        render();
      };
    });
  }

  const obs=new MutationObserver(()=>ensureNav());
  obs.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ensureNav); else ensureNav();
  setInterval(ensureNav,1500);
})();