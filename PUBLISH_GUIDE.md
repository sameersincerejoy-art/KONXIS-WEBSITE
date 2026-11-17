# Konxis Engineering — GitHub Pages publish guide

This is the complete, self-contained guide to publishing the Konxis Engineering site as a free demo on GitHub Pages. It is written so you can follow it in one sitting and end with a live HTTPS URL.

## What you will get

- A free demo site served over HTTPS.
- No server to manage.
- A URL you can send to someone immediately.
- A clear way to re-publish when you change the copy later.

## What the site actually publishes

Your project is already set up to read assets from `public/`. `deploy.json` says:

```json
{
  "assetsDirectory": "public"
}
```

That means the published site should have this shape at its root:

- `index.html`
- `about.html`, `capabilities.html`, `case-studies.html`, `contact.html`, `industries.html`, `insights.html`, `privacy.html`, `terms.html`
- `styles.css`
- `main.js`
- `assets/` (including the team image you added: `assets/images/team.jpg`)
- the case-study PDFs in `assets/` if you want them published

That is exactly what lives in the `public/` folder right now. The root project folder also has `deploy.json`, `index.js`, the PDFs at the root, temp files, and PDFs at root — you do not want all of that in the published site. So the clean Github Pages shape is: **publish the contents of `public/` as the site root.**

## Which GitHub Pages mode to use

There are two common free modes:

1. **Project page** — `https://<your-username>.github.io/<repo-name>/`
   - Easy because the repo can contain anything; Pages serves one chosen folder.
   - Best fit here, because your project has helper files and artifacts that should not be the site.

2. **User/org page** — `https://<your-username>.github.io/`
   - Requires a repo named `<your-username>.github.io`.
   - The published root must be exactly `index.html` at the repo root.
   - Cleaner URL, but forces you to keep the repo root equal to the site root.

Recommendation: use the **project page** mode unless you specifically want the bare `username.github.io` URL. The steps below assume project mode, and I note the user-page alternative where it diverges.

## Step 1 — Prepare a deploy folder

Do not try to publish the whole project root as-is. Instead, prepare a folder whose contents are exactly what should be on the live site.

### Option A — use `public/` directly (recommended)

The already-synched `public/` folder is exactly the published site shape. If it is current and byte-synced with the source HTML/CSS, just use it.

Check it is current:

```bash
# quick sanity: public must contain the entries below
ls public/index.html public/styles.css public/main.js public/assets/images/team.jpg
```

If those exist, `public/` is publishable as-is.

### Option B — build a clean deploy folder

If you want total control, or if `public/` has stale files, build a clean folder:

```bash
rm -rf deploy_site
mkdir deploy_site

# copy the site files that should be live
cp index.html about.html capabilities.html case-studies.html contact.html \
   industries.html insights.html privacy.html terms.html \
   styles.css main.js sitemap.xml \
   deploy_site/

# copy the assets tree
cp -r assets deploy_site/

# team image should already be in assets/images/team.jpg at this point
ls deploy_site/assets/images/team.jpg
```

Do **not** copy into `deploy_site`:
- `deploy.json`
- `index.js`, `worker.js` (backend/runtime files, not site files)
- root-level PDFs unless you specifically want them served at the root
- audit scripts, backups, temp files
- `website_snapshot.md` unless you want it visible on the demo

If you want the case-study PDFs accessible from the site, copy the `assets/*.pdf` files too. If the case-studies page references them, they should travel with the site; check what the case-studies page actually links to before deciding.

Now `deploy_site/` contains exactly the live site.

## Step 2 — Create the repo

1. Go to GitHub and sign in (free account is fine).
2. Create a new public repository.
   - Name: anything you like, e.g. `konxis-engineering` or `konxis-demo`.
   - Public or private: either works for Pages, but public is simplest for a demo.
   - Do **not** initialize with README, license, or `.gitignore` for now; that keeps the first push clean. You can add those later.

If you want a user/org page instead, name the repo exactly `<your-username>.github.io`.

## Step 3 — Put the publishable folder at the repo root (project mode)

For a project page, the easiest and most robust choice is to make the deploy folder itself the repo contents. That avoids any confusion about which folder Pages should serve.

```bash
cd deploy_site
git init
git add .
git commit -m "Initial site publish"
```

Now `deploy_site/.git` is a repo whose root is exactly the site. That is what you push.

If you prefer to keep the project repo intact and publish only a subfolder, the alternative is to make the **repo root** be the project root and publish the `public/` subfolder from a `gh-pages` branch. That is more fiddly. For a demo, the “deploy folder is the repo” approach is cleaner.

## Step 4 — Push to GitHub

