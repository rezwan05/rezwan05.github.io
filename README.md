# sikderhuq.com

Personal website. Plain HTML, no build step.

## Deploy on GitHub Pages
1. Create a repo named `rezwan05.github.io` (public).
2. Upload everything in this folder to the repo root (keep the folder structure: index.html at root, blog/, courses/, assets/).
3. Settings > Pages: Source = "Deploy from a branch", Branch = main, folder = / (root). Save.
4. Site is live at https://rezwan05.github.io within a minute.

## Point sikderhuq.com at it (later)
1. In GoDaddy DNS: add CNAME record: www -> rezwan05.github.io
2. Add four A records for @: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
3. In repo Settings > Pages, set custom domain to sikderhuq.com and enable "Enforce HTTPS".
4. Add a file named CNAME (no extension) at repo root containing exactly: sikderhuq.com

## Editing
- Blog posts live in blog/. Copy an existing post as a template, then add a link on the Blog page and homepage list in index.html.
- Course pages live in courses/.
