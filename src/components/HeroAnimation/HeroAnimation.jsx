import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./HeroAnimation.css";

/* ------------------------------------------------------------------ */
/*  GEOGRAPHY DATA  (lon, lat) - stylised / approximate, not survey-grade */
/* ------------------------------------------------------------------ */
const OUTLINE = [
  [69.5, 26.5], [69.7, 27.2], [70.4, 28.0], [71.2, 28.6], [72.0, 29.0],
  [72.9, 29.5], [73.9, 30.0], [74.6, 30.1], [75.0, 29.7], [75.4, 29.3],
  [75.0, 28.8], [75.6, 28.3], [76.2, 28.1], [76.7, 28.2], [77.0, 27.8],
  [77.8, 27.5], [78.2, 26.9], [78.1, 26.4], [77.4, 26.0], [77.0, 25.4],
  [77.4, 25.0], [77.1, 24.5], [76.4, 24.2], [75.9, 23.7], [74.9, 23.9],
  [74.4, 23.4], [74.2, 23.05], [73.7, 23.3], [73.0, 23.8], [72.6, 24.3],
  [71.8, 24.6], [71.2, 24.8], [70.4, 25.1], [69.8, 25.6],
];

const ARAVALLI = [
  [72.71, 24.59], [73.4, 25.2], [74.0, 25.8], [74.6, 26.35],
  [75.3, 27.0], [76.0, 27.6], [76.5, 28.2],
];

const CHAMBAL = [
  [75.7, 24.8], [75.85, 25.2], [76.4, 25.9], [77.2, 26.4], [78.0, 26.6],
];

const COVERAGE = "Security guard, corporate, event & surveillance services.";

