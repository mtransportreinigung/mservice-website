/*!
 * M Transport & Reinigung Service – Flyer
 * Gemeinsames Skript für index.html (Angebots-Bubble) und aktuell.html (Pinnwand).
 * Enthält: Flyer-Daten, Darstellung, Vollbild-Galerie (Wischen, eigener Link pro Flyer)
 * und das Speichern als Foto (A4, 2480 x 3508 px).
 */
(function () {
  'use strict';

  var SEAL = ['48', 'Stunden', 'kostenlose', 'Reklamationsfrist'];
  var PHONE = '+41 78 345 80 72';
  var WEB = 'info@mservice.ch | mservice.ch';
  var CTA = 'Jetzt Offerte anfordern';

  var NAVY = '#002266';
  var ORANGE = '#FF6A00';
  var AMBER = '#FFA000';
  var FONT = 'Arial, Helvetica, sans-serif';

  /* ---------- Styles ---------- */
  var ART_CSS = `
    .art, .art *, .lb, .lb * { box-sizing: border-box; }
    .art { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; text-rendering: geometricPrecision; }
    .lb * { margin: 0; padding: 0; }
    :where(.art) :where(h3, p, ul) { margin: 0; padding: 0; }
    .lb { font-family: Arial, Helvetica, sans-serif; line-height: 1.4; }
    html.lb-open, html.lb-open body { overflow: hidden !important; }
    .flyer-art {
      container-type: inline-size;
      position: relative;
      width: 100%;
      aspect-ratio: 210 / 297;
      overflow: hidden;
      background: #002266;
    }

    .art {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      padding: 7.5cqw 8cqw 0 8cqw;
      color: #ffffff;
      background: linear-gradient(165deg, #0a5fe0 0%, #0051C7 28%, #002266 70%, #001640 100%);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.2;
      text-align: left;
    }

    .art::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1.8cqw;
      background: linear-gradient(90deg, #FF6A00, #FFA000);
    }

    .a-ring {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }

    .a-ring-1 {
      top: -30cqw;
      right: -30cqw;
      width: 80cqw;
      height: 80cqw;
      border: 1.4cqw solid rgba(255, 255, 255, 0.07);
    }

    .a-ring-2 {
      bottom: 6cqw;
      left: -42cqw;
      width: 92cqw;
      height: 92cqw;
      border: 1cqw solid rgba(255, 160, 0, 0.12);
    }

    .a-water {
      position: absolute;
      right: -16cqw;
      bottom: 14cqw;
      width: 84cqw;
      height: 84cqw;
      color: #ffffff;
      opacity: 0.06;
      pointer-events: none;
    }

    .a-top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 3cqw;
    }

    .a-brand {
      display: flex;
      align-items: center;
      gap: 2.4cqw;
      min-width: 0;
    }

    .a-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 10cqw;
      padding: 1.2cqw 2cqw;
      background: #ffffff;
      border-radius: 2cqw;
      flex-shrink: 0;
    }

    .a-logo img {
      display: block;
      height: 100%;
      width: auto;
      max-width: 22cqw;
      object-fit: contain;
    }

    .a-brandtext {
      font-size: 2.5cqw;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 1.3;
      max-width: 28cqw;
    }

    .a-tag {
      position: absolute;
      left: 33cqw;
      top: 31.5cqw;
      transform: translateY(-50%);
      padding-left: 2.4cqw;
      border-left: 0.9cqw solid #FF6A00;
      color: #FFA000;
      font-size: 2.4cqw;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      line-height: 1.3;
      white-space: nowrap;
    }

    .a-icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 21cqw;
      height: 21cqw;
      margin-top: 3.5cqw;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.10);
      border: 0.9cqw solid #FF6A00;
      color: #ffffff;
    }

    .a-icon svg {
      width: 11cqw;
      height: 11cqw;
    }

    .a-seal {
      position: absolute;
      top: 17.5cqw;
      right: 7cqw;
      width: 25cqw;
      height: 25cqw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 25%, #FFC24D 0%, #FFA000 60%, #F58A00 100%);
      color: #002266;
      padding-bottom: 1.6cqw;
      transform: rotate(-10deg);
      outline: 0.8cqw dashed #002266;
      outline-offset: -1.4cqw;
      box-shadow: 0 1.5cqw 3cqw rgba(0, 0, 0, 0.28);
    }

    .a-seal b {
      font-size: 7.4cqw;
      font-weight: 900;
      line-height: 0.95;
    }

    .a-seal i {
      font-style: normal;
      font-size: 2.5cqw;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.15;
    }

    .a-seal em {
      font-style: normal;
      font-size: 1.7cqw;
      font-weight: bold;
      line-height: 1.2;
    }

    .a-title {
      position: relative;
      margin-top: 3.5cqw;
      font-weight: normal;
    }

    .a-kicker {
      display: block;
      font-size: 5.2cqw;
      font-weight: 900;
      color: #FFA000;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      line-height: 6cqw;
      white-space: nowrap;
    }

    .a-main {
      display: flex;
      align-items: center;
      height: 13.3cqw;
      margin-top: 0.8cqw;
      font-size: var(--ms, 13cqw);
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.02em;
      line-height: 1;
      white-space: nowrap;
    }

    .a-sub {
      position: relative;
      margin-top: 2.2cqw;
      font-size: 3.4cqw;
      line-height: 1.38;
      color: rgba(255, 255, 255, 0.9);
    }

    .a-list {
      position: relative;
      list-style: none;
      margin-top: 3.2cqw;
      display: flex;
      flex-direction: column;
      gap: 1.8cqw;
    }

    .a-list li {
      display: flex;
      align-items: center;
      gap: 3cqw;
      height: 7.6cqw;
      padding: 0 3cqw;
      font-size: 3.6cqw;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.09);
      border-radius: 2cqw;
      white-space: nowrap;
    }

    .a-check {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.8cqw;
      height: 4.8cqw;
      border-radius: 50%;
      background: #FF6A00;
      color: #ffffff;
    }

    .a-check svg {
      width: 2.9cqw;
      height: 2.9cqw;
    }

    .a-foot {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 29cqw;
      padding: 7cqw 8cqw 6.5cqw 8cqw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4cqw;
      color: #002266;
      background: linear-gradient(100deg, #FF6A00 0%, #FF8A00 55%, #FFA000 100%);
      clip-path: polygon(0 16%, 100% 0, 100% 100%, 0 100%);
    }

    .a-foot-text {
      display: flex;
      flex-direction: column;
      gap: 0.8cqw;
      min-width: 0;
    }

    .a-cta {
      font-size: 4.6cqw;
      font-weight: 900;
      line-height: 1.15;
    }

    .a-phone {
      font-size: 3.6cqw;
      font-weight: bold;
      line-height: 1.2;
    }

    .a-web {
      font-size: 2.9cqw;
      font-weight: bold;
      line-height: 1.2;
      opacity: 0.9;
    }

    .a-go {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10.5cqw;
      height: 10.5cqw;
      border-radius: 50%;
      background: #002266;
      color: #ffffff;
    }

    .a-go svg {
      width: 5cqw;
      height: 5cqw;
    }


`;

  var LB_CSS = `
    /* =====================================================
       VOLLBILD-GALERIE
       ===================================================== */
    .lb {
      position: fixed;
      inset: 0;
      z-index: 3000;
      display: none;
      flex-direction: column;
      background-color: rgba(0, 12, 36, 0.96);
      color: #ffffff;
      touch-action: none;
      overscroll-behavior: contain;
      -webkit-user-select: none;
      user-select: none;
    }

    .lb.open {
      display: flex;
      animation: lbIn 0.25s ease both;
    }

    @keyframes lbIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .lb-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: max(12px, env(safe-area-inset-top, 0px)) 16px 6px 16px;
      min-height: 60px;
    }

    .lb-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .lb-title {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lb-counter {
      font-size: 12.5px;
      opacity: 0.75;
    }

    .lb-icon-btn {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 0;
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .lb-icon-btn:hover {
      background: rgba(255, 255, 255, 0.26);
    }

    .lb-icon-btn svg {
      width: 22px;
      height: 22px;
    }

    .lb-stage {
      position: relative;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      cursor: grab;
    }

    .lb-stage:active {
      cursor: grabbing;
    }

    .lb-track {
      display: flex;
      height: 100%;
      will-change: transform;
      transition: transform 0.35s cubic-bezier(0.22, 0.8, 0.3, 1);
    }

    .lb-slide {
      flex: 0 0 100%;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 0;
    }

    .lb-art {
      width: min(94vw, calc((100vh - 176px) * 0.7071));
      width: min(94vw, calc((100dvh - 176px) * 0.7071));
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55);
      pointer-events: none;
    }

    .lb-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      width: 52px;
      height: 52px;
    }

    .lb-prev { left: 16px; }
    .lb-next { right: 16px; }

    .lb-nav[hidden] { display: none; }

    .lb-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 8px 16px max(14px, env(safe-area-inset-bottom, 0px)) 16px;
    }

    .lb-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      padding: 0 20px;
      border-radius: 50px;
      border: 0;
      background: rgba(255, 255, 255, 0.14);
      color: #ffffff;
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .lb-btn:hover {
      background: rgba(255, 255, 255, 0.26);
    }

    .lb-btn svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .lb-btn.primary {
      background: #FF6A00;
    }

    .lb-btn.primary:hover {
      background: #FFA000;
      color: #002266;
    }

    .lb-btn[hidden] { display: none; }

    .lb-toast {
      position: absolute;
      left: 50%;
      bottom: 86px;
      transform: translate(-50%, 10px);
      background: #ffffff;
      color: #002266;
      font-size: 14px;
      font-weight: bold;
      padding: 10px 18px;
      border-radius: 50px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      z-index: 5;
    }

    .lb-toast.show {
      opacity: 1;
      transform: translate(-50%, 0);
    }


    @media (hover: none) { .lb-nav { display: none; } }
    @media (max-width: 480px) { .lb-btn { padding: 0 14px; font-size: 13px; } }
    @media (prefers-reduced-motion: reduce) {
      .lb-track { transition: none; }
      .lb.open { animation: none; }
    }
`;

  var BOARD_CSS = `
    .cork {
      position: relative;
      padding: 30px 24px 44px;
      background-color: #c8955a;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .33 0 0 0 0 .18 0 0 0 0 .06 0 0 0 .9 -.12'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E"),
        radial-gradient(ellipse at 18% 8%, rgba(255, 228, 176, 0.6), rgba(255, 228, 176, 0) 55%),
        radial-gradient(ellipse at 88% 92%, rgba(90, 50, 15, 0.38), rgba(90, 50, 15, 0) 60%);
      border: 16px solid #6b3f1d;
      border-image: linear-gradient(135deg, #a4743c, #5b3417 45%, #8a5a2b 70%, #4f2d13) 1;
      box-shadow: inset 0 0 60px rgba(60, 30, 5, 0.6), 0 20px 44px rgba(0, 0, 0, 0.35);
      overflow: hidden;
    }

    .cork .pin {
      position: absolute;
      z-index: 4;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.9) 0, rgba(255, 255, 255, 0) 30%),
        radial-gradient(circle at 50% 50%, var(--pc, #e53935) 0, var(--pc, #e53935) 52%, rgba(0, 0, 0, 0.4) 100%);
      box-shadow: 0 6px 6px rgba(0, 0, 0, 0.45);
    }

    .cork .pin::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 7px;
      height: 7px;
      margin: -3px 0 0 -3px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.28);
    }

    .cork-banner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      flex-wrap: wrap;
      max-width: 780px;
      margin: 0 auto 46px auto;
      padding: 24px 30px;
      background: linear-gradient(135deg, #0051C7 0%, #002266 100%);
      color: #ffffff;
      border-top: 6px solid #FF6A00;
      border-radius: 4px;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.42);
      transform: rotate(-0.8deg);
    }

    .cork-banner .pin-l { top: -12px; left: 22px; --pc: #e53935; }
    .cork-banner .pin-r { top: -12px; right: 22px; --pc: #fdd835; }

    .cork-kicker {
      display: block;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #FFA000;
      margin-bottom: 4px;
    }

    .cork-banner strong {
      display: block;
      font-size: 28px;
      line-height: 1.12;
      letter-spacing: -0.01em;
    }

    .cork-sub {
      display: block;
      margin-top: 8px;
      font-size: 14px;
      opacity: 0.92;
    }

    .cork-sticker {
      flex-shrink: 0;
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 92px;
      height: 92px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 25%, #FFC24D 0%, #FFA000 60%, #F58A00 100%);
      color: #002266;
      transform: rotate(10deg);
      outline: 2px dashed #002266;
      outline-offset: -6px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.35);
    }

    .cork-sticker b { font-size: 17px; line-height: 1.05; }
    .cork-sticker i { font-style: normal; font-size: 10px; font-weight: bold; letter-spacing: 0.04em; }

    .cork-group + .cork-group { margin-top: 54px; }

    .cork-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 34px;
    }

    .cork-label {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 14px 24px 14px 16px;
      background: #fffdf7;
      border-radius: 3px;
      box-shadow: 0 8px 14px rgba(0, 0, 0, 0.38);
      transform: rotate(-1.4deg);
    }

    .cork-label .pin { top: -13px; left: 50%; margin-left: -12px; }

    .cork-label .gi {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #e0f2fe;
      color: #0051C7;
      border: 2px solid #FF6A00;
    }

    .cork-label .gi svg { width: 22px; height: 22px; }

    .cork-label strong {
      display: block;
      font-size: 20px;
      line-height: 1.15;
      color: #002266;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .cork-label small {
      display: block;
      font-size: 12.5px;
      color: #64748b;
    }

    .sticky {
      position: relative;
      max-width: 200px;
      padding: 22px 16px 16px;
      background-color: #fff176;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 45%);
      color: #3b2f00;
      font-family: 'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Chalkboard SE', Arial, sans-serif;
      font-size: 15px;
      font-weight: bold;
      line-height: 1.3;
      box-shadow: 0 10px 14px rgba(0, 0, 0, 0.38);
      transform: rotate(2.8deg);
    }

    .sticky .pin { top: -10px; left: 50%; margin-left: -9px; width: 18px; height: 18px; --pc: #1e88e5; }

    .cork-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 44px 32px;
      padding: 0 6px;
    }

    .cork .flyer-card {
      position: relative;
      display: block;
      padding: 6px;
      background: #ffffff;
      border-radius: 2px;
      text-decoration: none;
      cursor: zoom-in;
      box-shadow: 0 16px 22px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.35);
      opacity: 0;
      transform: translateY(-40px) rotate(calc(var(--r, 0deg) + 8deg)) scale(0.94);
      transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, box-shadow 0.3s ease;
    }

    .cork .flyer-card.in {
      opacity: 1;
      transform: rotate(var(--r, 0deg));
    }

    .cork .flyer-card.in:hover,
    .cork .flyer-card.in:focus-visible {
      z-index: 6;
      transform: rotate(0deg) translateY(-10px) scale(1.05);
      box-shadow: 0 26px 34px rgba(0, 0, 0, 0.45), 0 4px 8px rgba(0, 0, 0, 0.35);
      transition-duration: 0.35s, 0.4s, 0.3s;
    }

    .cork .flyer-card:focus-visible { outline: 3px solid #FF6A00; outline-offset: 4px; }

    .cork .flyer-card .pin { top: -13px; left: 50%; margin-left: -12px; }

    .cork .tape {
      position: absolute;
      top: -14px;
      z-index: 4;
      width: 82px;
      height: 28px;
      background: linear-gradient(180deg, rgba(255, 251, 220, 0.88), rgba(244, 230, 176, 0.82));
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.28);
    }

    .cork .tape-l { left: -24px; transform: rotate(-38deg); }
    .cork .tape-r { right: -24px; transform: rotate(38deg); }

    @media (max-width: 600px) {
      .cork { padding: 26px 14px 36px; border-width: 12px; }
      .cork-banner { padding: 22px 20px; }
      .cork-banner strong { font-size: 23px; }
      .cork-kicker { font-size: 11px; letter-spacing: 0.06em; }
      .cork-sticker { width: 80px; height: 80px; margin-top: -4px; }
      .cork-sticker b { font-size: 15px; }
      .cork-sticker i { font-size: 9px; }
      .cork-label strong { font-size: 17px; }
      .cork-label { padding-right: 18px; }
      .sticky { max-width: 190px; font-size: 14px; }
      .cork-grid { gap: 40px 24px; padding: 0 4px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cork .flyer-card, .cork .flyer-card.in:hover { transition: none; }
    }
`;

  function addStyle(id, css) {
    if (document.getElementById(id)) return;
    var st = document.createElement('style');
    st.id = id;
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------- Icons (eine Quelle für Seite und Bild) ---------- */
  var ICONS = {
    home: {
      d: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
      extra: { d: 'M8.5 15.5l2.5 2.5 4.5-5.5', color: ORANGE, w: 2.4 }
    },
    house: { d: ['M3 11l9-8 9 8', 'M5 9.5V21h14V9.5', 'M10 21v-6h4v6'] },
    briefcase: {
      d: ['M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
          'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16']
    },
    monitor: {
      d: ['M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4']
    },
    building: {
      d: ['M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
          'M9 6h.01', 'M15 6h.01', 'M9 10h.01', 'M15 10h.01', 'M9 14h.01', 'M15 14h.01', 'M9 18h6']
    },
    cycle: {
      d: ['M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4l-2.1 2.1m-8.6 8.6l-2.1 2.1m0-12.8l2.1 2.1m8.6 8.6l2.1 2.1',
          'M16 12a4 4 0 1 1-8 0a4 4 0 1 1 8 0z']
    },
    calendar: {
      d: ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18']
    },
    sparkle: {
      d: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M19 3v4', 'M17 5h4']
    },
    tools: {
      d: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z']
    },
    key: {
      d: ['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4']
    }
  };

  /* ---------- Angebote (Dienstleistung und Branche, passend zum Offertenformular) ---------- */
  var GROUPS = [
    { key: 'umzug', title: 'Umzugsreinigung', sub: 'Für eine erfolgreiche Übergabe', icon: 'home', href: 'offerte.html?service=umzug', note: '48 Stunden kostenlose Reklamationsfrist' },
    { key: 'gebaeude', title: 'Gebäudereinigung', sub: 'Für Büros und Liegenschaften', icon: 'building', href: 'offerte.html?service=gebaeude', note: 'Für Privatkunden und Gewerbe' },
    { key: 'unterhalt', title: 'Unterhaltsreinigung', sub: 'Regelmässig nach Ihren Wünschen', icon: 'cycle', href: 'offerte.html?service=unterhalt', note: 'Reinigungsmittel und Geräte bringen wir mit' },
    { key: 'grund', title: 'Grundreinigung', sub: 'Gründlich für jeden Anlass', icon: 'sparkle', href: 'offerte.html?service=grund', note: 'Jetzt unverbindliche Offerte anfordern!' }
  ];

  var FLYERS = [
    {
      id: 'umzugsreinigung-wohnung', group: 'umzug', title: 'Umzugsreinigung – Wohnung',
      kicker: 'Umzugsreinigung', main: 'Wohnung', ms: 13, tag: 'Wohnungsabgabe', icon: 'home',
      sub: 'Gründliche Endreinigung Ihrer Wohnung für eine erfolgreiche Wohnungsabgabe.',
      items: ['Küche, Bad und alle Zimmer', 'Fenster, Storen und Böden', 'Auch Balkon und Keller möglich']
    },
    {
      id: 'umzugsreinigung-haus', group: 'umzug', title: 'Umzugsreinigung – Haus',
      kicker: 'Umzugsreinigung', main: 'Haus', ms: 13, tag: 'Hausübergabe', icon: 'house',
      sub: 'Endreinigung Ihres Einfamilienhauses, Reihenhauses oder Ihrer Maisonette.',
      items: ['Einfamilien- und Reihenhäuser', 'Maisonette-Wohnungen', 'Auch Keller, Estrich und Garage']
    },
    {
      id: 'umzugsreinigung-gewerbe', group: 'umzug', title: 'Umzugsreinigung – Gewerbe',
      kicker: 'Umzugsreinigung', main: 'Gewerbe', ms: 13, tag: 'Gewerbe', icon: 'briefcase',
      sub: 'Endreinigung Ihrer Gewerberäume für eine reibungslose Rückgabe.',
      items: ['Reinigung Ihrer Gewerberäume', 'Sanitärräume, Küchen und Böden', 'Pünktlich zum Übergabetermin']
    },
    {
      id: 'gebaeudereinigung-buero', group: 'gebaeude', title: 'Gebäudereinigung – Büro',
      kicker: 'Gebäudereinigung', main: 'Büro', ms: 13, tag: 'Büro und Kanzlei', icon: 'monitor',
      sub: 'Regelmässige oder einmalige Reinigung Ihrer Büroräume und Ihrer Kanzlei.',
      items: ['Büros, Pausenraum und Teeküche', 'Fenster und Glasfronten', 'Flexible Reinigungshäufigkeit']
    },
    {
      id: 'gebaeudereinigung-liegenschaften', group: 'gebaeude', title: 'Gebäudereinigung – Liegenschaften',
      kicker: 'Gebäudereinigung', main: 'Liegenschaften', ms: 10, tag: 'Mehrfamilienhaus', icon: 'building',
      sub: 'Reinigung von Treppenhäusern und Gemeinschaftsräumen für Verwaltungen.',
      items: ['Treppenhaus und Eingangsbereich', 'Waschküche, Keller und Tiefgarage', 'Fenster und Aussenbereich']
    },
    {
      id: 'unterhaltsreinigung-wohnung', group: 'unterhalt', title: 'Unterhaltsreinigung – Wohnung',
      kicker: 'Unterhaltsreinigung', main: 'Wohnung', ms: 13, tag: 'Regelmässig', icon: 'cycle',
      sub: 'Fortlaufende Reinigung Ihrer Wohnung nach Ihren Wünschen.',
      items: ['Wöchentlich oder alle 2 Wochen', 'Ihre Wunschtage und Tageszeit', 'Reinigungsmittel und Geräte inklusive']
    },
    {
      id: 'unterhaltsreinigung-haus', group: 'unterhalt', title: 'Unterhaltsreinigung – Haus',
      kicker: 'Unterhaltsreinigung', main: 'Haus', ms: 13, tag: 'Regelmässig', icon: 'calendar',
      sub: 'Fortlaufende Reinigung Ihres Einfamilienhauses nach Ihren Wünschen.',
      items: ['Wöchentlich oder monatlich', 'Ihre Wunschtage und Tageszeit', 'Reinigungsmittel und Geräte inklusive']
    },
    {
      id: 'grundreinigung-fruehjahrsputz', group: 'grund', title: 'Grundreinigung – Frühjahrsputz',
      kicker: 'Grundreinigung', main: 'Frühjahrsputz', ms: 10, tag: 'Tiefenreinigung', icon: 'sparkle',
      sub: 'Intensive Reinigung Ihres Zuhauses, auch bei hartnäckigen Verschmutzungen.',
      items: ['Fenster und Fensterrahmen', 'Küche, Backofen und Dunstabzug', 'Bad und WC mit Entkalkung']
    },
    {
      id: 'grundreinigung-renovation', group: 'grund', title: 'Grundreinigung – Renovation',
      kicker: 'Grundreinigung', main: 'Renovation', ms: 13, tag: 'Nach Umbau', icon: 'tools',
      sub: 'Gründliche Reinigung nach Renovation oder Umbau, bereit zum Einzug.',
      items: ['Fenster, Rahmen und Storen', 'Bad, WC und Küche', 'Auf Wunsch das gesamte Objekt']
    },
    {
      id: 'grundreinigung-neubau', group: 'grund', title: 'Grundreinigung – Neubau',
      kicker: 'Grundreinigung', main: 'Neubau', ms: 13, tag: 'Erstreinigung', icon: 'key',
      sub: 'Erstreinigung nach dem Neubau, damit Sie sauber einziehen können.',
      items: ['Fenster und Fensterrahmen', 'Küche und Küchengeräte', 'Bad, WC und alle Zimmer']
    }
  ];

  var flyers = FLYERS;
  var last = flyers.length - 1;

  GROUPS.forEach(function (g) {
    FLYERS.forEach(function (f) { if (f.group === g.key) f.href = g.href; });
  });

  /* ---------- Darstellung ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function iconSvg(key, sw, cls) {
    var ic = ICONS[key];
    var h = '<svg' + (cls ? ' class="' + cls + '"' : '') + ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    ic.d.forEach(function (d) { h += '<path d="' + d + '"/>'; });
    if (ic.extra) h += '<path d="' + ic.extra.d + '" stroke="' + ic.extra.color + '" stroke-width="' + ic.extra.w + '"/>';
    return h + '</svg>';
  }

  function ui(inner, size, sw) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }

  var UI_CLOSE = '<path d="M5 5l14 14M19 5L5 19"/>';
  var UI_PREV = '<path d="M15 18l-6-6 6-6"/>';
  var UI_NEXT = '<path d="M9 18l6-6-6-6"/>';
  var UI_DOWNLOAD = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>';
  var UI_ARROW = '<path d="M5 12h14M12 5l7 7-7 7"/>';

  var CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
  var ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  function artHTML(f) {
    var h = '<div class="flyer-art"><div class="art">';
    h += '<span class="a-ring a-ring-1"></span><span class="a-ring a-ring-2"></span>';
    h += iconSvg(f.icon, 0.6, 'a-water');
    h += '<div class="a-top"><span class="a-brand"><span class="a-logo"><img src="/logo.PNG" alt=""></span><span class="a-brandtext">M Transport &amp; Reinigung Service</span></span></div>';
    h += '<span class="a-icon">' + iconSvg(f.icon, 1.7, '') + '</span>';
    h += '<span class="a-tag">' + esc(f.tag) + '</span>';
    h += '<span class="a-seal"><b>' + SEAL[0] + '</b><i>' + SEAL[1] + '</i><em>' + SEAL[2] + '</em><em>' + SEAL[3] + '</em></span>';
    h += '<h3 class="a-title" aria-label="' + esc(f.title) + '"><span class="a-kicker">' + esc(f.kicker) + '</span><span class="a-main" style="--ms:' + f.ms + 'cqw">' + esc(f.main) + '</span></h3>';
    h += '<p class="a-sub">' + esc(f.sub) + '</p>';
    h += '<ul class="a-list">';
    f.items.forEach(function (it) { h += '<li><span class="a-check">' + CHECK_SVG + '</span>' + esc(it) + '</li>'; });
    h += '</ul>';
    h += '<div class="a-foot"><div class="a-foot-text"><span class="a-cta">' + CTA + '</span><span class="a-phone">' + PHONE + '</span><span class="a-web">' + esc(WEB) + '</span></div>';
    h += '<span class="a-go">' + ARROW_SVG + '</span></div>';
    return h + '</div></div>';
  }

  /* ---------- Pinnwand (aktuell.html) ---------- */
  var ROT = [-2.4, 1.8, -1.2, 2.2, -1.6, 1.4, -2, 1.2, -1.4, 2.1];
  var PIN_COLORS = ['#e53935', '#1e88e5', '#fdd835', '#43a047'];

  function renderBoard(mount) {
    if (!mount) return;
    addStyle('msf-art-css', ART_CSS);
    addStyle('msf-board-css', BOARD_CSS);

    var h = '<div class="cork">';
    h += '<div class="cork-banner"><span class="pin pin-l"></span><span class="pin pin-r"></span>';
    h += '<div><span class="cork-kicker">M Transport &amp; Reinigung Service</span><strong>Das passende Angebot für Sie</strong>';
    h += '<span class="cork-sub">Flyer antippen, durchblättern und als Foto speichern</span></div>';
    h += '<span class="cork-sticker"><b>Offerte</b><i>unverbindlich</i></span></div>';
    GROUPS.forEach(function (g, gi) {
      h += '<section class="cork-group"><div class="cork-head">';
      h += '<div class="cork-label"><span class="pin" style="--pc:' + PIN_COLORS[(gi + 1) % 4] + '"></span><span class="gi">' + iconSvg(g.icon, 1.9, '') + '</span>';
      h += '<div><strong>' + esc(g.title) + '</strong><small>' + esc(g.sub) + '</small></div></div>';
      h += '<div class="sticky"><span class="pin"></span>' + esc(g.note) + '</div></div>';
      h += '<div class="cork-grid" data-g="' + g.key + '"></div></section>';
    });
    h += '</div>';
    mount.innerHTML = h;

    var cards = [];
    FLYERS.forEach(function (f, i) {
      var grid = mount.querySelector('.cork-grid[data-g="' + f.group + '"]');
      var a = document.createElement('a');
      a.className = 'flyer-card';
      a.href = '#' + f.id;
      a.setAttribute('data-flyer', f.id);
      a.setAttribute('aria-label', f.title + ': Flyer ansehen');
      a.style.setProperty('--r', ROT[i % ROT.length] + 'deg');
      var deco = (i % 3 === 2)
        ? '<span class="tape tape-l"></span><span class="tape tape-r"></span>'
        : '<span class="pin" style="--pc:' + PIN_COLORS[i % 4] + '"></span>';
      a.innerHTML = deco + artHTML(f);
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        openAt(i, true);
      });
      grid.appendChild(a);
      cards.push(a);
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        var n = 0;
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          io.unobserve(el);
          setTimeout(function () { el.classList.add('in'); }, n * 120);
          n++;
        });
      }, { threshold: 0.12 });
      cards.forEach(function (c) { io.observe(c); });
    } else {
      cards.forEach(function (c) { c.classList.add('in'); });
    }
  }

  /* ---------- Vollbild-Galerie ---------- */
  var lb = null;
  var stage, track, counter, titleEl, btnClose, btnPrev, btnNext, btnSave, cta, toast;
  var index = 0;
  var isOpen = false;
  var pushed = false;
  var lastFocus = null;
  var drag = null;
  var toastTimer = null;

  function buildLightbox() {
    if (lb) return;
    addStyle('msf-art-css', ART_CSS);
    addStyle('msf-lb-css', LB_CSS);

    lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Flyer');
    lb.innerHTML =
      '<div class="lb-top"><div class="lb-info"><span class="lb-title"></span><span class="lb-counter" aria-live="polite"></span></div>' +
      '<button type="button" class="lb-icon-btn" data-act="close" aria-label="Schliessen">' + ui(UI_CLOSE, 22, 2.4) + '</button></div>' +
      '<div class="lb-stage"><div class="lb-track"></div>' +
      '<button type="button" class="lb-icon-btn lb-nav lb-prev" data-act="prev" aria-label="Vorheriger Flyer">' + ui(UI_PREV, 22, 2.4) + '</button>' +
      '<button type="button" class="lb-icon-btn lb-nav lb-next" data-act="next" aria-label="Nächster Flyer">' + ui(UI_NEXT, 22, 2.4) + '</button></div>' +
      '<div class="lb-bar"><button type="button" class="lb-btn" data-act="save">' + ui(UI_DOWNLOAD, 18, 2.2) + 'Als Foto speichern</button>' +
      '<a class="lb-btn primary" data-act="cta" href="offerte.html">Offerte anfordern' + ui(UI_ARROW, 18, 2.4) + '</a></div>' +
      '<div class="lb-toast" role="status"></div>';
    document.body.appendChild(lb);

    stage = lb.querySelector('.lb-stage');
    track = lb.querySelector('.lb-track');
    counter = lb.querySelector('.lb-counter');
    titleEl = lb.querySelector('.lb-title');
    btnClose = lb.querySelector('[data-act="close"]');
    btnPrev = lb.querySelector('[data-act="prev"]');
    btnNext = lb.querySelector('[data-act="next"]');
    btnSave = lb.querySelector('[data-act="save"]');
    cta = lb.querySelector('[data-act="cta"]');
    toast = lb.querySelector('.lb-toast');

    flyers.forEach(function (f, i) {
      f.blob = null;
      f.file = null;
      f.busy = false;
      var slide = document.createElement('div');
      slide.className = 'lb-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'Flyer');
      slide.setAttribute('aria-label', (i + 1) + ' von ' + flyers.length);
      slide.innerHTML = '<div class="lb-art"></div>';
      track.appendChild(slide);
      f.slide = slide;
      f.filled = false;
    });

    btnClose.addEventListener('click', function () { closeLb(true); });
    btnPrev.addEventListener('click', function () { goTo(index - 1, true); });
    btnNext.addEventListener('click', function () { goTo(index + 1, true); });
    btnSave.addEventListener('click', onSave);

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
  }

  /* ---------- Logo laden (für das gespeicherte Bild) ---------- */
  var logoImg = null;
  var logoReady = new Promise(function (resolve) {
    var im = new Image();
    im.onload = function () { logoImg = im; resolve(); };
    im.onerror = function () { resolve(); };
    var headerLogo = document.querySelector('.logo-img');
    im.src = (headerLogo && (headerLogo.currentSrc || headerLogo.src)) || '/logo.PNG';
  });

  /* ---------- Flyer als Bild zeichnen (A4, 2480 x 3508 px = 300 dpi) ---------- */
  function drawIcon(x, key, cx, cy, size, color, sw) {
    var ic = ICONS[key];
    if (!ic) return;
    x.save();
    x.translate(cx - size / 2, cy - size / 2);
    x.scale(size / 24, size / 24);
    x.lineWidth = sw;
    x.lineCap = 'round';
    x.lineJoin = 'round';
    x.strokeStyle = color;
    ic.d.forEach(function (d) { x.stroke(new Path2D(d)); });
    if (ic.extra) {
      x.strokeStyle = ic.extra.color;
      x.lineWidth = ic.extra.w;
      x.stroke(new Path2D(ic.extra.d));
    }
    x.restore();
  }

  function cssGradient(x, x0, y0, w, h, angle, stops) {
    var a = angle * Math.PI / 180;
    var dx = Math.sin(a);
    var dy = -Math.cos(a);
    var len = Math.abs(w * dx) + Math.abs(h * dy);
    var cx = x0 + w / 2;
    var cy = y0 + h / 2;
    var g = x.createLinearGradient(cx - dx * len / 2, cy - dy * len / 2, cx + dx * len / 2, cy + dy * len / 2);
    stops.forEach(function (st) { g.addColorStop(st[0], st[1]); });
    return g;
  }

  function roundRect(x, rx, ry, w, h, r) {
    x.beginPath();
    x.moveTo(rx + r, ry);
    x.arcTo(rx + w, ry, rx + w, ry + h, r);
    x.arcTo(rx + w, ry + h, rx, ry + h, r);
    x.arcTo(rx, ry + h, rx, ry, r);
    x.arcTo(rx, ry, rx + w, ry, r);
    x.closePath();
  }

  function setFont(x, weight, size) {
    x.font = weight + ' ' + size + 'px ' + FONT;
  }

  function spacedWidth(x, text, sp) {
    var w = 0;
    Array.from(text).forEach(function (ch) { w += x.measureText(ch).width + sp; });
    return w - sp;
  }

  function drawSpaced(x, text, px, py, sp, align) {
    var w = spacedWidth(x, text, sp);
    var cx = px;
    if (align === 'center') cx = px - w / 2;
    if (align === 'right') cx = px - w;
    x.textAlign = 'left';
    Array.from(text).forEach(function (ch) {
      x.fillText(ch, cx, py);
      cx += x.measureText(ch).width + sp;
    });
  }

  function wrapLines(x, text, maxW) {
    var words = text.split(/\s+/);
    var lines = [];
    var cur = '';
    words.forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (x.measureText(test).width > maxW && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = test;
      }
    });
    if (cur) lines.push(cur);
    return lines;
  }

  function renderFlyer(f) {
    var W = 2480;
    var H = 3508;
    var u = W / 100;
    var cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    var x = cv.getContext('2d');
    x.imageSmoothingEnabled = true;
    x.imageSmoothingQuality = 'high';
    x.textBaseline = 'middle';

    // Hintergrund
    x.fillStyle = cssGradient(x, 0, 0, W, H, 165, [[0, '#0a5fe0'], [0.28, '#0051C7'], [0.7, NAVY], [1, '#001640']]);
    x.fillRect(0, 0, W, H);

    // Ringe
    x.lineWidth = 1.4 * u;
    x.strokeStyle = 'rgba(255,255,255,0.07)';
    x.beginPath();
    x.arc(90 * u, 10 * u, 39.3 * u, 0, Math.PI * 2);
    x.stroke();
    x.lineWidth = 1 * u;
    x.strokeStyle = 'rgba(255,160,0,0.12)';
    x.beginPath();
    x.arc(4 * u, H - 52 * u, 45.5 * u, 0, Math.PI * 2);
    x.stroke();

    // Wasserzeichen-Icon
    x.save();
    x.globalAlpha = 0.06;
    drawIcon(x, f.icon, 74 * u, H - 56 * u, 84 * u, '#ffffff', 0.6);
    x.restore();

    // Kopfzeile: Logo + Firmenname
    var rowCy = 12.5 * u;
    var brandX = 8 * u;
    if (logoImg && logoImg.naturalWidth > 0) {
      var ih = 7.6 * u;
      var iw = Math.min(logoImg.naturalWidth / logoImg.naturalHeight * ih, 22 * u);
      roundRect(x, 8 * u, 7.5 * u, iw + 4 * u, 10 * u, 2 * u);
      x.fillStyle = '#ffffff';
      x.fill();
      x.drawImage(logoImg, 10 * u, 8.7 * u, iw, ih);
      brandX = 8 * u + iw + 4 * u + 2.4 * u;
    }
    setFont(x, 'bold', 2.5 * u);
    x.fillStyle = '#ffffff';
    drawSpaced(x, 'M TRANSPORT &', brandX, rowCy - 1.625 * u, 0.05 * 2.5 * u, 'left');
    drawSpaced(x, 'REINIGUNG SERVICE', brandX, rowCy + 1.625 * u, 0.05 * 2.5 * u, 'left');

    // Tag neben dem Icon
    var tagSize = 2.4 * u;
    setFont(x, 'bold', tagSize);
    var tagText = f.tag.toUpperCase();
    while (spacedWidth(x, tagText, 0.06 * tagSize) > 29.7 * u) {
      tagSize *= 0.97;
      setFont(x, 'bold', tagSize);
    }
    x.fillStyle = ORANGE;
    x.fillRect(33 * u, (31.5 - 2.1) * u, 0.9 * u, 4.2 * u);
    x.fillStyle = AMBER;
    drawSpaced(x, tagText, 36.3 * u, 31.5 * u, 0.06 * tagSize, 'left');

    // Icon-Kreis
    x.beginPath();
    x.arc(18.5 * u, 31.5 * u, 10.05 * u, 0, Math.PI * 2);
    x.fillStyle = 'rgba(255,255,255,0.10)';
    x.fill();
    x.lineWidth = 0.9 * u;
    x.strokeStyle = ORANGE;
    x.stroke();
    drawIcon(x, f.icon, 18.5 * u, 31.5 * u, 11 * u, '#ffffff', 1.7);

    // Titel
    var tTop = 45.5;
    setFont(x, 900, 5.2 * u);
    x.fillStyle = AMBER;
    drawSpaced(x, f.kicker.toUpperCase(), 8 * u, (tTop + 3) * u, 0.05 * 5.2 * u, 'left');
    var ms = f.ms * u;
    setFont(x, 900, ms);
    while (spacedWidth(x, f.main, -0.02 * ms) > 84 * u) {
      ms *= 0.97;
      setFont(x, 900, ms);
    }
    x.fillStyle = '#ffffff';
    drawSpaced(x, f.main, 8 * u, (tTop + 6 + 0.8 + 6.65) * u, -0.02 * ms, 'left');

    // Untertitel
    var subTop = tTop + 6 + 0.8 + 13.3 + 2.2;
    var lh = 3.4 * 1.38;
    setFont(x, 'normal', 3.4 * u);
    x.fillStyle = 'rgba(255,255,255,0.9)';
    x.textAlign = 'left';
    var subLines = wrapLines(x, f.sub, 84 * u);
    subLines.forEach(function (ln, i) {
      x.fillText(ln, 8 * u, (subTop + (i + 0.5) * lh) * u);
    });

    // Liste
    var listTop = subTop + subLines.length * lh + 3.2;
    f.items.forEach(function (it, i) {
      var ry = listTop + i * (7.6 + 1.8);
      roundRect(x, 8 * u, ry * u, 84 * u, 7.6 * u, 2 * u);
      x.fillStyle = 'rgba(255,255,255,0.09)';
      x.fill();
      var cy = (ry + 3.8) * u;
      x.beginPath();
      x.arc(13.4 * u, cy, 2.4 * u, 0, Math.PI * 2);
      x.fillStyle = ORANGE;
      x.fill();
      x.save();
      x.translate(13.4 * u - 1.45 * u, cy - 1.45 * u);
      x.scale(2.9 * u / 24, 2.9 * u / 24);
      x.lineWidth = 4;
      x.lineCap = 'round';
      x.lineJoin = 'round';
      x.strokeStyle = '#ffffff';
      x.stroke(new Path2D('M20 6L9 17l-5-5'));
      x.restore();
      setFont(x, 'bold', 3.6 * u);
      x.fillStyle = '#ffffff';
      x.textAlign = 'left';
      x.fillText(it, 18.8 * u, cy);
    });

    // Fussbereich mit Kontakt
    var fy = H - 29 * u;
    var fh = 29 * u;
    x.save();
    x.beginPath();
    x.moveTo(0, fy + fh * 0.16);
    x.lineTo(W, fy);
    x.lineTo(W, H);
    x.lineTo(0, H);
    x.closePath();
    x.clip();
    x.fillStyle = cssGradient(x, 0, fy, W, fh, 100, [[0, ORANGE], [0.55, '#FF8A00'], [1, AMBER]]);
    x.fillRect(0, fy, W, fh);
    x.restore();

    var fcy = fy + 7 * u + (29 - 7 - 6.5) / 2 * u;
    var blockH = 5.29 + 0.8 + 4.32 + 0.8 + 3.48;
    var by = fcy / u - blockH / 2;
    x.fillStyle = NAVY;
    x.textAlign = 'left';
    setFont(x, 900, 4.6 * u);
    x.fillText(CTA, 8 * u, (by + 2.645) * u);
    setFont(x, 'bold', 3.6 * u);
    x.fillText(PHONE, 8 * u, (by + 5.29 + 0.8 + 2.16) * u);
    setFont(x, 'bold', 2.9 * u);
    x.save();
    x.globalAlpha = 0.9;
    x.fillText(WEB, 8 * u, (by + 5.29 + 0.8 + 4.32 + 0.8 + 1.74) * u);
    x.restore();

    // Pfeil-Button
    x.beginPath();
    x.arc(86.75 * u, fcy, 5.25 * u, 0, Math.PI * 2);
    x.fillStyle = NAVY;
    x.fill();
    x.save();
    x.translate(86.75 * u - 2.5 * u, fcy - 2.5 * u);
    x.scale(5 * u / 24, 5 * u / 24);
    x.lineWidth = 2.6;
    x.lineCap = 'round';
    x.lineJoin = 'round';
    x.strokeStyle = '#ffffff';
    x.stroke(new Path2D('M5 12h14M12 5l7 7-7 7'));
    x.restore();

    // Farbbalken oben
    x.fillStyle = cssGradient(x, 0, 0, W, 1.8 * u, 90, [[0, ORANGE], [1, AMBER]]);
    x.fillRect(0, 0, W, 1.8 * u);

    // Siegel
    var sr = 12.5 * u;
    x.save();
    x.translate(80.5 * u, 30 * u);
    x.rotate(-10 * Math.PI / 180);
    x.shadowColor = 'rgba(0,0,0,0.28)';
    x.shadowBlur = 3 * u;
    x.shadowOffsetY = 1.5 * u;
    var rg = x.createRadialGradient(-5 * u, -6.25 * u, 0, -5 * u, -6.25 * u, 25.6 * u);
    rg.addColorStop(0, '#FFC24D');
    rg.addColorStop(0.6, AMBER);
    rg.addColorStop(1, '#F58A00');
    x.beginPath();
    x.arc(0, 0, sr, 0, Math.PI * 2);
    x.fillStyle = rg;
    x.fill();
    x.shadowColor = 'transparent';
    x.beginPath();
    x.arc(0, 0, sr - 1.4 * u - 0.4 * u, 0, Math.PI * 2);
    x.setLineDash([1.6 * u, 1.3 * u]);
    x.lineWidth = 0.8 * u;
    x.strokeStyle = NAVY;
    x.stroke();
    x.setLineDash([]);
    var sizes = [7.4, 2.5, 1.7, 1.7];
    var heights = [7, 2.9, 2, 2];
    var cy2 = -13.9 / 2 - 0.8;
    x.fillStyle = NAVY;
    SEAL.forEach(function (part, i) {
      var hh = heights[i];
      var fs = sizes[i];
      var yy = (cy2 + hh / 2) * u;
      if (i === 0) {
        setFont(x, 900, fs * u);
        drawSpaced(x, part, 0, yy, 0, 'center');
      } else if (i === 1) {
        setFont(x, 'bold', fs * u);
        drawSpaced(x, part.toUpperCase(), 0, yy, 0.08 * fs * u, 'center');
      } else {
        setFont(x, 'bold', fs * u);
        drawSpaced(x, part, 0, yy, 0, 'center');
      }
      cy2 += hh;
    });
    x.restore();

    return cv;
  }

  function prepare(f) {
    if (f.blob || f.busy) return;
    f.busy = true;
    logoReady.then(function () {
      try {
        var cv = renderFlyer(f);
        cv.toBlob(function (b) {
          f.busy = false;
          cv.width = 0;
          cv.height = 0;
          if (b) {
            f.blob = b;
            try { f.file = new File([b], 'mservice-' + f.id + '.png', { type: 'image/png' }); } catch (e) { f.file = null; }
          }
        }, 'image/png');
      } catch (e) {
        f.busy = false;
      }
    });
  }

  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    showToast('Foto gespeichert');
  }

  function doSave(f, allowShare) {
    var name = 'mservice-' + f.id + '.png';
    var coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (allowShare && coarse && f.file && navigator.canShare && navigator.canShare({ files: [f.file] })) {
      navigator.share({ files: [f.file], title: f.title }).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        downloadBlob(f.blob, name);
      });
      return;
    }
    downloadBlob(f.blob, name);
  }

  function onSave() {
    var f = flyers[index];
    if (f.blob) {
      doSave(f, true);
      return;
    }
    showToast('Einen Moment bitte …');
    prepare(f);
    var tries = 0;
    var t = setInterval(function () {
      if (f.blob) {
        clearInterval(t);
        doSave(f, false);
      } else if (++tries > 80) {
        clearInterval(t);
        showToast('Speichern nicht möglich');
      }
    }, 100);
  }

  /* ---------- Galerie-Steuerung ---------- */
  // Nur der aktuelle Flyer und seine Nachbarn werden aufgebaut (schlanker, flüssiger)
  function fillSlide(i) {
    var f = flyers[i];
    if (!f || f.filled) return;
    f.slide.firstChild.innerHTML = artHTML(f);
    f.filled = true;
  }

  function emptySlide(i) {
    var f = flyers[i];
    if (!f || !f.filled) return;
    f.slide.firstChild.innerHTML = '';
    f.filled = false;
  }

  function ensureSlides(center) {
    for (var i = 0; i < flyers.length; i++) {
      var d = Math.abs(i - center);
      if (d <= 2) fillSlide(i);
      else if (d > 3) emptySlide(i);
    }
  }

  // Das Foto wird erst vorbereitet, wenn nicht mehr geblättert wird (kein Ruckeln beim Wischen)
  var prepTimer = null;
  var lastNav = 0;

  function schedulePrepare(f) {
    clearTimeout(prepTimer);
    prepTimer = setTimeout(function tick() {
      if (!isOpen || flyers[index] !== f || f.blob || f.busy) return;
      if (drag || Date.now() - lastNav < 1800) {
        prepTimer = setTimeout(tick, 900);
        return;
      }
      var go = function () {
        if (isOpen && flyers[index] === f && !drag) prepare(f);
      };
      if (window.requestIdleCallback) window.requestIdleCallback(go, { timeout: 3000 });
      else go();
    }, 2000);
  }

  function setOffset(dx, animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = 'translate3d(calc(' + (-index * 100) + '% + ' + dx + 'px),0,0)';
  }

  function updateUI(skipHistory) {
    var f = flyers[index];
    counter.textContent = (index + 1) + ' / ' + flyers.length;
    titleEl.textContent = f.title;
    btnPrev.hidden = index === 0;
    btnNext.hidden = index === last;
    cta.setAttribute('href', f.href);
    flyers.forEach(function (x, i) {
      x.slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
    if (isOpen && !skipHistory) {
      try { history.replaceState(history.state, '', '#' + f.id); } catch (e) {}
    }
    schedulePrepare(f);
  }

  function goTo(i, animate, skipHistory) {
    if (i < 0) i = 0;
    if (i > last) i = last;
    lastNav = Date.now();
    ensureSlides(i);
    index = i;
    setOffset(0, animate);
    updateUI(skipHistory);
  }

  function openAt(i, push) {
    buildLightbox();
    lastFocus = document.activeElement;
    isOpen = true;
    lb.style.backgroundColor = '';
    lb.classList.add('open');
    document.documentElement.classList.add('lb-open');
    goTo(i, false, push);
    if (push) {
      try { history.pushState({ flyer: flyers[index].id }, '', '#' + flyers[index].id); pushed = true; } catch (e) {}
    }
    btnClose.focus();
  }

  function closeLb(manual) {
    if (!isOpen) return;
    isOpen = false;
    lb.classList.remove('open');
    lb.style.backgroundColor = '';
    document.documentElement.classList.remove('lb-open');
    if (lastFocus && lastFocus.focus) {
      try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
    }
    if (manual) {
      if (pushed) {
        pushed = false;
        history.back();
      } else if (location.hash) {
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      }
    } else {
      pushed = false;
    }
  }

  function sync() {
    var id = location.hash.replace('#', '');
    var i = -1;
    for (var k = 0; k < flyers.length; k++) {
      if (flyers[k].id === id) { i = k; break; }
    }
    if (i >= 0) {
      if (!isOpen) openAt(i, false);
      else if (i !== index) goTo(i, true, true);
    } else if (isOpen) {
      closeLb(false);
    }
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  // Wischen / Ziehen
  function onPointerDown(e) {
    if (!isOpen) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest && e.target.closest('.lb-nav')) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now(), dx: 0, dy: 0, axis: null, target: e.target };
  }

  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    drag.dy = e.clientY - drag.y;
    if (!drag.axis) {
      if (Math.abs(drag.dx) > 8 || Math.abs(drag.dy) > 8) {
        drag.axis = Math.abs(drag.dx) > Math.abs(drag.dy) ? 'x' : 'y';
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      } else {
        return;
      }
    }
    lastNav = Date.now();
    if (drag.axis === 'x') {
      var dx = drag.dx;
      if ((index === 0 && dx > 0) || (index === last && dx < 0)) dx = dx * 0.35;
      setOffset(dx, false);
    } else if (drag.dy > 0) {
      var dy = drag.dy;
      track.style.transition = 'none';
      track.style.transform = 'translate3d(' + (-index * 100) + '%,' + dy + 'px,0) scale(' + (1 - Math.min(dy / 1200, 0.1)) + ')';
      lb.style.backgroundColor = 'rgba(0,12,36,' + (0.96 * (1 - Math.min(dy / 500, 0.6))) + ')';
    }
  }

  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag;
    drag = null;
    try { stage.releasePointerCapture(e.pointerId); } catch (err) {}
    var w = stage.clientWidth || 1;
    var dt = Math.max(Date.now() - d.t, 1);
    if (d.axis === 'x') {
      var v = d.dx / dt;
      if ((d.dx < -w * 0.18 || v < -0.45) && index < last) goTo(index + 1, true);
      else if ((d.dx > w * 0.18 || v > 0.45) && index > 0) goTo(index - 1, true);
      else setOffset(0, true);
    } else if (d.axis === 'y') {
      if (d.dy > 110 || (d.dy > 40 && d.dy / dt > 0.6)) {
        closeLb(true);
      } else {
        lb.style.backgroundColor = '';
        setOffset(0, true);
      }
    } else if (e.type === 'pointerup') {
      if (d.target.closest && !d.target.closest('.lb-art')) closeLb(true);
    }
  }

  // Tastatur
  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLb(true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(last, true);
    } else if (e.key === 'Tab') {
      var items = Array.prototype.slice.call(lb.querySelectorAll('button, a[href]')).filter(function (el) {
        return !el.hidden && el.offsetParent !== null && getComputedStyle(el).display !== 'none';
      });
      if (!items.length) return;
      var first = items[0];
      var lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      } else if (!lb.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('popstate', sync);
  window.addEventListener('hashchange', sync);

  // Alles mit data-open-flyers öffnet die Galerie (optional: Flyer-ID als Wert)
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-open-flyers]') : null;
    if (!t) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    api.open(t.getAttribute('data-open-flyers') || 0);
  });

  var api = {
    count: FLYERS.length,
    open: function (which) {
      var i = 0;
      if (typeof which === 'string' && isNaN(parseInt(which, 10))) {
        for (var k = 0; k < flyers.length; k++) { if (flyers[k].id === which) { i = k; break; } }
      } else {
        i = parseInt(which, 10) || 0;
      }
      openAt(i, true);
    },
    close: function () { closeLb(true); },
    renderBoard: renderBoard
  };
  window.MSFlyers = api;

  // Direktlink auf einen Flyer (z. B. aktuell#gebaeudereinigung-buero)
  sync();
})();
