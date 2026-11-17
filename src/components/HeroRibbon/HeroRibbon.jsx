
import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as THREE from "three";
import "./HeroRibbon.css";

/* MEDIA FILES */

const CARDS = [
  {
    title: "Security Team",
    type: "image",
    src: "/images/security-team.jpg",
  },
  {
    title: "Corporate Security",
    type: "image",
    src: "/images/corporate-security.jpg",
  },
  {
    title: "Event Security",
    type: "image",
    src: "/images/event-security.jpg",
  },
  {
    title: "Entrance Security",
    type: "image",
    src: "/images/entrance-security.jpg",
  },
  {
    title: "CCTV Monitoring",
    type: "image",
    src: "/images/cctv-monitoring.jpg",
  },
  {
    title: "Hotel Security",
    type: "image",
    src: "/images/hotel-security.jpg",
  },
  {
    title: "Security Patrol",
    type: "image",
    src: "/images/security-patrol.jpg",
  },
  {
    title: "Professional Guards",
    type: "image",
    src: "/images/professional-guards.jpg",
  },
];

const clamp = (x, a = 0, b = 1) =>
  Math.min(b, Math.max(a, x));

const mix = (a, b, t) => a + (b - a) * t;

const ease = (t) => t * t * (3 - 2 * t);

const out = (t) => 1 - (1 - t) ** 3;

const span = (p, a, b) => clamp((p - a) / (b - a));