```bash
# inside deploy_site after git init + commit
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

Use your GitHub username and the repo name you created. If you authenticated GitHub CLI or credential manager already, the push will just work. If not, you will be prompted for credentials or a token; a personal access token or GitHub CLI login both work.

If you created a user/org page repo (`<username>.github.io`), push to that repo the same way, but the live URL will be `https://<username>.github.io/` rather than `/<repo>/`.

## Step 5 — Turn on GitHub Pages

1. Open the repo on GitHub.
2. Go to **Settings → Pages** (left sidebar).
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Branch: `main`, folder: **`/` (root)**.
   - This works because the repo root is the site root in the “deploy folder is the repo” approach.
5. Save.

If you instead kept the project root as the repo and only published `public/`, then in Pages choose branch `main` and folder `/public`. Either way, the rule is: the folder you select must have `index.html` at its root.

Wait about 1–2 minutes. GitHub will show a bar at the top of the Pages settings page with the live URL once it is ready.

## Step 6 — Verify the live site

Open the URL GitHub gives you. Check:

- Homepage loads.
- Nav links work (they are relative `.html` links — they will work as long as the published tree matches the local one).
- The team image loads (`assets/images/team.jpg`).
- `styles.css` applies (check a page that uses the layout; the homepage hero, the nav, the About page, the Insights article blocks).
- Case-studies page, if it references PDFs, loads those PDFs from the published `assets/` tree.

A quick check command you can run against the published tree before pushing:

```bash
cd deploy_site
echo "Homepage exists:"; test -f index.html && echo yes || echo no
echo "CSS exists:"; test -f styles.css && echo yes || echo no
echo "JS exists:"; test -f main.js && echo yes || echo no
echo "Team image exists:"; test -f assets/images/team.jpg && echo yes || echo no
echo "HTML pages:"; ls *.html
echo "Asset tree:"; ls -1 assets/ 2>/dev/null
```

## Step 7 — Update later

When you change copy in the source HTML files:

1. Edit the source files in the project.
2. Sync changes into the publishable tree (`public/` or `deploy_site/`), the same way you have been syncing root → public.
3. Commit and push from the deploy repo:
   ```bash
   cd deploy_site
   git add .
   git commit -m "Update site copy"
   git push
   ```
4. Wait a minute; Pages re-deploys from the branch automatically.

That is the whole lifecycle. No build step, no Node, no framework.

## URL forms you will end up with

- Project page: `https://<your-username>.github.io/<repo-name>/`
- User/org page: `https://<your-username>.github.io/`

The project page is the path described above. If you want the shorter user/org URL, use the repo naming rule in Step 2 and make sure the repo root contains `index.html` at its root.

## Common failure points and how to avoid them

- **404 on homepage:** the Pages source folder does not contain `index.html` at its root. Fix by choosing the right branch/folder, or by making the repo root be the site root.
- **CSS or images not loading:** the published tree does not match the local one. Check that `styles.css` and `assets/` are in the published folder at the same relative paths the HTML expects.
- **Old version of the site showing:** you edited the source files but did not re-sync them into `public/` or `deploy_site/` before pushing. The publishable tree and the source tree can drift; always sync before push.
- **Nav links breaking:** they are relative `.html` links, so they only break if you publish into a subpath and then move pages around. In the setup above, all `href="about.html"` style links work as-is.

## If you want a custom domain later

GitHub Pages supports a custom domain with HTTPS via CNAME and TLS provisioning through GitHub. That is free too, but it requires:
- owning the domain,
- adding a CNAME file at the repo root (`echo "www.example.com" > CNAME`),
- configuring DNS at your registrar.

That is a separate step and not required for a demo. Skip it until you want a branded URL.

## Quick copy-paste version for the demo

If you just want the shortest repeatable recipe:

```bash
# 1. Prepare publishable folder (choose public/ or a clean copy)
cp -r public deploy_site
cd deploy_site

# 2. Make it a git repo
git init
git add .
git commit -m "Initial site publish"

# 3. Push to a new GitHub repo you created
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main

# 4. In GitHub: Settings → Pages → source main / root → save
# 5. Visit the URL GitHub displays
```

After that, any future edit is: edit source → sync into `deploy_site/` → commit → push. Pages handles the rest.

## What about the existing project git state

Right now there is no remote and no branch active in this project folder, and the repo here is not yet connected to GitHub. So you are starting fresh for publishing purposes, which is fine. The publish steps above create a new repo from the deploy folder, independent of whether the project folder itself is a git repo.

If you later want the **project folder itself** to be the git repo and publish only `public/` from a `gh-pages` branch, that is doable but more involved; the approach above avoids that complexity for a demo.

## Final check before you send the URL

Open the live site once and confirm:
- the homepage hero and nav render cleanly,
- the About page reads as a team page,
- the Insights articles are present and the “Read article” links scroll to the right in-page sections,
- the team image shows on About.

If all of that is good, you have a free, live, shareable demo. That’s the whole GitHub Pages path.