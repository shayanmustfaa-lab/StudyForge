const C='studyforge-v3';
const A=['/StudyForge/','/StudyForge/index.html','/StudyForge/study-center.css','/StudyForge/study-center.js','/StudyForge/favicon.svg','/StudyForge/assets/index-8gs8kE9x.css','/StudyForge/assets/page-BU6xjBOL.js','/StudyForge/assets/index-3D-xvmeP.js','/StudyForge/assets/framework-CXnKph_e.js','/StudyForge/assets/layout-segment-context-BEn7xxCh.js','/StudyForge/assets/rolldown-runtime-S-ySWqyJ.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put(e.request,c));return n}).catch(()=>caches.match('/StudyForge/index.html'))))});
