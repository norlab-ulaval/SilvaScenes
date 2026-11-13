/* SilvaScenes project page: theme toggle, interactive map, species explorer, figure lightbox, BibTeX copy. */
(function () {
  "use strict";

  /* Number of annotated trees of each species in each forest. The 11 counts follow the order
     of FOREST_NAMES below. The last value marks the 21 species kept as their own class in the
     benchmark; the others are grouped as "Other". Counts per bioclimatic domain are computed
     from these, using FOREST_DOMAIN. */
  var DOMAINS = [
    { key: "smbh", label: "Sugar maple–Bitternut hickory" },
    { key: "smyb", label: "Sugar maple–Yellow birch" },
    { key: "smbw", label: "Sugar maple–Basswood" },
    { key: "bfyb", label: "Balsam fir–Yellow birch" },
    { key: "bfwb", label: "Balsam fir–White birch" }
  ];
  /* Order in which the domains are presented everywhere (north to south):
     BF-WB, BF-YB, SM-YB, SM-BW, SM-BH. Values are indices into DOMAINS. */
  var DOMAIN_ORDER = [4, 3, 1, 2, 0];
  var SPECIES = [
    // Broadleaf
    ["B", "Betula alleghaniensis", "Yellow birch", [0, 0, 37, 24, 0, 0, 0, 9, 5, 6, 0], 1],
    ["B", "Betula papyrifera", "White birch", [0, 30, 9, 2, 13, 0, 11, 6, 21, 21, 0], 1],
    ["B", "Betula populifolia", "Grey birch", [0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0], 0],
    ["B", "Ostrya virginiana", "Ironwood", [0, 0, 0, 0, 0, 0, 0, 1, 8, 7, 22], 1],
    ["B", "Fagus grandifolia", "American beech", [0, 0, 3, 43, 0, 0, 0, 42, 3, 72, 0], 1],
    ["B", "Quercus bicolor", "Swamp white oak", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], 0],
    ["B", "Quercus rubra", "Red oak", [0, 0, 0, 0, 3, 0, 0, 45, 25, 19, 2], 1],
    ["B", "Carya cordiformis", "Bitternut hickory", [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 35], 0],
    ["B", "Juglans cinerea", "Butternut", [0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1], 0],
    ["B", "Tilia americana", "Basswood", [0, 0, 0, 0, 0, 0, 0, 19, 3, 32, 9], 1],
    ["B", "Fraxinus americana", "White ash", [0, 0, 0, 0, 0, 0, 0, 13, 5, 31, 1], 1],
    ["B", "Fraxinus nigra", "Black ash", [0, 0, 2, 0, 0, 8, 0, 0, 0, 0, 1], 0],
    ["B", "Fraxinus pennsylvanica", "Red ash", [0, 0, 0, 0, 1, 102, 0, 6, 0, 0, 3], 1],
    ["B", "Crataegus canadensis", "Canadian hawthorn", [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0], 0],
    ["B", "Prunus pensylvanica", "Pin cherry", [0, 0, 0, 0, 7, 0, 4, 0, 0, 1, 0], 0],
    ["B", "Prunus serotina", "Black cherry", [0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0], 0],
    ["B", "Sorbus americana", "American mountain-ash", [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], 0],
    ["B", "Populus balsamifera", "Balsam poplar", [0, 0, 0, 0, 2, 15, 0, 2, 0, 0, 0], 0],
    ["B", "Populus grandidentata", "Largetooth aspen", [0, 0, 0, 0, 1, 0, 3, 63, 0, 20, 0], 1],
    ["B", "Populus tremuloides", "Trembling aspen", [0, 17, 9, 0, 42, 14, 30, 0, 2, 0, 0], 1],
    ["B", "Acer pensylvanicum", "Striped maple", [0, 0, 0, 8, 0, 0, 0, 4, 0, 13, 0], 1],
    ["B", "Acer rubrum", "Red maple", [0, 0, 24, 51, 96, 46, 6, 33, 47, 46, 1], 1],
    ["B", "Acer saccharinum", "Silver maple", [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0], 0],
    ["B", "Acer saccharum", "Sugar maple", [0, 0, 27, 51, 1, 98, 0, 46, 3, 140, 21], 1],
    ["B", "Acer spicatum", "Mountain maple", [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 0],
    ["B", "Ulmus americana", "White elm", [0, 0, 0, 0, 8, 10, 0, 0, 0, 0, 1], 1],
    // Conifer
    ["C", "Thuja occidentalis", "Eastern white-cedar", [0, 0, 0, 0, 0, 0, 1, 1, 60, 0, 0], 0],
    ["C", "Abies balsamea", "Balsam fir", [9, 249, 46, 8, 4, 0, 54, 0, 30, 0, 0], 1],
    ["C", "Larix laricina", "Tamarack", [10, 0, 0, 0, 46, 0, 0, 0, 2, 0, 0], 1],
    ["C", "Picea glauca", "White spruce", [0, 53, 3, 0, 2, 0, 5, 0, 0, 0, 0], 1],
    ["C", "Picea mariana", "Black spruce", [61, 38, 0, 0, 1, 0, 0, 0, 0, 0, 0], 1],
    ["C", "Picea rubens", "Red spruce", [0, 0, 17, 0, 0, 0, 43, 2, 0, 0, 0], 1],
    ["C", "Pinus banksiana", "Jack pine", [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0], 0],
    ["C", "Pinus resinosa", "Red pine", [0, 0, 0, 0, 0, 0, 41, 0, 0, 0, 0], 0],
    ["C", "Pinus strobus", "Eastern white pine", [0, 0, 0, 0, 9, 1, 21, 15, 0, 3, 0], 1],
    ["C", "Tsuga canadensis", "Eastern hemlock", [0, 0, 1, 0, 0, 1, 0, 35, 22, 32, 0], 1]
  ];

  var FOREST_NAMES = ["Lac Sept-Îles", "Forêt Montmorency", "Duchesnay", "Mont Bélair", "Base de plein air",
    "St-Augustin", "Mastigouche", "Leclercville", "Ripon", "Rigaud", "Châteauguay"];
  /* Bioclimatic domain of each forest (index into DOMAINS). */
  var FOREST_DOMAIN = [4, 4, 3, 2, 2, 2, 1, 2, 1, 0, 0];

  /* Trees labelled Unknown (damaged, diseased, or dead), per forest. They belong to the
     "Other" class together with the species whose last value above is 0. */
  var UNKNOWN = [0, 1, 1, 6, 4, 1, 0, 0, 2, 4, 0];

  /* Filter: a bioclimatic domain (-1 = all), then optionally one forest of that domain (-1 = all). */
  var state = { domain: -1, forest: -1, sort: "taxonomy", group: "species" };

  function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* Segments [{domain index, count}] to draw for one species under the current filter. */
  function segments(s) { return segmentsOf(s[3]); }
  function segmentsOf(perForest) {
    if (state.forest >= 0) {
      return [{ d: FOREST_DOMAIN[state.forest], n: perForest[state.forest] }];
    }
    var perDomain = DOMAINS.map(function () { return 0; });
    perForest.forEach(function (n, f) { perDomain[FOREST_DOMAIN[f]] += n; });
    if (state.domain >= 0) return [{ d: state.domain, n: perDomain[state.domain] }];
    return DOMAIN_ORDER.map(function (d) { return { d: d, n: perDomain[d] }; });
  }

  function renderOptions() {
    function chip(host, id, text, pressed, swatch, onClick) {
      var b = el("button", "chip");
      b.type = "button";
      b.id = id;
      b.setAttribute("aria-pressed", pressed ? "true" : "false");
      if (swatch) b.appendChild(el("span", "swatch sw-" + swatch));
      b.appendChild(document.createTextNode(text));
      b.addEventListener("click", function () { onClick(); renderOptions(); renderExplorer(); });
      host.appendChild(b);
    }
    var domains = document.getElementById("filter-options");
    if (!domains) return;
    domains.textContent = "";
    chip(domains, "opt-domain-all", "All domains", state.domain < 0, null,
      function () { state.domain = -1; state.forest = -1; });
    DOMAIN_ORDER.forEach(function (d) {
      chip(domains, "opt-domain-" + d, DOMAINS[d].label, state.domain === d, DOMAINS[d].key,
        function () { state.domain = d; state.forest = -1; });
    });

    // The forests of the selected domain appear underneath.
    var row = document.getElementById("ctl-forest");
    var forests = document.getElementById("forest-options");
    if (!row || !forests) return;
    forests.textContent = "";
    row.hidden = state.domain < 0;
    if (state.domain < 0) return;
    var key = DOMAINS[state.domain].key;
    chip(forests, "opt-forest-all", "All forests of this domain", state.forest < 0, null,
      function () { state.forest = -1; });
    FOREST_NAMES.forEach(function (name, f) {
      if (FOREST_DOMAIN[f] !== state.domain) return;
      chip(forests, "opt-forest-" + f, name, state.forest === f, key, function () { state.forest = f; });
    });
  }

  function total(segs) { return sum(segs.map(function (g) { return g.n; })); }

  function drawRow(group, label, title, inBenchmark, segs, max) {
    var value = total(segs);
    var row = el("div", "sp-row" + (value === 0 ? " is-zero" : ""));
    var name = el("div", "sp-name");
    name.appendChild(el("span", "mark" + (inBenchmark ? " in" : "")));
    var t = el("span", "t", label);
    t.title = title;
    name.appendChild(t);
    var bar = el("div", "sp-bar");
    bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", label + ": " + value + " trees");
    segs.forEach(function (sg) {
      if (!sg.n) return;
      var seg = el("i", "sw-" + DOMAINS[sg.d].key);
      seg.style.width = (100 * sg.n / max) + "%";
      seg.title = DOMAINS[sg.d].label + ": " + sg.n;
      bar.appendChild(seg);
    });
    row.appendChild(name);
    row.appendChild(bar);
    row.appendChild(el("div", "sp-total", String(value)));
    group.appendChild(row);
  }

  function renderExplorer() {
    var host = document.getElementById("species-cols");
    if (!host) return;
    host.textContent = "";
    var grouped = state.group === "classes";
    var all = SPECIES.map(function (s) {
      var segs = segments(s);
      return { s: s, segs: segs, value: total(segs) };
    });
    var shown = grouped ? all.filter(function (r) { return r.s[4]; }) : all;

    // "Other" class: the species not evaluated on their own, plus the Unknown trees.
    var rare = all.filter(function (r) { return !r.s[4]; });
    var otherPerForest = UNKNOWN.map(function (n, f) {
      return n + sum(rare.map(function (r) { return r.s[3][f]; }));
    });
    var otherSegs = segmentsOf(otherPerForest);

    // Bars are scaled to the largest count currently shown, so a filtered view uses the full width.
    var max = Math.max.apply(null, shown.map(function (r) { return r.value; }).concat(grouped ? [total(otherSegs)] : [])) || 1;

    [["B", "Broadleaf"], ["C", "Conifer"]].forEach(function (g) {
      var rows = shown.filter(function (r) { return r.s[0] === g[0]; });
      if (state.sort === "count") {
        rows = rows.slice().sort(function (a, b) { return b.value - a.value; });
      }
      var present = rows.filter(function (r) { return r.value > 0; });
      var col = el("div", "sp-col");
      var group = el("div", "sp-group");
      var h = el("h3", null, g[1]);
      h.appendChild(el("span", null,
        present.length + " species · " + sum(present.map(function (r) { return r.value; })) + " trees"));
      group.appendChild(h);
      rows.forEach(function (r) {
        drawRow(group, r.s[2], r.s[2] + " (" + r.s[1] + ")", r.s[4], r.segs, max);
      });
      col.appendChild(group);

      if (grouped && g[0] === "C") {
        var rarePresent = rare.filter(function (r) { return r.value > 0; });
        var other = el("div", "sp-group");
        var oh = el("h3", null, "Other class");
        oh.appendChild(el("span", null, rarePresent.length + " rare species + Unknown · " + total(otherSegs) + " trees"));
        other.appendChild(oh);
        drawRow(other, "Other",
          "Other: " + rare.map(function (r) { return r.s[2]; }).join(", ") + ", and Unknown trees",
          0, otherSegs, max);
        col.appendChild(other);
      }
      host.appendChild(col);
    });
  }

  function bindExplorer() {
    document.querySelectorAll("[data-group]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.group = b.getAttribute("data-group");
        document.querySelectorAll("[data-group]").forEach(function (o) {
          o.setAttribute("aria-pressed", o === b ? "true" : "false");
        });
        renderExplorer();
      });
    });
    document.querySelectorAll("[data-sort]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.sort = b.getAttribute("data-sort");
        document.querySelectorAll("[data-sort]").forEach(function (o) {
          o.setAttribute("aria-pressed", o === b ? "true" : "false");
        });
        renderExplorer();
      });
    });
    renderOptions();
  }

  function bindLightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || typeof dlg.showModal !== "function") return;
    var img = dlg.querySelector("img");
    document.querySelectorAll("button.zoom").forEach(function (b) {
      b.addEventListener("click", function () {
        var src = b.querySelector("img");
        img.src = src.getAttribute("src");
        img.alt = src.getAttribute("alt") || "";
        dlg.showModal();
      });
    });
    img.addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  function bindCopy() {
    var btn = document.getElementById("copy-bibtex");
    var pre = document.getElementById("bibtex-text");
    if (!btn || !pre) return;
    btn.addEventListener("click", function () {
      function done() {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        btn.textContent = "Selected";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pre.textContent).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  /* Collection areas (Fig. 2 of the paper): name, latitude, longitude,
     stands, images, trees, species. Same order as the table rows. */
  var FORESTS = [
    ["Lac Sept-Îles", 47.50, -71.22, 2, 13, 80, 3],
    ["Forêt Montmorency", 47.32, -71.14, 6, 37, 388, 5],
    ["Duchesnay", 46.90, -71.64, 3, 24, 179, 11],
    ["Mont Bélair", 46.85, -71.49, 2, 21, 193, 7],
    ["Base de plein air", 46.79, -71.33, 3, 32, 290, 17],
    ["St-Augustin", 46.72, -71.50, 3, 34, 312, 13],
    ["Mastigouche", 46.63, -73.24, 5, 26, 229, 12],
    ["Leclercville", 46.57, -71.98, 5, 37, 342, 17],
    ["Ripon", 45.84, -75.11, 4, 27, 238, 14],
    ["Rigaud", 45.47, -74.31, 4, 54, 466, 16],
    ["Châteauguay", 45.34, -73.77, 3, 14, 101, 12]
  ];
  /* Opening / reset view: fitted to the forest markers, with this margin (in pixels) around them. */
  var HOME_PADDING = [36, 36];
  /* Opacity of the bioclimatic domain colours when the page opens (0 to 1). */
  var DOMAIN_OPACITY = 0.6;
  /* Bioclimatic domain polygons, drawn under the markers and coloured like the species explorer.
     Source: Classification écologique du territoire québécois, Ministère des Ressources naturelles
     et des Forêts (CC-BY 4.0), simplified. Features are matched to a domain by searching their
     text attributes for the keywords below (French or English). */
  var DOMAINS_URL = "static/data/bioclimatic_domains.geojson?v=20261111n";
  var DOMAINS_CREDIT = 'Bioclimatic domains: <a href="https://www.donneesquebec.ca/recherche/dataset/systeme-hierarchique-de-classification-ecologique-du-territoire" target="_blank" rel="noopener">MRNF, Gouvernement du Québec</a> (CC-BY 4.0)';
  var DOMAIN_STYLES = [
    { key: "smbh", name: "Sugar maple–Bitternut hickory", color: "#d9c400", match: ["caryer", "hickory"] },
    { key: "smbw", name: "Sugar maple–Basswood", color: "#f09a1a", match: ["tilleul", "basswood"] },
    { key: "smyb", name: "Sugar maple–Yellow birch", color: "#9a6a12", match: ["rabli\u00e8re \u00e0 bouleau jaune", "erabliere a bouleau jaune", "sugar maple-yellow birch", "sugar maple\u2013yellow birch"] },
    { key: "bfyb", name: "Balsam fir–Yellow birch", color: "#8fce6e", match: ["sapini\u00e8re \u00e0 bouleau jaune", "sapiniere a bouleau jaune", "balsam fir-yellow birch", "balsam fir\u2013yellow birch"] },
    { key: "bfwb", name: "Balsam fir–White birch", color: "#4a8f38", match: ["bouleau blanc", "bouleau \u00e0 papier", "white birch"] }
  ];
  function domainOf(feature) {
    var props = feature.properties || {}, text = "";
    Object.keys(props).forEach(function (k) { if (typeof props[k] === "string") text += " " + props[k].toLowerCase(); });
    for (var d = 0; d < DOMAIN_STYLES.length; d++) {
      for (var m = 0; m < DOMAIN_STYLES[d].match.length; m++) {
        if (text.indexOf(DOMAIN_STYLES[d].match[m]) >= 0) return DOMAIN_STYLES[d];
      }
    }
    return null;
  }
  /* Basemap. By default the map uses OpenStreetMap's standard tiles, which need no account.
     To use CARTO's lighter Positron / Dark Matter styles instead, request a free key at
     https://carto.com/basemaps/apikey/ and paste it between the quotes below. */
  var CARTO_KEY = "";
  var MARKER_RADIUS_DEG = 0.0375; // degrees of latitude: a disc about 0.075 degree (8.3 km) in diameter
  var MARKER_MIN_PX = 4;        // smallest radius on screen, so markers survive zooming far out
  var MARKER_OUTLINE = 0.2;     // outline width as a fraction of the radius
  var OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  var OSM_CREDIT = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
  var CARTO_TILES = {
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key="
  };

  function initMap() {
    var host = document.getElementById("forest-map");
    if (!host || typeof window.L === "undefined") return; // static figure stays
    var L = window.L;
    host.textContent = "";
    var home = L.latLngBounds(FORESTS.map(function (f) { return [f[1], f[2]]; }));
    var map = L.map(host, {
      scrollWheelZoom: false,   // do not hijack page scrolling; enabled once the map is clicked
      minZoom: 2,               // whole world
      maxZoom: 15,
      zoomSnap: 0.1
    });
    map.fitBounds(home, { padding: HOME_PADDING });
    map.on("click", function () { map.scrollWheelZoom.enable(); });
    host.addEventListener("mouseleave", function () { map.scrollWheelZoom.disable(); });

    function theme() { return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    var loaded = 0, failed = 0;
    var tiles;
    if (CARTO_KEY) {
      tiles = L.tileLayer(CARTO_TILES[theme()] + CARTO_KEY, {
        subdomains: "abcd",
        maxZoom: 19,
        attribution: OSM_CREDIT + ' &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'
      }).addTo(map);
      document.addEventListener("silvascenes-theme", function () { tiles.setUrl(CARTO_TILES[theme()] + CARTO_KEY); });
    } else {
      host.classList.add("osm-tiles"); // dark mode dims these tiles with a CSS filter
      tiles = L.tileLayer(OSM_TILES, { maxZoom: 19, attribution: OSM_CREDIT }).addTo(map);
    }

    // If the basemap cannot be reached, say so instead of leaving an unexplained blank map.
    tiles.on("tileload", function () { loaded++; });
    tiles.on("tileerror", function () {
      failed++;
      if (!loaded && failed === 4) {
        var note = document.getElementById("map-note");
        if (note) note.hidden = false;
      }
    });

    // Bioclimatic domains, drawn below the markers when the GeoJSON file is present.
    map.createPane("domains").style.zIndex = 350;
    var domainUi = document.getElementById("map-domain-ui");
    fetch(DOMAINS_URL).then(function (r) {
      if (!r.ok) throw new Error("no domain file");
      return r.json();
    }).then(function (data) {
      var layer = L.geoJSON(data, {
        pane: "domains",
        smoothFactor: 0,          // draw every vertex: no simplification that changes with the zoom
        attribution: DOMAINS_CREDIT,
        filter: function (f) { return domainOf(f) !== null; },
        style: function (f) {
          return { stroke: false, fillColor: domainOf(f).color, fillOpacity: DOMAIN_OPACITY };
        },
        onEachFeature: function (f, l) { l.bindTooltip(domainOf(f).name + " domain", { sticky: true }); }
      }).addTo(map);
      if (domainUi) domainUi.hidden = false;
      var slider = document.getElementById("map-opacity");
      var sliderValue = document.getElementById("map-opacity-value");
      if (slider) {
        slider.value = String(Math.round(DOMAIN_OPACITY * 100));
        var showOpacity = function () {
          // At 0 % the layer is removed, so its hover labels disappear too.
          if (slider.value === "0") { layer.remove(); } else { layer.addTo(map); }
          layer.setStyle({ fillOpacity: slider.value / 100 });
          if (sliderValue) sliderValue.textContent = slider.value + " %";
        };
        slider.addEventListener("input", showOpacity);
        showOpacity();
      }
    }).catch(function () { /* no file: the map shows the basemap and the forests only */ });

    var rows = document.querySelectorAll("tr.forest-row");
    // Same marker as in the paper's figure: a red disc about 0.075 degree across with a black
    // outline. Its size on screen follows the zoom, and the outline keeps the same proportion
    // of the disc at every zoom. Below MARKER_MIN_PX the disc stops shrinking so it stays visible.
    // One size for all markers, taken at the latitude of the centre of the forests. (Sizing each
    // marker at its own latitude makes the northern ones a pixel larger on this projection.)
    var markerLat = home.getCenter().lat;
    function markerRadiusPx() {
      var pxPerDegree = 256 * Math.pow(2, map.getZoom()) / 360 / Math.cos(markerLat * Math.PI / 180);
      return Math.max(MARKER_MIN_PX, MARKER_RADIUS_DEG * pxPerDegree);
    }
    function sizeMarker(m) {
      var r = markerRadiusPx();
      m.setRadius(r);
      m.setStyle({ weight: r * (m.isSelected ? 2 : 1) * MARKER_OUTLINE });
    }
    var markers = FORESTS.map(function (f, i) {
      var m = L.circleMarker([f[1], f[2]], {
        color: "#000000",
        fillColor: "#ff0000",
        fillOpacity: 0.9
      }).addTo(map);
      sizeMarker(m);
      m.bindPopup(
        '<div class="pop-name">' + f[0] + '</div>' +
        '<div class="pop-coord">' + f[1].toFixed(2) + '° N, ' + Math.abs(f[2]).toFixed(2) + '° W</div>' +
        '<dl class="pop-stats">' +
        '<dd>' + f[3] + '</dd><dd>' + f[4] + '</dd><dd>' + f[5] + '</dd><dd>' + f[6] + '</dd>' +
        '<dt>stands</dt><dt>images</dt><dt>trees</dt><dt>species</dt></dl>',
        { closeButton: true, autoPanPadding: [24, 24] }
      );
      m.bindTooltip(f[0], { direction: "top", offset: [0, -6] });
      m.on("popupopen", function () {
        m.isSelected = true; sizeMarker(m);
        rows.forEach(function (r) { r.classList.toggle("is-active", r.getAttribute("data-forest") === String(i)); });
      });
      m.on("popupclose", function () {
        m.isSelected = false; sizeMarker(m);
        if (rows[i]) rows[i].classList.remove("is-active");
      });
      return m;
    });

    map.on("zoomend", function () { markers.forEach(sizeMarker); });

    rows.forEach(function (r) {
      function pick() {
        var m = markers[parseInt(r.getAttribute("data-forest"), 10)];
        if (!m) return;
        map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 8.5), { duration: 0.6 });
        m.openPopup();
      }
      r.addEventListener("click", pick);
      r.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
      });
    });

    var controls = document.getElementById("map-controls");
    if (controls) controls.hidden = false;
    var reset = document.getElementById("map-reset");
    if (reset) reset.addEventListener("click", function () {
      map.closePopup();
      map.flyToBounds(home, { padding: HOME_PADDING, duration: 0.6 });
      // Also put the bioclimatic domain opacity back to its default.
      var slider = document.getElementById("map-opacity");
      if (slider) {
        slider.value = String(Math.round(DOMAIN_OPACITY * 100));
        slider.dispatchEvent(new Event("input"));
      }
    });
  }

  function bindTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var root = document.documentElement;
    function show() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.querySelector("span").textContent = dark ? "Light" : "Dark";
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("silvascenes-theme", next); } catch (e) { /* choice just won't persist */ }
      show();
      document.dispatchEvent(new Event("silvascenes-theme"));
    });
    show();
  }

  /* Text policy: keep every hyphenated compound on one line, site-wide, so no word is ever
     split at its hyphen. Runs once over the static text; code blocks are left untouched. */
  function keepCompoundsTogether(root) {
    var compound = /[0-9A-Za-z\u00C0-\u024F]+(?:-[0-9A-Za-z\u00C0-\u024F]+)+/g;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        if (!p || /^(PRE|SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.classList && p.classList.contains("nb")) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.indexOf("-") > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var text = node.nodeValue, last = 0, m, frag = document.createDocumentFragment();
      compound.lastIndex = 0;
      while ((m = compound.exec(text))) {
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        frag.appendChild(el("span", "nb", m[0]));
        last = m.index + m[0].length;
      }
      if (!last) return;
      frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function start() {
    keepCompoundsTogether(document.body);
    bindTheme();
    initMap();
    renderExplorer();
    bindExplorer();
    bindLightbox();
    bindCopy();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