export default function HeroRibbon({
  line1 = "Protecting ",
  line2 = "What Matters.",
  caption = "Safety Trust Reliability and Peace of Mind",
  footerText = "Security guard, corporate, event and surveillance services across Rajasthan.",
  footerLink = { label: "VIEW SERVICES", href: "/services" },
  projectsHref = "/projects",
}) {
  const navigate = useNavigate();

  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  const l1 = useRef(null);
  const l2 = useRef(null);
  const capRef = useRef(null);
  const glowRef = useRef(null);
  const crossRef = useRef(null);
  const ruleRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!track || !stage || !canvas) return;

    let renderer;
    let disposed = false;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
    } catch (err) {
      console.warn("WebGL unavailable", err);
      return;
    }

    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const FOV = 35;

    const camera = new THREE.PerspectiveCamera(
      FOV,
      1,
      0.1,
      100
    );

    /* RIBBON RAIL */

    let path;
    let PATH_L = 1;

    const SAMPLES = 1200;

    const pathP = [];
    const pathT = [];

    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts = [];

      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);

        const cs = Math.cos(ph);
        const u = 2 * t - 1;

        const depth =
          cs > 0
            ? 7.6 + 16.4 * cs ** 0.9
            : 7.6 + 2.2 * cs;

        const edge =
          0.84 +
          0.5 * span(0.14 - t, 0, 0.14) +
          0.8 * span(t, 0.84, 1);

        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 *
              Math.sign(u) *
              Math.abs(u) ** 1.4 *
              depth *
              0.63,
            -depth
          )
        );
      }

      path = new THREE.CatmullRomCurve3(
        pts,
        false,
        "centripetal"
      );

      path.arcLengthDivisions = 1500;

      PATH_L = path.getLength();

      pathP.length = 0;
      pathT.length = 0;

      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;

        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    }

    const at = (s, op, ot) => {
      const f = clamp(s / PATH_L) * SAMPLES;

      const i = Math.min(
        SAMPLES - 1,
        Math.floor(f)
      );

      const k = f - i;

      op.lerpVectors(
        pathP[i],
        pathP[i + 1],
        k
      );

      ot.lerpVectors(
        pathT[i],
        pathT[i + 1],
        k
      ).normalize();
    };

    /* MEDIA ASSETS */

    const assets = new Map();
    const disposables = [];

    function done(a, w, h) {
      if (disposed) return;

      a.w = w;
      a.h = h;
      a.ready = true;

      a.cbs.forEach((f) => f());
      a.cbs = [];
    }

    function getAsset(src, type) {
      if (assets.has(src)) {
        return assets.get(src);
      }

      const a = {
        src,
        type,
        ready: false,
        w: 1,
        h: 1,
        cbs: [],
        tex: null,
        video: null,
        img: null,
      };

      if (type === "video") {
        const v = document.createElement("video");

        Object.assign(v, {
          crossOrigin: "anonymous",
          muted: true,
          loop: true,
          playsInline: true,
          preload: "auto",
          src,
        });

        v.setAttribute("playsinline", "");

        a.video = v;
        a.tex = new THREE.VideoTexture(v);

        const onLoadedData = () => {
          if (disposed) return;

          done(
            a,
            v.videoWidth,
            v.videoHeight
          );
        };

        v.addEventListener(
          "loadeddata",
          onLoadedData
        );

        a.cleanupVideo = () => {
          v.removeEventListener(
            "loadeddata",
            onLoadedData
          );
        };
      } else {
        a.tex = new THREE.Texture();

        const img = new Image();

        a.img = img;

        img.crossOrigin = "anonymous";

        img.onload = () => {
          if (disposed) return;

          a.tex.image = img;
          a.tex.needsUpdate = true;

          done(
            a,
            img.naturalWidth,
            img.naturalHeight
          );
        };

        img.onerror = () => {
          if (disposed) return;

          console.warn("Image failed to load:", src);
        };

        img.src = src;
      }

      a.tex.colorSpace = THREE.SRGBColorSpace;
      a.tex.minFilter = THREE.LinearFilter;
      a.tex.magFilter = THREE.LinearFilter;
      a.tex.generateMipmaps = false;

      assets.set(src, a);

      return a;
    }

    /* CARD SHADER */

    const CARD_W = 2.1;
    const CARD_H = 1.32;

    const GAP = 0.03;
    const STEP = CARD_W + GAP;

    const NX = 28;
    const NY = 3;

    const vs = `
      varying vec2 vUv;

      void main() {
        vUv = uv;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(position, 1.);
      }
    `;

    const fs = `
      uniform sampler2D map;
      uniform vec2 cover;
      uniform float aspect, ready, radius;

      varying vec2 vUv;

      void main() {
        vec2 q =
          (abs(vUv - .5) - .5) *
          vec2(aspect, 1.) +
          radius;

        float d =
          length(max(q, 0.)) +
          min(max(q.x, q.y), 0.) -
          radius;

        float px = fwidth(d);

        float a =
          1. - smoothstep(-px, px, d);

        if (a < .01) discard;

        vec2 uv = vUv;

        if (!gl_FrontFacing) {
          uv.x = 1. - uv.x;
        }

        vec3 c = mix(
          vec3(.1, .13, .2),
          texture2D(
            map,
            (uv - .5) * cover + .5
          ).rgb,
          ready
        );

        float edge =
          smoothstep(-.012 - px, -.012, d);

        gl_FragColor = vec4(
          mix(c, vec3(1.), edge * .1),
          a
        );
      }
    `;

    const cards = CARDS.map((def, i) => {
      const asset = getAsset(
        def.src,
        def.type
      );

      const geo = new THREE.PlaneGeometry(
        1,
        1,
        NX,
        NY
      );

      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,

        uniforms: {
          map: { value: asset.tex },
          cover: {
            value: new THREE.Vector2(1, 1),
          },
          aspect: {
            value: CARD_W / CARD_H,
          },
          ready: { value: 0 },
          radius: { value: 0.018 },
        },
      });

      const mesh = new THREE.Mesh(
        geo,
        mat
      );

      // Hide cards until their first valid animation position.
      mesh.visible = false;
      mesh.frustumCulled = false;

      scene.add(mesh);

      const apply = () => {
        if (disposed) return;

        const va = asset.w / asset.h;
        const ca = CARD_W / CARD_H;

        mat.uniforms.cover.value.set(
          va > ca ? ca / va : 1,
          va > ca ? 1 : va / ca
        );

        mat.uniforms.ready.value = 1;
      };

      if (asset.ready) {
        apply();
      } else {
        asset.cbs.push(apply);
      }

      disposables.push(geo, mat);

      return {
        i,
        title: def.title,
        asset,
        geo,
        mat,
        mesh,
        rect: null,
      };
    });

    /* LAYOUT */

    const GZ = 8;

    let W = 1;
    let H = 1;
    let asp = 1;

    let cols = 3;
    let rows = 2;

    let tanH = 0.3153;

    function resize() {
      if (disposed) return;

      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;

      asp = W / H;

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );

      renderer.setSize(W, H, false);

      camera.aspect = asp;

      camera.fov =
        asp < 16 / 9
          ? (Math.atan(0.561 / asp) * 360) /
            Math.PI
          : FOV;

      camera.updateProjectionMatrix();

      tanH = Math.tan(
        (camera.fov * Math.PI) / 360
      );

      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    }

    window.addEventListener(
      "resize",
      resize
    );

    resize();
    buildPath();

    function grid(i) {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;

      const gw =
        vw * (cols === 3 ? 0.74 : 0.88);

      const gap = gw * 0.017;

      const cw =
        (gw - gap * (cols - 1)) / cols;

      const ch = cw / (CARD_W / CARD_H);

      const gh =
        ch * rows +
        gap * 1.6 * (rows - 1);

      const c = i % cols;
      const r = Math.floor(i / cols);

      return {
        x:
          -gw / 2 +
          cw / 2 +
          c * (cw + gap),

        y:
          gh / 2 -
          ch / 2 -
          r * (ch + gap * 1.6),

        w: cw,
        h: ch,
        vw,
        vh,
        c,
        r,
      };
    }

    /* SCROLL */

    let target = 0;
    let p = 0;

    const readScroll = () => {
      if (disposed) return;

      const r = track.getBoundingClientRect();

      const total =
        r.height - window.innerHeight;

      target =
        total > 0
          ? clamp(-r.top / total)
          : 0;
    };

    window.addEventListener(
      "scroll",
      readScroll,
      { passive: true }
    );

    readScroll();

    p = target;

    /* CARD POSITIONS */

    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();

    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c, head) {
      const pos = c.geo.attributes.position;

      const centre = head - c.i * STEP;

      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k =
            iy * (NX + 1) + ix;

          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;

          at(
            centre + lu * CARD_W,
            op,
            ot
          );

          up.copy(Y)
            .addScaledVector(
              ot,
              -Y.dot(ot)
            )
            .normalize();

          vp.copy(op)
            .addScaledVector(
              up,
              lv * CARD_H
            );

          pos.setXYZ(
            k,
            vp.x,
            vp.y,
            vp.z
          );
        }
      }

      pos.needsUpdate = true;
    }

    function poseGrid(c, q) {
      const g = grid(c.i);

      const pos = c.geo.attributes.position;

      const dx =
        (g.c - (cols - 1) / 2) * 1.2;

      const dy =
        g.r < rows / 2 ? 1 : -1;

      const ox =
        dx * g.vw * 0.62 * (1 - q);

      const oy =
        dy *
        g.vh *
        (g.c === 1 ? 0.95 : 0.34) *
        (1 - q);

      const tilt =
        (1 - q) *
        0.22 *
        (g.c - 1 || 0.5) *
        dy;

      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);

      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k =
            iy * (NX + 1) + ix;

          const x =
            (ix / NX - 0.5) * g.w;

          const y =
            (0.5 - iy / NY) * g.h;

          pos.setXYZ(
            k,

            g.x +
              ox +
              x * cs -
              y * sn,

            g.y +
              oy +
              x * sn +
              y * cs,

            -GZ -
              (1 - q) *
                0.6 *
                Math.sin(
                  (ix / NX) * Math.PI
                )
          );
        }
      }

      pos.needsUpdate = true;

      c.rect = g;
    }

    /* RENDER */

    const RIB_A = 0.14;
    const RIB_B = 0.63;

    function render() {
      if (disposed) return;

      const pp = p;

      const rise =
        1 - out(span(pp, 0, 0.12));

      const run =
        mix(-15, 76, span(pp, 0, 0.58));

      l1.current.style.transform =
        `translate3d(${run}vw, ${rise * 12}vh, 0)`;

      l2.current.style.transform =
        `translate3d(${-run}vw, ${rise * 12}vh, 0)`;

      capRef.current.style.opacity =
        1 - span(pp, 0.52, 0.57);

      capRef.current.style.transform =
        `translate(-50%, calc(-50% + ${rise * 12}vh))`;

      const intro =
        1 - span(pp, 0, 0.05);

      glowRef.current.style.opacity = intro;
      crossRef.current.style.opacity = intro;

      ruleRef.current.style.transform =
        `scaleX(${ease(span(pp, 0.72, 0.86))})`;

      const pr =
        span(pp, RIB_A, RIB_B);

      const head =
        mix(
          0,
          PATH_L + cards.length * STEP,
          pr
        );

      for (const c of cards) {
        const s = head - c.i * STEP;

        const end = PATH_L - CARD_W;

        if (s < end) {
          c.mesh.visible = s > CARD_W;

          c.rect = null;

          if (c.mesh.visible) {
            poseRibbon(c, head);
          }
        } else if (c.i < cols * rows) {
          const st = mix(
            RIB_A,
            RIB_B,
            (end + c.i * STEP) /
              (PATH_L + cards.length * STEP)
          );

          const q = out(
            span(pp, st, st + 0.13)
          );

          c.mesh.visible = q > 0.001;

          if (c.mesh.visible) {
            poseGrid(c, q);
          }
        } else {
          c.mesh.visible = false;
          c.rect = null;
        }
      }

      renderer.render(scene, camera);
    }

    /* HOVER AND CLICK */

    const nameEl = nameRef.current;

    const hitTest = (e) => {
      if (p <= 0.86) return null;

      const r = stage.getBoundingClientRect();

      const nx =
        (e.clientX - r.left) / r.width - 0.5;

      const ny =
        0.5 -
        (e.clientY - r.top) / r.height;

      let hit = null;

      for (const c of cards) {
        const g = c.rect;

        if (!g || !c.mesh.visible) continue;

        const x = nx * g.vw;
        const y = ny * g.vh;

        if (
          Math.abs(x - g.x) < g.w / 2 &&
          Math.abs(y - g.y) < g.h / 2
        ) {
          hit = c;
        }
      }

      return hit;
    };

    const onMove = (e) => {
      if (disposed) return;

      const hit = hitTest(e);

      const r = stage.getBoundingClientRect();

      nameEl.style.opacity = hit ? 1 : 0;

      stage.style.cursor =
        hit ? "pointer" : "";

      if (hit) {
        nameEl.textContent = hit.title;

        nameEl.style.transform =
          `translate(${e.clientX - r.left + 14}px, ${e.clientY - r.top + 16}px)`;
      }
    };

    const onClick = (e) => {
      if (disposed) return;

      if (hitTest(e)) {
        navigate(projectsHref);
      }
    };

    stage.addEventListener(
      "pointermove",
      onMove
    );

    stage.addEventListener(
      "click",
      onClick
    );

    /* ANIMATION LOOP */

    let raf = 0;
    let alive = true;

    const clock = new THREE.Clock();

    function loop() {
      if (
        !alive ||
        disposed ||
        document.hidden
      ) {
        raf = 0;
        return;
      }

      const delta = Math.min(
        clock.getDelta(),
        0.05
      );

      p +=
        (target - p) *
        (1 - Math.exp(-6 * delta));

      if (Math.abs(target - p) < 0.00005) {
        p = target;
      }

      const needed = new Set();

      for (const c of cards) {
        if (
          c.mesh.visible &&
          c.asset.video
        ) {
          needed.add(c.asset);
        }
      }

      assets.forEach((a) => {
        if (!a.video) return;

        if (
          needed.has(a) &&
          a.video.paused
        ) {
          a.video.play().catch(() => {});
        } else if (
          !needed.has(a) &&
          !a.video.paused
        ) {
          a.video.pause();
        }
      });

      render();

      raf = requestAnimationFrame(loop);
    }

    function handleVisibility() {
      if (disposed) return;

      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      } else if (!raf) {
        clock.getDelta();
        loop();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    loop();

    /* CLEANUP */

    return () => {
      disposed = true;
      alive = false;

      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "scroll",
        readScroll
      );

      stage.removeEventListener(
        "pointermove",
        onMove
      );

      stage.removeEventListener(
        "click",
        onClick
      );

      assets.forEach((a) => {
        a.cbs = [];

        if (a.img) {
          a.img.onload = null;
          a.img.onerror = null;
        }

        if (a.video) {
          a.cleanupVideo?.();

          a.video.pause();
          a.video.removeAttribute("src");
          a.video.load();
        }

        a.tex.dispose();
      });

      disposables.forEach((d) => {
        d.dispose();
      });

      scene.clear();

      renderer.dispose();
    };
  }, [projectsHref, navigate]);

  return (
    <div className="rk-track" ref={trackRef}>
      <div className="rk-stage" ref={stageRef}>

        {/* FULL SCREEN BACKGROUND VIDEO */}

        <video
          className="rk-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero.jpg"
        >
          <source
            src="/videos/hero-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* DARK VIDEO OVERLAY */}

        <div className="rk-video-overlay" />

        <h1 aria-label={`${line1} ${line2}`}>
          <div
            className="rk-hl rk-l1"
            ref={l1}
            aria-hidden="true"
          >
            <span>{line1}</span>
          </div>

          <div
            className="rk-hl rk-l2"
            ref={l2}
            aria-hidden="true"
          >
            <span>{line2}</span>
          </div>
        </h1>

        <div
          className="rk-cap"
          ref={capRef}
        >
          {caption}
        </div>

        <div
          className="rk-glow"
          ref={glowRef}
        />

        <div
          className="rk-cross"
          ref={crossRef}
        >
          <i>+</i>
        </div>

        <div
          className="rk-rule"
          ref={ruleRef}
        />

        <canvas
          className="rk-gl"
          ref={canvasRef}
        />

        <footer className="rk-bot">
          <p>{footerText}</p>

          <div className="rk-mid">
            GUARDS<s>/</s>CORPORATE<s>/</s>EVENTS<s>/</s>SURVEILLANCE
          </div>

          <Link
            className="rk-r"
            to={footerLink.href}
          >
            {footerLink.label}
          </Link>
        </footer>

        <div
          className="rk-name"
          ref={nameRef}
        />
      </div>
    </div>
  );
}
