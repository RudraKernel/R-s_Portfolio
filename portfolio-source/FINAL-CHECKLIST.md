# Launch checklist

## Must do before sharing the link (the intro Earth is drawn in code now, so no photos are needed)
1. **Music:** put your track at `assets/starboy.mp3`. (Until then the music button hides itself.)
2. **Reels:** add your reels in `js/artist-videos.js` (paste the Instagram reel links). Until then the Edits and film tab links to @thegalacticrudra.
3. **Visitor wall:** create the free Firebase project (steps in `README.txt`) and fill `js/wall-config.js` (projectId, apiKey, siteUrl).
   Until then the public site hides the wall and the VIVRE bot skips the "add me to the wall" question, so nobody sees an empty wall.

## Deploy (Vercel, free)
1. Put the folder in your R-s-Portfolio GitHub repo (index.html at the top level).
2. vercel.com > Add New > Project > import the repo > Deploy. No build settings needed.
3. Add the live link to: GitHub profile Website field, Instagram bio, LinkedIn, résumé.
4. Share image: after deploy, change `assets/og.png` in the two meta tags to the full address, e.g. `https://yoursite.vercel.app/assets/og.png`.

## Final checks on the live site
- Open on your phone and on a laptop; press Enter on the intro, scroll to the end.
- Open one build from the dome, make a VIVRE card with your own Instagram and scan its QR.
- Open the résumé PDF.
