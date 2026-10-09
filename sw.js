const V = "nelikum-v1";
const CORE = ["index.html", "about.html", "board.html", "courses.html", "programmes.html", "how-to-apply.html", "apply-online.html", "news.html", "gallery.html", "downloads.html", "faq.html", "contact.html", "offline.html", "css/custom.css", "js/tw-config.js", "js/data.js", "js/app.js", "js/firebase-config.js", "js/firebase-init.js", "manifest.webmanifest", "icons/icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || /googleapis\.com$/.test(u.hostname) && u.hostname !== "fonts.googleapis.com" || u.hostname === "www.google.com") return;
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match("offline.html"))));
    return;
  }
  e.respondWith(caches.match(r).then(m => {
    const net = fetch(r).then(res => { if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; }).catch(() => m);
    return m || net;
  }));
});
