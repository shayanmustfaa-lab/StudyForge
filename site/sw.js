const C='studyforge-v14';
const A=['/StudyForge/','/StudyForge/index.html','/StudyForge/study-center.css','/StudyForge/study-center-fix.css','/StudyForge/study-center-plus.css','/StudyForge/marks-predictor-standalone.css','/StudyForge/book-solutions.css','/StudyForge/study-center-day8.js','/StudyForge/study-center.js','/StudyForge/study-center-plus.js','/StudyForge/marks-predictor-standalone.js','/StudyForge/book-solutions-data.js','/StudyForge/book-solutions-day9.js','/StudyForge/book-solutions.js','/StudyForge/overview-day8.js','/StudyForge/site-progress-day8.js','/StudyForge/schedule-break-aug20.js','/StudyForge/favicon.svg','/StudyForge/assets/index-8gs8kE9x.css','/StudyForge/assets/page-BU6xjBOL.js','/StudyForge/assets/index-3D-xvmeP.js','/StudyForge/assets/framework-CXnKph_e.js','/StudyForge/assets/layout-segment-context-BEn7xxCh.js','/StudyForge/assets/rolldown-runtime-S-ySWqyJ.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isShell=u.pathname==='/StudyForge/'||u.pathname.endsWith('/StudyForge/index.html');
  const fresh=isShell||u.pathname.includes('/study-center')||u.pathname.includes('/marks-predictor-standalone')||u.pathname.includes('/book-solutions')||u.pathname.includes('/overview-day8')||u.pathname.includes('/site-progress-day8')||u.pathname.includes('/schedule-break-aug20')||u.pathname.endsWith('/sw.js');
  if(fresh){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request,c));return n}).catch(()=>caches.match('/StudyForge/index.html'))));
});
