# SilvaScenes project page

Static site for the paper *SilvaScenes: Challenges of Automating Tree Detection and Species
Classification from Under-Canopy Images in Natural Forests*. No build step: plain HTML, CSS and JS.

```
index.html                          page content
static/css/index.css                styles (light and dark themes via CSS variables at the top)
static/js/index.js                  species explorer data, interactive map, lightbox, BibTeX copy
static/data/bioclimatic_domains.geojson   simplified bioclimatic domains for the map
static/images/                      figures exported from the manuscript
static/vendor/leaflet/              map library
.nojekyll                           tells GitHub Pages to serve the files as-is
```

## Preview locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Publish on GitHub Pages

From inside this folder:

```bash
git init -b gh-pages
git add .
git commit -m "Project page"
git remote add origin git@github.com:norlab-ulaval/SilvaScenes.git
git push --force origin gh-pages
```

Then, once: repository **Settings → Pages → Build and deployment → Deploy from a branch**,
branch `gh-pages`, folder `/ (root)`. The site is served at
`https://norlab-ulaval.github.io/SilvaScenes/`.

## To update at publication

Search `index.html` for `TODO`:

- **Paper button**: currently links to the arXiv preprint (2510.09458).
- **Dataset button**: shown as "coming soon"; replace the `<span class="btn is-soon">` with a link.
- **BibTeX**: currently the arXiv entry; replace with the journal reference.

## Data

- Species counts per forest: `SPECIES` array at the top of `static/js/index.js`
  (11 counts per species, in the order of `FOREST_NAMES`). Domain counts are computed from them.
- Unknown trees per forest: `UNKNOWN`.
- Forest markers and their totals: `FORESTS`. The forest table is in `index.html`.
- Figures: replace the file in `static/images/` under the same name.