const CITIES = [
  {
    id: "jaipur", name: "Jaipur", number: "[01]", lat: 26.9124, lon: 75.7873,
    facts: [
      ["Known as:", "The Pink City and the capital of Rajasthan."],
      ["Landmarks:", "Amer Fort, Hawa Mahal, City Palace and Jantar Mantar."],
      ["Location:", "26.91° N, 75.79° E in eastern Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "jodhpur", name: "Jodhpur", number: "[02]", lat: 26.2389, lon: 73.0243,
    facts: [
      ["Known as:", "The Blue City and gateway to the Thar Desert."],
      ["Landmarks:", "Mehrangarh Fort, Umaid Bhawan Palace and Jaswant Thada."],
      ["Location:", "26.24° N, 73.02° E in western Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "udaipur", name: "Udaipur", number: "[03]", lat: 24.5854, lon: 73.7125,
    facts: [
      ["Known as:", "The City of Lakes, set among the Aravalli hills."],
      ["Landmarks:", "City Palace, Lake Pichola and Fateh Sagar Lake."],
      ["Location:", "24.59° N, 73.71° E in southern Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "jaisalmer", name: "Jaisalmer", number: "[04]", lat: 26.9157, lon: 70.9083,
    facts: [
      ["Known as:", "The Golden City, built from yellow sandstone."],
      ["Landmarks:", "Jaisalmer Fort, one of the few living forts, and the Sam sand dunes."],
      ["Location:", "26.92° N, 70.91° E deep in the Thar Desert."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "bikaner", name: "Bikaner", number: "[05]", lat: 28.0229, lon: 73.3119,
    facts: [
      ["Known as:", "A desert city famous for sweets, bhujia and camel culture."],
      ["Landmarks:", "Junagarh Fort and Karni Mata Temple."],
      ["Location:", "28.02° N, 73.31° E in northern Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "ajmer", name: "Ajmer", number: "[06]", lat: 26.4499, lon: 74.6399,
    facts: [
      ["Known as:", "A historic city in the Aravalli range, close to Pushkar."],
      ["Landmarks:", "Ajmer Sharif Dargah and Ana Sagar Lake."],
      ["Location:", "26.45° N, 74.64° E in central Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "kota", name: "Kota", number: "[07]", lat: 25.2138, lon: 75.8648,
    facts: [
      ["Known as:", "An industrial and education hub on the Chambal river."],
      ["Landmarks:", "Kota Garh (City Palace) and Chambal Garden."],
      ["Location:", "25.21° N, 75.86° E in south-east Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
  {
    id: "bharatpur", name: "Bharatpur", number: "[08]", lat: 27.2152, lon: 77.4938,
    facts: [
      ["Known as:", "The eastern gateway of Rajasthan, close to Agra."],
      ["Landmarks:", "Keoladeo National Park (UNESCO) and Lohagarh Fort."],
      ["Location:", "27.22° N, 77.49° E in eastern Rajasthan."],
      ["RKS Coverage:", COVERAGE],
    ],
  },
];

const OVERVIEW = { lon: 74.2, lat: 26.6, zoom: 1, fx: 0.5, fy: 0.5 };
const BG_ZOOM = 2.4;
const PORTAL_ZOOM = 3.8;

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v) => Math.max(0, Math.min(1, v));
const lerpCam = (a, b, t) => ({
  lon: lerp(a.lon, b.lon, t), lat: lerp(a.lat, b.lat, t),
  zoom: lerp(a.zoom, b.zoom, t), fx: lerp(a.fx, b.fx, t), fy: lerp(a.fy, b.fy, t),
});
const KX = Math.cos((26.5 * Math.PI) / 180);

function project(cam, w, h, lon, lat) {
  const base = Math.min((h * 0.85) / 7.6, (w * 0.9) / (9.8 * KX));
  const ppd = base * cam.zoom;
  return [w * cam.fx + (lon - cam.lon) * KX * ppd, h * cam.fy - (lat - cam.lat) * ppd];
}

function smoothClosed(ctx, pts) {
  const n = pts.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const s = mid(pts[n - 1], pts[0]);
  ctx.beginPath();
  ctx.moveTo(s[0], s[1]);
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const m = mid(p, pts[(i + 1) % n]);
    ctx.quadraticCurveTo(p[0], p[1], m[0], m[1]);
  }
  ctx.closePath();
}

function makePattern(ctx) {
  const c = document.createElement("canvas");
  c.width = c.height = 16;
  const g = c.getContext("2d");
  g.fillStyle = "rgba(255,214,150,.26)";
  g.beginPath();
  g.arc(8, 8, 1.1, 0, Math.PI * 2);
  g.fill();
  return ctx.createPattern(c, "repeat");
}

function drawShade(ctx, w, h, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const g = ctx.createLinearGradient(0, h * 0.52, 0, h);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,.88)");
  ctx.fillStyle = g;
  ctx.fillRect(0, h * 0.52, w, h * 0.48);
  ctx.restore();
}

/* ------------------------------------------------------------------ */
/*  THE MAP SCENE  (used for the background AND inside the portal)     */
/* ------------------------------------------------------------------ */
function drawScene(ctx, w, h, cam, t, activeId, pat, prog) {
  const P = (lo, la) => project(cam, w, h, lo, la);
  const zs = Math.max(0.8, Math.min(cam.zoom, 2));
  const fa = clamp((prog - 0.8) / 0.2);

  // backdrop
  const bg = ctx.createRadialGradient(w * 0.6, h * 0.4, 0, w * 0.6, h * 0.4, Math.max(w, h) * 0.8);
  bg.addColorStop(0, "#3d2411");
  bg.addColorStop(1, "#120a05");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // lat / lon graticule
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,220,160,.07)";
  ctx.beginPath();
  for (let lo = 60; lo <= 90; lo++) { const x = P(lo, cam.lat)[0]; ctx.moveTo(x, 0); ctx.lineTo(x, h); }
  for (let la = 15; la <= 40; la++) { const y = P(cam.lon, la)[1]; ctx.moveTo(0, y); ctx.lineTo(w, y); }
  ctx.stroke();

  const pts = OUTLINE.map(([lo, la]) => P(lo, la));

  // state fill + geography inside the border
  if (fa > 0) {
    ctx.save();
    ctx.globalAlpha = fa;
    smoothClosed(ctx, pts);
    ctx.fillStyle = "rgba(232,176,92,.13)";
    ctx.fill();
    ctx.save();
    smoothClosed(ctx, pts);
    ctx.clip();
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, w, h);

    // Chambal river
    const ch = CHAMBAL.map(([a, b]) => P(a, b));
    ctx.strokeStyle = "rgba(120,190,230,.75)";
    ctx.lineWidth = 2.2 * zs;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ch.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();

    // Aravalli range (ridge line + little mountains)
    const ar = ARAVALLI.map(([a, b]) => P(a, b));
    ctx.strokeStyle = "rgba(170,105,50,.6)";
    ctx.lineWidth = 2 * zs;
    ctx.beginPath();
    ar.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.fillStyle = "rgba(190,120,60,.75)";
    const sz = 4 + 2 * cam.zoom;
    let k = 0;
    for (let i = 0; i < ar.length - 1; i++) {
      const [x0, y0] = ar[i], [x1, y1] = ar[i + 1];
      const len = Math.hypot(x1 - x0, y1 - y0);
      const n = Math.max(1, Math.floor(len / (sz * 2.4)));
      const nx = -(y1 - y0) / len, ny = (x1 - x0) / len;
      for (let j = 0; j < n; j++, k++) {
        const f = (j + 0.5) / n;
        const off = (k % 2 ? 1 : -1) * sz * 0.9;
        const x = lerp(x0, x1, f) + nx * off, y = lerp(y0, y1, f) + ny * off;
        ctx.beginPath();
        ctx.moveTo(x, y - sz);
        ctx.lineTo(x + sz, y + sz * 0.7);
        ctx.lineTo(x - sz, y + sz * 0.7);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.restore();

    // labels
    ctx.textAlign = "center";
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${Math.round(6 * zs)}px`;
    ctx.font = `600 ${Math.round(12 * zs)}px "SF Pro",Arial,sans-serif`;
    ctx.fillStyle = "rgba(255,214,150,.4)";
    const th = P(71.3, 27.55);
    ctx.fillText("THAR DESERT", th[0], th[1]);
    const mid = [(ar[0][0] + ar[ar.length - 1][0]) / 2, (ar[0][1] + ar[ar.length - 1][1]) / 2];
    const ang = Math.atan2(ar[ar.length - 1][1] - ar[0][1], ar[ar.length - 1][0] - ar[0][0]);
    ctx.save();
    ctx.translate(mid[0] - Math.sin(ang) * 38 * zs, mid[1] + Math.cos(ang) * 38 * zs);
    ctx.rotate(ang);
    ctx.fillText("ARAVALLI RANGE", 0, 0);
    ctx.restore();
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    ctx.restore();
  }

  // glowing border (traces itself during the preloader)
  ctx.save();
  smoothClosed(ctx, pts);
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#f3c87a";
  ctx.lineWidth = 2.2;
  ctx.shadowColor = "rgba(243,200,122,.8)";
  ctx.shadowBlur = 16;
  if (prog < 1) {
    let len = 0;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      len += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    ctx.setLineDash([len * prog, len * 2]);
  }
  ctx.stroke();
  ctx.restore();

  // cities
  CITIES.forEach((c, i) => {
    const a = prog >= 1 ? 1 : clamp((prog - (0.55 + i * 0.04)) / 0.1);
    if (a <= 0) return;
    const [x, y] = P(c.lon, c.lat);
    const act = c.id === activeId;
    ctx.save();
    ctx.globalAlpha = a;
    if (act) {
      const p = (t % 1800) / 1800;
      ctx.strokeStyle = `rgba(255,216,144,${(1 - p) * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 10 + p * 34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c9892f";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(255,214,150,.95)";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.textAlign = "left";
    ctx.font = `${act ? 700 : 500} ${act ? 17 : 13}px "SF Pro",Arial,sans-serif`;
    ctx.fillStyle = act ? "#fff" : "rgba(255,235,200,.8)";
    ctx.fillText(c.name, x + 13, y + 5);
    ctx.restore();
  });
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export default function HeroAnimation({ logoSrc = "/logo.png" }) {
  const [idx, setIdx] = useState(0);

  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const pcRef = useRef(null);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const logoRef = useRef(null);
  const countRef = useRef(null);
  const valueRef = useRef(null);
  const cursorRef = useRef(null);
  const travelRef = useRef(null);

  const city = CITIES[idx];
  const next = CITIES[idx + 1] || null;

  useEffect(() => {
    const root = rootRef.current;
    const bgC = bgRef.current;
    const pC = pcRef.current;
    const btn = btnRef.current;
    const bctx = bgC.getContext("2d");
    const pctx = pC.getContext("2d");
    const patB = makePattern(bctx);
    const patP = makePattern(pctx);

    const S = {
      w: 0, h: 0, idx: 0, busy: false, ready: false, alive: true,
      e: 0, maskScale: 0, rotX: 0, rotY: 0, tX: 0, tY: 0,
      prog: 0, intro: 0, last: performance.now(),
    };
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const cur = { x: -100, y: -100, tx: -100, ty: -100 };

    /* ---- sizing ---- */
    const resize = () => {
      const r = root.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      S.w = r.width; S.h = r.height;
      [bgC, pC].forEach((c) => {
        c.width = r.width * d; c.height = r.height * d;
        c.style.width = r.width + "px"; c.style.height = r.height + "px";
      });
      bctx.setTransform(d, 0, 0, d, 0, 0);
      pctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();

    /* ---- cameras ---- */
    const focus = () => (S.w < 700 ? { fx: 0.5, fy: 0.3 } : { fx: 0.7, fy: 0.42 });
    const cityCam = (c) => ({ lon: c.lon, lat: c.lat, zoom: BG_ZOOM, ...focus() });

    /* ---- tween + class helpers ---- */
    const tween = (set, dur) =>
      new Promise((res) => {
        const s = performance.now();
        const f = (n) => {
          if (!S.alive) return res();
          const t = Math.min(1, (n - s) / dur);
          set(ease(t));
          t < 1 ? requestAnimationFrame(f) : res();
        };
        requestAnimationFrame(f);
      });
    const retrigger = (el, cls) => {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    };
    const revealMask = () => {
      retrigger(root, "mask-revealing");
      S.maskScale = 0;
      return tween((v) => (S.maskScale = v), 1050);
    };
    const revealContent = () => retrigger(root, "content-revealing");

    /* ---- window geometry (rounded rect -> fake 3D projection) ---- */
    const corners = (w, h, r) => {
      r = Math.min(r, w / 2, h / 2);
      const out = [];
      [
        [w / 2 - r, -h / 2 + r, -Math.PI / 2, 0],
        [w / 2 - r, h / 2 - r, 0, Math.PI / 2],
        [-w / 2 + r, h / 2 - r, Math.PI / 2, Math.PI],
        [-w / 2 + r, -h / 2 + r, Math.PI, Math.PI * 1.5],
      ].forEach(([cx, cy, a0, a1]) => {
        for (let k = 0; k <= 10; k++) {
          const a = a0 + ((a1 - a0) * k) / 10;
          out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }
      });
      return out;
    };
    const proj = (x, y, rx, ry, cx, cy) => {
      const ax = (rx * Math.PI) / 180, ay = (ry * Math.PI) / 180;
      const xx = x * Math.cos(ay), yy = y * Math.cos(ax);
      const z = x * Math.sin(ay) - y * Math.sin(ax);
      const p = 850 / (850 + z);
      return [cx + xx * p, cy + yy * p];
    };

    /* ---- main frame loop ---- */
    const frame = (now) => {
      if (!S.alive) return;
      const dt = Math.min(now - S.last, 40);
      S.last = now;
      const { w, h } = S;
      const k = Math.min(1, dt * 0.009);
      S.rotX += (S.tX - S.rotX) * k;
      S.rotY += (S.tY - S.rotY) * k;

      const c = CITIES[S.idx];
      const nx = CITIES[S.idx + 1] || null;
      const dLon = Math.sin(now / 5000) * 0.03;
      const dLat = Math.cos(now / 6500) * 0.02;

      // background map
      const base = S.intro < 1 ? lerpCam(OVERVIEW, cityCam(c), ease(S.intro)) : cityCam(c);
      const bcam = { ...base, lon: base.lon + dLon, lat: base.lat + dLat };
      drawScene(bctx, w, h, bcam, now, S.intro > 0 ? c.id : null, patB, S.prog);

      // portal window
      pctx.clearRect(0, 0, w, h);
      const rr = root.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const rect = { left: br.left - rr.left, top: br.top - rr.top, width: br.width, height: br.height };
      const rcx = rect.left + rect.width / 2, rcy = rect.top + rect.height / 2;
      const e = S.e;
      const cx = rcx + (w / 2 - rcx) * e;
      const cy = rcy + (h / 2 - rcy) * e;
      const scale = e ? 1 : S.maskScale;
      const ww = (rect.width + (w - rect.width) * e) * scale;
      const hh = (rect.height + (h - rect.height) * e) * scale;
      const r = 90 * (1 - e) * scale;

      if (ww > 1 && hh > 1) {
        const pts = corners(ww, hh, r).map(([x, y]) =>
          proj(x, y, S.rotX * (1 - e), S.rotY * (1 - e), cx, cy)
        );
        pctx.save();
        pctx.beginPath();
        pts.forEach(([x, y], i) => (i ? pctx.lineTo(x, y) : pctx.moveTo(x, y)));
        pctx.closePath();
        pctx.clip();
        pctx.fillStyle = "#030303";
        pctx.fillRect(0, 0, w, h);

        let pcam;
        if (nx) {
          const f = focus();
          pcam = {
            lon: nx.lon + dLon, lat: nx.lat + dLat,
            zoom: lerp(PORTAL_ZOOM, BG_ZOOM, e),
            fx: lerp(rcx / w, f.fx, e), fy: lerp(rcy / h, f.fy, e),
          };
        } else {
          pcam = { lon: OVERVIEW.lon, lat: OVERVIEW.lat, zoom: 0.5, fx: rcx / w, fy: rcy / h };
        }
        drawScene(pctx, w, h, pcam, now, nx ? nx.id : null, patP, 1);
        drawShade(pctx, w, h, e);
        pctx.restore();
      }

      // cursor
      cur.x += (cur.tx - cur.x) * 0.2;
      cur.y += (cur.ty - cur.y) * 0.2;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${cur.x}px,${cur.y}px,0)`;

      requestAnimationFrame(frame);
    };

    /* ---- travel ---- */
    const travel = async () => {
      if (S.busy || !S.ready || !CITIES[S.idx + 1]) return;
      S.busy = true;
      S.tX = S.tY = 0;
      try {
        root.classList.remove("content-revealing", "mask-revealing");
        root.classList.add("is-transitioning");
        await tween((v) => (S.e = v), 1400);

        // commit - new city's full-screen view is identical to what the window shows
        S.idx += 1;
        flushSync(() => setIdx(S.idx));
        S.e = 0;
        S.maskScale = 0;
        root.classList.remove("is-transitioning");
        if (listRef.current) retrigger(listRef.current, "is-switching");

        const m = revealMask();
        later(revealContent, 100);
        await m;
      } catch (err) {
        S.e = 0;
        S.maskScale = 1;
        root.classList.remove("is-transitioning");
      } finally {
        S.busy = false;
      }
    };
    travelRef.current = travel;

    /* ---- preloader ---- */
    const startExperience = () => {
      later(() => root.classList.add("intro-ready"), 1100);
      later(() => { S.ready = true; revealMask(); }, 1200);
      later(revealContent, 2000);
    };

    const finish = () => {
      S.prog = 1;
      if (valueRef.current) valueRef.current.textContent = "100";
      countRef.current?.classList.add("is-leaving");
      logoRef.current?.classList.add("is-leaving");
      root.classList.add("preload-complete");
      try { sessionStorage.setItem("rks-hero-seen", "1"); } catch (e) {}
      tween((v) => (S.intro = v), 1800);
      startExperience();
      later(() => { if (countRef.current) countRef.current.style.display = "none"; }, 750);
    };

    let seen = false;
    try { seen = sessionStorage.getItem("rks-hero-seen") === "1"; } catch (e) {}

    if (seen) {
      S.prog = 1; S.intro = 1;
      countRef.current.style.display = "none";
      logoRef.current.style.display = "none";
      root.classList.add("preload-complete", "intro-ready");
      later(() => { S.ready = true; revealMask(); }, 200);
      later(revealContent, 700);
    } else {
      const DUR = 3000;
      const t0 = performance.now();
      const tick = (n) => {
        if (!S.alive) return;
        const p = Math.min(1, (n - t0) / DUR);
        S.prog = p;
        if (valueRef.current) valueRef.current.textContent = String(Math.round(p * 100));
        p < 1 ? requestAnimationFrame(tick) : finish();
      };
      requestAnimationFrame(tick);
    }

    /* ---- pointer ---- */
    const onMove = (ev) => {
      cur.tx = ev.clientX; cur.ty = ev.clientY;
      cursorRef.current?.classList.add("is-visible");
      if (S.busy) return;
      const r = root.getBoundingClientRect();
      S.tY = ((ev.clientX - r.left) / r.width - 0.5) * 37.4;
      S.tX = ((ev.clientY - r.top) / r.height - 0.5) * -33;
    };
    const onLeave = () => {
      S.tX = S.tY = 0;
      cursorRef.current?.classList.remove("is-visible");
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    requestAnimationFrame(frame);

    return () => {
      S.alive = false;
      ro.disconnect();
      timers.forEach(clearTimeout);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="rks-hero" ref={rootRef}>
      <canvas ref={bgRef} className="rks-bg" aria-hidden="true" />
      <div className="rks-shade" aria-hidden="true" />

      <img ref={logoRef} className="rks-logo" src={logoSrc} alt="Royal Kings Security" />
      <div ref={countRef} className="rks-count" aria-live="polite">
        <span ref={valueRef}>0</span>
        <span className="percent">%</span>
      </div>

      <aside ref={listRef} className="rks-list rks-chrome" aria-label="Cities">
        {CITIES.map((c, i) => (
          <span key={c.id} className={"rks-item" + (i === idx ? " active" : "")}>
            {c.name}
          </span>
        ))}
      </aside>

      <canvas ref={pcRef} className="rks-portal-canvas" aria-hidden="true" />

      <section className="rks-portal-wrap rks-chrome" aria-label="Next destination">
        <div className="rks-portal-heading">
          <span>Next:</span>
          <span>
            <span>{next ? next.number : "[00]"}</span>{" "}
            <strong>{next ? next.name : "Rajasthan"}</strong>
          </span>
        </div>
        <button
          ref={btnRef}
          className="rks-portal"
          type="button"
          aria-label={next ? `Travel to ${next.name}` : "End of journey"}
          onClick={() => travelRef.current && travelRef.current()}
          onPointerEnter={() => next && cursorRef.current?.classList.add("is-enter")}
          onPointerLeave={() => cursorRef.current?.classList.remove("is-enter")}
        />
      </section>

      <section className="rks-content rks-chrome" aria-live="polite">
        <h1>{city.name.toUpperCase()}</h1>
        <dl>
          {city.facts.map(([k, v]) => (
            <div className="fact" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="rks-cursor" ref={cursorRef} aria-hidden="true">
        <span className="cursor-orbit" />
        <span className="cursor-dot" />
        <span className="cursor-label">Enter</span>
      </div>
    </div>
  );
}