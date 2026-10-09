# Nelikum TVET: upgraded site

**Run it:** serve the folder over http (PWA, service worker and Firebase modules do not work from file://).
`python3 -m http.server 8000` then open http://localhost:8000

**Keep your existing `images/` folder** next to these files (same file names as before). Missing images show a branded placeholder.

**Before launch**
1. Replace `https://www.nelikumtvet.example` with your domain in every page (canonical/og tags), `sitemap.xml` and `robots.txt`.
2. Firebase: create a project, enable Firestore, paste config into `js/firebase-config.js`.
3. Firestore rules (public can send forms and read news, nobody can read applications):
```
rules_version = '2';
service cloud.firestore { match /databases/{db}/documents {
  match /applications/{id} { allow create: if true; }
  match /enquiries/{id}    { allow create: if true; }
  match /news/{id}         { allow read: if true; }
}}
```
Add news in the console: collection `news`, fields `title`, `text`, `tag`, `createdAt` (timestamp).
4. Tailwind uses the CDN build for easy editing. For best speed, switch to the Tailwind CLI build later.
5. Edit content in the HTML pages; course data lives in `js/data.js`.
