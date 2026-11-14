import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Language: remember an explicit choice ---------- */

// Switching language keeps the reader where they were on the page (top stays top).
const KEEP_SCROLL = 'lang-switch-scroll';
const scrollRange = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

document.querySelector<HTMLAnchorElement>('[data-lang-switch]')?.addEventListener('click', () => {
  try {
    sessionStorage.setItem(KEEP_SCROLL, String(window.scrollY / scrollRange()));
  } catch {}
});

try {
  const kept = sessionStorage.getItem(KEEP_SCROLL);
  if (kept !== null) {
    sessionStorage.removeItem(KEEP_SCROLL);
    history.scrollRestoration = 'manual';
    window.scrollTo(0, Number(kept) * scrollRange());
  }
} catch {}

/* ---------- Nav: hide on scroll down, show on scroll up ---------- */

const nav = document.querySelector<HTMLElement>('[data-nav]');
let lastY = window.scrollY;
function onScrollNav() {
  if (!nav) return;
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 40);
  nav.classList.toggle('is-hidden', y > lastY && y > 400);
  lastY = y;
}
window.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();

/* ---------- Smooth scroll + highlighter ---------- */

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  // The marker is drawn across each phrase as it is read.
  document.querySelectorAll<HTMLElement>('[data-mark]').forEach((mark) => {
    gsap.fromTo(
      mark,
      { '--fill': '0%' },
      {
        '--fill': '100%',
        ease: 'none',
        scrollTrigger: { trigger: mark, start: 'top 82%', end: 'top 48%', scrub: 0.4 },
      },
    );
  });
}

/* ---------- Hero: the name assembled out of scattered points ---------- */

interface Dot {
  hx: number; // home
  hy: number;
  sx: number; // scattered position
  sy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: number; // colour index
  d: number; // start delay (s)
}

function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const name = document.querySelector<HTMLElement>('[data-hero-name]');
  if (!hero || !canvas || !name || reduced) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const css = getComputedStyle(document.documentElement);
  const colours = [
    css.getPropertyValue('--ink').trim(),
    css.getPropertyValue('--cobalt').trim(),
    css.getPropertyValue('--marker').trim(),
  ];

  let dots: Dot[] = [];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let size = 3;
  let started = 0;
  let running = false;
  let visible = true;
  const pointer = { x: -9999, y: -9999, active: false };

  function build() {
    const rect = hero!.getBoundingClientRect();
    w = Math.round(rect.width);
    h = Math.round(rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = w * dpr;
    canvas!.height = h * dpr;

    // Draw the real text offscreen with the same metrics as the <h1>, then sample it.
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const o = off.getContext('2d', { willReadFrequently: true })!;
    const style = getComputedStyle(name!);
    const fontSize = parseFloat(style.fontSize);
    o.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    if ('letterSpacing' in o) (o as any).letterSpacing = style.letterSpacing;
    o.textBaseline = 'alphabetic';
    o.fillStyle = '#000';
    name!.querySelectorAll('span').forEach((span) => {
      const r = span.getBoundingClientRect();
      const text = (span.textContent ?? '').toUpperCase();
      const m = o.measureText(text);
      // Centre the glyph box vertically inside the line box.
      const baseline = r.top - rect.top + (r.height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      o.fillText(text, r.left - rect.left, baseline);
    });

    const gap = w < 700 ? 3 : w < 1400 ? 5 : 6;
    size = gap < 4 ? gap - 0.8 : gap - 1.6;
    const data = o.getImageData(0, 0, w, h).data;
    const next: Dot[] = [];
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        if (data[(y * w + x) * 4 + 3] < 128) continue;
        const r = Math.random();
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        next.push({
          hx: x,
          hy: y,
          sx,
          sy,
          x: sx,
          y: sy,
          vx: 0,
          vy: 0,
          c: r < 0.03 ? 2 : r < 0.1 ? 1 : 0,
          d: (x / w) * 0.5 + Math.random() * 0.35,
        });
      }
    }
    // Keep current positions on resize so the name does not re-explode.
    if (dots.length) next.forEach((d) => ((d.x = d.hx), (d.y = d.hy), (d.d = 0)));
    dots = next;
    hero!.classList.add('is-live');
  }

  function frame(now: number) {
    if (!running) return;
    const t = (now - started) / 1000;
    // As the hero scrolls away the name dissolves back into noise.
    const scroll = Math.min(Math.max(window.scrollY / (h * 0.9), 0), 1);
    const loose = scroll * scroll;

    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, w, h);

    let moving = false;
    const R = 110;
    for (let c = 0; c < 3; c++) {
      ctx!.fillStyle = colours[c];
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (d.c !== c) continue;
        if (t > d.d) {
          const tx = d.hx + (d.sx - d.hx) * loose;
          const ty = d.hy + (d.sy - d.hy) * loose;
          d.vx += (tx - d.x) * 0.055;
          d.vy += (ty - d.y) * 0.055;
          if (pointer.active) {
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < R * R) {
              const dist = Math.sqrt(dist2) || 1;
              const f = ((R - dist) / R) * 3.2;
              d.vx += (dx / dist) * f;
              d.vy += (dy / dist) * f;
            }
          }
          d.vx *= 0.8;
          d.vy *= 0.8;
          d.x += d.vx;
          d.y += d.vy;
          if (Math.abs(d.vx) + Math.abs(d.vy) > 0.02) moving = true;
        } else {
          moving = true;
        }
        ctx!.fillRect(d.x, d.y, size, size);
      }
    }

    if (moving || pointer.active) requestAnimationFrame(frame);
    else running = false;
  }

  function wake() {
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  }

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    pointer.active = true;
    wake();
  });
  hero.addEventListener('pointerleave', () => {
    pointer.active = false;
    wake();
  });
  window.addEventListener('scroll', wake, { passive: true });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else running = false;
  }).observe(hero);

  let resizeTimer = 0;
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    // Mobile browsers fire resize when the URL bar collapses; only rebuild on width changes.
    if (window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      build();
      wake();
    }, 150);
  });

  build();
  started = performance.now();
  wake();
}

// The sampled text must be drawn with the display font, so wait for it.
document.fonts.load("800 100px 'Bricolage Grotesque Variable'", 'VICTORGUÊA').then(initHero, initHero);
