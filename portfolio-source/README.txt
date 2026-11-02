HOW TO RUN (VS Code)
1. Unzip this folder. In VS Code: File > Open Folder > choose "portfolio-source". Do NOT paste code into a new file.
2. Install the "Live Server" extension, right-click index.html > "Open with Live Server".
   (No extension? In the VS Code terminal run:  python -m http.server 8080   then open http://localhost:8080 )
3. Needs internet for fonts and the Iconoir icons.

FILES
index.html            page markup
css/style.css         all styles
js/part*.js           page scripts (loaded in order by index.html)
js/projects-data.js   the 45 embedded projects
assets/               images extracted from the page

TO EDIT
- Footer links: CONFIG in the features script (email, linkedin, github, instagram, resume).
- VIVRE CARD alerts: NOTIFY_URL. 3D scene: SPLINE_URL. Artist work links: ART list.


VISITOR WALL (so every visitor's card is stored on your website)
A static site can't save data by itself, so the wall uses Firebase Firestore (free tier):
1. console.firebase.google.com > Add project > then Build > Firestore Database > Create database (production mode).
2. Project settings > General > Your apps > Web app (</>) > copy "projectId" and "apiKey" into js/wall-config.js.
3. Firestore > Rules, paste this and Publish (anyone can read and add a card, nobody can edit or delete from the site):
   rules_version = '2';
   service cloud.firestore { match /databases/{db}/documents { match /visitors/{id} {
     allow read: if true;
     allow create: if request.resource.data.keys().hasOnly(['name','theme','bg','desc','photo','ig','ts'])
       && request.resource.data.name is string && request.resource.data.name.size() <= 24
       && request.resource.data.desc.size() <= 140 && request.resource.data.ig.size() <= 30 && request.resource.data.photo.size() < 40000;
     allow update, delete: if false; } } }
4. Set siteUrl in js/wall-config.js to your live address so the QR on each card opens your portfolio.
5. To remove a card: Firestore console > visitors > delete the document.
Only the name, theme, background, tagline and a small photo thumbnail are stored, and only if the visitor chooses "Yes, add me".

INSTAGRAM QR: the VIVRE bot asks for the visitor's Instagram handle (optional). The QR on the back of their card opens instagram.com/<handle>. With no handle it opens your site (set siteUrl in js/wall-config.js). The handle is shown on the wall only if they choose 'Yes, add me'. If you already published the old Firestore rules, replace them with the ones above (they now allow the 'ig' field).


CONTACT BACKEND (messages go straight to your inbox)
The "What brings you here?" panel posts to api/contact.js (a Vercel serverless function) which emails you via Resend (free tier).
The subject shows what they want: [PROJECT], [EDITING] or [FILMY].
1. resend.com > sign up with rudrakoregave@gmail.com > API Keys > create a key.
2. Vercel > your project > Settings > Environment Variables > add RESEND_API_KEY = (the key). Optional: TO_EMAIL, FROM_EMAIL.
3. Redeploy. (The api/ folder must be at the top level next to index.html.)
Until it is set up, or when testing locally with Live Server, the Send button falls back to a WhatsApp button with the message pre-filled (+91 98194 96450).
