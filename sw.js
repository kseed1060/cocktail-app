const C="cocktail-v7",F=["./","index.html","css/app.css","js/app.js","js/config.js","js/recipes.js","js/recipes2.js","js/brands.js","js/stories.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});

self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){}
const t=String(d.title||"오늘의 한 잔").slice(0,40),b=String(d.body||"오늘 밤은 어떤 한 잔이 좋을까요? 🍸").slice(0,160);
e.waitUntil(self.registration.showNotification(t,{body:b,icon:"icons/icon-192.png",badge:"icons/icon-192.png",tag:"cocktail-daily",renotify:true,data:{url:d.url||"./"}}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const u=new URL(e.notification.data&&e.notification.data.url||"./",self.registration.scope).href;
e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l)if(c.url.startsWith(self.registration.scope)&&"navigate"in c)return c.navigate(u).then(w=>(w||c).focus());return self.clients.openWindow(u)}))});
