/* SUDVEE – script.js. Reads window.SUDVEE_CONFIG (config.js) and builds the pages. */
(() => {
  'use strict';
  const C = window.SUDVEE_CONFIG;
  if (!C) return console.error('[SUDVEE] config.js did not load before script.js');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const page = document.body.dataset.page;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mi = (n, s = 20) => `<span class="material-symbols-outlined" style="font-size:${s}px" aria-hidden="true">${n}</span>`;

 const SVG = { // white glyphs - the coloured logo shape behind them comes from style.css (.logo--name)
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2"/>',
    facebook: '<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>',
    youtube: '<path d="M9.2 7v10l8.3-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    x: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
  };
  const svg = k => `<svg class="logo logo--${k}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SVG[k] || ''}</svg>`;

  /* Hide broken images; parent gets a gradient fallback (.no-img) */
  const watchImages = root => $$('img', root).forEach(i =>
    i.addEventListener('error', () => { i.hidden = true; i.parentElement.classList.add('no-img'); }));

  /* ---------- Shared layout: header, drawer, footer ---------- */
  //  const brandHTML = () => `<a class="brand" href="index.html" aria-label="${esc(C.brand.name)} home">
  //   ${C.brand.logo ? `<div class="brand-logo"><img src="${esc(C.brand.logo)}" alt=""></div>` : ''}
  //   <span>${esc(C.brand.name)}</span>
  //  </a>`;

  const brandHTML = () => `<a class="brand" href="index.html" aria-label="${esc(C.brand.name)} home">
    ${C.brand.logo ? `<div class="brand-logo"><img src="${esc(C.brand.logo)}" alt=""></div>` : ''}
    ${C.brand.tagline ? `<img src="${esc(C.brand.tagline)}" alt="" class="brand-tagline">` : ''}
    
  </a>`;

    const footerBrandHTML = () => {
    const own = C.brand.footerLogo, src = own || C.brand.logo;
    return `<a class="brand" href="index.html" aria-label="${esc(C.brand.name)} home">
      ${src ? `<div class="brand-logo footer-logo${own ? ' footer-logo--own' : ''}"><img src="${esc(src)}" alt=""></div>` : ''}
    </a>`;
  };

  const navLinks = () => C.navigation.map(n =>
    `<a href="${esc(n.href)}"${n.page === page ? ' class="active" aria-current="page"' : ''}>${esc(n.label)}</a>`).join('');
  const socialIcons = () => `<div class="socials">${C.social.map(s =>
    `<a href="${esc(s.url)}" aria-label="${esc(s.name)}" target="_blank" rel="noopener">${svg(s.icon)}</a>`).join('')}</div>`;

  function renderLayout() {
    const b = C.contactButton, c = C.contact, l = C.legal;

    $('#site-header').innerHTML = `<div class="container">
      ${brandHTML()}
      <nav class="nav" aria-label="Primary">${navLinks()}</nav>
      <div class="actions">
        ${b ? `<a class="btn btn--dark btn--sm btn--contact" href="${esc(b.href)}">${esc(b.label)}</a>` : ''}
        <button class="menu-btn" type="button" aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${mi('menu', 26)}</button>
      </div>
    </div>`;

    $('#site-header').insertAdjacentHTML('afterend', `
      <div class="backdrop" id="backdrop"></div>
      <aside class="drawer" id="drawer" aria-label="Mobile navigation" aria-hidden="true">
        <div class="drawer-top">
          ${brandHTML()}
          <button class="drawer-close menu-btn" type="button" aria-label="Close menu">${mi('close', 26)}</button>
        </div>
        <nav aria-label="Mobile">${navLinks()}</nav>
        <div class="drawer-foot t-body-sm">
          ${b ? `<a class="btn btn--dark" href="${esc(b.href)}">${esc(b.label)}</a>` : ''}
          <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>
          ${String(c.phone).split(/[\n,]+/).map(s => s.trim()).filter(Boolean).map(p => `<a href="tel:${esc(p.replace(/[^\d+]/g, ''))}">${esc(p)}</a>`).join('')}
          ${socialIcons()}
        </div>
      </aside>
    `);

    $('#site-footer').innerHTML = `<div class="container">
        <div class="footer-top">${footerBrandHTML()}</div>
        <div class="footer-grid">
          <div><h3 class="t-label-md">${mi('eco', 20)}Explore</h3><ul class="t-body-sm">${C.footerLinks.map(f => `<li><a href="${esc(f.href)}">${esc(f.label)}</a></li>`).join('')}</ul></div>
          <div><h3 class="t-label-md">${mi('group', 20)}Follow Us</h3><ul class="t-body-sm">${C.social.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul></div>
          <div id="contact"><h3 class="t-label-md">${mi('headset_mic', 20)}Contact</h3><ul class="t-body-sm">
            <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
                        <li>${String(c.phone).split(/[\n,]+/).map(s => s.trim()).filter(Boolean).map(p => `<a href="tel:${esc(p.replace(/[^\d+]/g, ''))}">${esc(p)}</a>`).join('<br>')}</li>
            <li class="addr">${mi('location_on', 18)}<span>${esc(c.address)}</span></li></ul></div>
        </div></div>
        <div class="legal"><div class="container t-body-sm">
  ${socialIcons()}
  <span>© ${new Date().getFullYear()} ${esc(C.brand.name)}. ${esc(l.text)}</span>
  <span>Developed by ${l.developerUrl ? `<a href="${esc(l.developerUrl)}" target="_blank" rel="noopener">${esc(l.developer)}</a>` : esc(l.developer)}</span></div></div>`;
      
    watchImages(document);
  }
  

  function initMenu() {
    const drawer = $('#drawer'), back = $('#backdrop'), btn = $('.menu-btn');
    const set = open => {
      drawer.classList.toggle('open', open); back.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open)); btn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      (open ? $('.drawer-close') : btn).focus();
    };
    btn.addEventListener('click', () => set(true));
    back.addEventListener('click', () => set(false));
    $('.drawer-close').addEventListener('click', () => set(false));
    $$('nav a', drawer).forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => e.key === 'Escape' && drawer.classList.contains('open') && set(false));
    matchMedia('(min-width:1024px)').addEventListener('change', e => e.matches && drawer.classList.contains('open') && set(false));
    const header = $('#site-header');
    addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });
  }

  /* ---------- Hero slider ---------- */
  function initHero() {
    const root = $('#hero'); if (!root) return;
    const cfg = C.hero, slides = cfg.slides.slice(0, cfg.slideCount ?? cfg.slides.length), total = slides.length;
    $('#hero-slides').innerHTML = slides.map((s, i) => {
      const H = i === 0 ? 'h1' : 'h2';
      return `<article class="slide" aria-roledescription="slide" aria-label="${i + 1} of ${total}">
  <div class="slide-media">
        <picture>
      ${s.mobileImage ? `<source media="(max-width:767px)" srcset="${esc(s.mobileImage)}">` : ''}
      <img src="${esc(s.image)}" alt="${esc(s.alt)}"${i ? ' loading="lazy"' : ' fetchpriority="high"'}>
    </picture>
  </div>
  </article>`;
      // return `<article class="slide" aria-roledescription="slide" aria-label="${i + 1} of ${total}">
      //   <div class="slide-media"><img src="${esc(s.image)}" alt="${esc(s.alt)}"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></div>
      //   <div class="container slide-body"><div class="copy">
      //     <span class="badge t-label-sm"><i></i>${esc(s.badge)}</span>
      //     <${H} class="t-display">${esc(s.title)}</${H}>
      //     <p class="t-body-lg">${esc(s.subtitle)}</p>
      //     <div class="row"><a class="btn btn--gold" href="${esc(s.cta1.href)}">${esc(s.cta1.label)}</a><a class="btn btn--glass" href="${esc(s.cta2.href)}">${esc(s.cta2.label)}</a></div>
      //     <small>${esc(s.notes)}</small></div></div></article>`;
    }).join('');
    // $('#hero-dots').innerHTML = slides.map((_, i) =>
    //   `<button class="dot" aria-label="Go to slide ${i + 1}">${pad(i + 1)}<span class="track"><span class="bar"></span></span></button>`).join('');
    // watchImages(root);

    $('#hero-dots').innerHTML = slides.map((_, i) =>`<button class="dot" aria-label="Go to slide ${i + 1}"></button>`).join('');
    watchImages(root);

    const els = $$('.slide', root), dots = $$('.dot', root);
    let cur = 0;
    const go = i => {
      cur = (i + total) % total;
      els.forEach((el, k) => { el.classList.toggle('on', k === cur); el.setAttribute('aria-hidden', String(k !== cur)); });
      dots.forEach((d, k) => { d.classList.toggle('on', k === cur); k === cur ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current'); });
    };
    go(0);
    if (total < 2) { $('.hero-ctl').hidden = true; return; }

    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(cur - 1); if (e.key === 'ArrowRight') go(cur + 1); });

    /* Autoplay is driven by the progress-bar CSS animation, so pausing stays in sync */
    // const auto = cfg.autoplay !== false && !reduceMotion;
    // root.style.setProperty('--ms', (cfg.intervalMs || 5500) + 'ms');
    // root.classList.toggle('static', !auto);
    // $('#hero-dots').addEventListener('animationend', e => { if (auto && e.animationName === 'fill') go(cur + 1); });

    // const auto = cfg.autoplay !== false && !reduceMotion;
    

    const auto = true;
    const interval = 5000;

setInterval(() => {
  go(cur + 1);
}, interval);

    const holds = new Set();
    const hold = (k, on) => { on ? holds.add(k) : holds.delete(k); root.classList.toggle('paused', holds.size > 0); };
    root.addEventListener('pointerenter', e => e.pointerType === 'mouse' && hold('hover', true));
    root.addEventListener('pointerleave', () => hold('hover', false));
    root.addEventListener('focusin', () => hold('focus', true));
    root.addEventListener('focusout', () => hold('focus', false));
    new IntersectionObserver(([e]) => hold('offscreen', !e.isIntersecting)).observe(root);
    document.addEventListener('visibilitychange', () => hold('hidden', document.hidden));

    /* Touch swipe */
    let x0 = 0, y0 = 0;
    root.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY; hold('touch', true); }, { passive: true });
    root.addEventListener('touchend', e => {
      hold('touch', false);
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? cur + 1 : cur - 1);
    }, { passive: true });
  }

  /* ---------- Static sections ---------- */
  function initPillars() {
    const el = $('#pillars'); if (!el) return;
    el.innerHTML = C.pillars.map(p => `<div class="pillar"><div class="ico">${mi(p.icon, 22)}</div>
      <h3 class="t-title-lg">${esc(p.title)}</h3><p class="t-body-md">${esc(p.text)}</p></div>`).join('');
  }

  // function initBanner() {
  //   const el = $('#feature-banner'), b = C.featureBanner; if (!el) return;
  //   if (!b || !b.image) return el.remove();
  //   el.innerHTML = `<img src="${esc(b.image)}" alt="${esc(b.alt)}" loading="lazy">
  //     <div class="container cap reveal"><span class="eyebrow eyebrow--light t-label-md">${esc(b.eyebrow)}</span><h2 class="t-headline-lg">${esc(b.title)}</h2></div>`;
  //   watchImages(el);
  // }
  
  function initBanner() {
    initFeatureSlider('#feature-banner', C.featureBanner, 'right');
    initFeatureSlider('#feature-banner-2', C.featureBanner2, 'left');
}

function initFeatureSlider(selector, config, direction) {
    const el = $(selector);

    if (!el || !config || !config.slides?.length) {
        if (el) el.remove();
        return;
    }

    const slides = config.slides.slice(0, 2);

    el.innerHTML = slides.map((s, i) => `
        <article class="feature-slide ${i === 0 ? 'active' : ''}">
            <img
                src="${esc(s.image)}"
                alt="${esc(s.alt)}"
                ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
            >
            <div class="container cap">
                <span class="eyebrow eyebrow--light t-label-md">
                    ${esc(s.eyebrow || '')}
                </span>
                <h2 class="t-headline-lg">${esc(s.title || '')}</h2>
            </div>
        </article>
    `).join('');

    const items = $$('.feature-slide', el);
    let current = 0;
    let timer;

    function go(next) {
        const previous = current;
        current = (next + slides.length) % slides.length;

        items.forEach(item => {
            item.classList.remove('active', 'exit-left', 'exit-right');
        });

        items[previous].classList.add(
            direction === 'right' ? 'exit-left' : 'exit-right'
        );

        items[current].classList.add('active');

        clearTimeout(timer);
        timer = setTimeout(() => {
            items[previous].classList.remove('exit-left', 'exit-right');
        }, 850);
    }

    watchImages(el);

    if (config.autoplay !== false && slides.length > 1) {
        setInterval(() => {
            go(current + 1);
        }, config.intervalMs || 5000);
    }
}
initBanner();


  function initBanner2() {
    const el = $('#feature-banner-2');
    const b = C.featureBanner2;

    if (!el || !b || !b.slides?.length) {
        if (el) el.remove();
        return;
    }

    const slides = b.slides.slice(0, 2);

    el.innerHTML = slides.map((s, i) => `
        <article class="dual-slide ${i === 0 ? 'active' : ''}">
            <img src="${esc(s.image)}" alt="${esc(s.alt)}" loading="lazy">
            <div class="container cap">
                <span class="eyebrow eyebrow--light t-label-md">
                    ${esc(s.eyebrow)}
                </span>
                <h2 class="t-headline-lg">${esc(s.title)}</h2>
            </div>
        </article>
    `).join('');

    const items = $$('.dual-slide', el);
    let current = 0;

    const go = (next) => {
        const previous = current;
        current = (next + slides.length) % slides.length;

        items[previous].classList.remove('active');
        items[previous].classList.add('exit-left');

        items[current].classList.remove('exit-left');
        items[current].classList.add('active');

        setTimeout(() => {
            items[previous].classList.remove('exit-left');
        }, 800);
    };

    if (b.autoplay && slides.length > 1) {
        setInterval(() => go(current + 1), b.intervalMs || 5000);
    }

    watchImages(el);
}
    initBanner2();

  /* ---------- Products ---------- */

   const productCard = (p, mode) => {
  const n = C.products.indexOf(p) + 1;
  if (mode === 'home') return `<a class="card" href="products.html#product-${n}" aria-label="View product: ${esc(p.title)}"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy"><div class="home-recipe-cap"><h3 class="t-headline-sm">${esc(p.title)}</h3><span class="home-recipe-link">View Product ${mi('arrow_right_alt', 22)}</span></div></a>`;
  return `<article class="card" id="product-${n}"><div>
  <div class="card-top"><span class="t-label-sm">${esc(p.category)}</span><span class="chip">${esc(p.tag)}</span></div>
  <div class="card-img"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy"></div>
  <span class="t-label-sm size">${esc(p.size)}</span>
  <h3 class="t-title-md">${esc(p.title)}</h3><p class="t-body-sm">${esc(p.notes)}</p></div>
</article>`;
 };


 
  function initArrivals() {
    const sc = $('#arrivals'); if (!sc) return;
    const items = C.products.filter(p => p.newArrival);
    sc.innerHTML = items.map(p => productCard(p, 'home')).join('');
    const speed = reduceMotion ? 0 : (C.arrivalsSpeed ?? 30);       // px per second, 0 = no auto-move
    const gap = () => parseFloat(getComputedStyle(sc).columnGap) || 0;
    const step = () => { const c = sc.firstElementChild; return c ? c.offsetWidth + gap() : 300; };
    let idleUntil = 0;
 
    /* Desktop arrows: move one card */
    // const nudge = dir => { sc.scrollBy({ left: dir * step(), behavior: reduceMotion ? 'auto' : 'smooth' }); idleUntil = performance.now() + 2500; };
    // $('#arr-prev').addEventListener('click', () => nudge(-1));
    // $('#arr-next').addEventListener('click', () => nudge(1));
 
    /* Continuous slow loop: cards are repeated so it never runs out */
    if (speed > 0 && sc.scrollWidth > sc.clientWidth + gap()) {
      const originals = [...sc.children];
      for (let k = 0; k < 2; k++) originals.forEach(c => {
        const n = c.cloneNode(true); n.setAttribute('aria-hidden', 'true');
        $$('a,button', n).forEach(a => a.tabIndex = -1); sc.appendChild(n);
      });
      let loopW = 0, pos = 0, last = 0, prevT = 0, visible = true;
      const holds = new Set();
      const measure = () => {
        loopW = sc.children[originals.length].offsetLeft - sc.children[0].offsetLeft;
        pos = Math.min(Math.max(pos, loopW), 2 * loopW - 1); sc.scrollLeft = pos; last = sc.scrollLeft;
      };
      measure();
      addEventListener('resize', measure);
 
      const tick = t => {
        const dt = Math.min(t - (prevT || t), 50); prevT = t;
        let changed = false;
        if (Math.abs(sc.scrollLeft - last) > 1.5) { pos = sc.scrollLeft; idleUntil = t + 1500; }   // user / arrow moved it
        else if (!holds.size && visible && t > idleUntil) { pos += speed * dt / 1000; changed = true; }
        if (pos >= 2 * loopW) { pos -= loopW; changed = true; } else if (pos < loopW) { pos += loopW; changed = true; }
        if (changed) sc.scrollLeft = pos;
        last = sc.scrollLeft;
        requestAnimationFrame(tick);
      };
      const hold = (k, on) => on ? holds.add(k) : holds.delete(k);
      sc.addEventListener('focusin', e => { if (e.target.matches(':focus-visible')) hold('focus', true); });
      sc.addEventListener('focusout', () => hold('focus', false));
      sc.addEventListener('touchstart', () => hold('touch', true), { passive: true });
      sc.addEventListener('touchend', () => { hold('touch', false); idleUntil = performance.now() + 1500; }, { passive: true });
      sc.addEventListener('touchcancel', () => hold('touch', false), { passive: true });
      addEventListener('pageshow', () => { holds.clear(); idleUntil = 0; });
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(sc);
      requestAnimationFrame(tick);
    }
    watchImages(sc);
  }
 
  function initProductsPage() {
    const g = $('#products-grid'); if (!g) return;
    g.innerHTML = C.products.map(productCard).join(''); watchImages(g);
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView({ block: 'center' }); }
  }

  /* ---------- Home recipes ---------- */
function initRecipes() {
  const wrap = $('#home-recipes'); if (!wrap) return;
  const cfg = C.homeRecipes || {};
  const items = C.recipes
    .map((r, i) => ({ r, i }))
    .filter(x => x.r.showOnHome)
    .slice(0, cfg.limit ?? 3);
  if (!items.length) { $('#recipes').remove(); return; }
  const mLimit = cfg.mobileLimit ?? 2;

  $('#rh-eyebrow').textContent = cfg.eyebrow || 'Slow Culinary Rituals';
  $('#rh-title').innerHTML = `${esc(cfg.title || 'Signature Recipes')}${cfg.accent ? ` <em>${esc(cfg.accent)}</em>` : ''}`;
  $('#rh-text').textContent = cfg.text || '';

  wrap.innerHTML = items.map(({ r, i }, k) => `<a class="home-recipe${k >= mLimit ? ' m-hide' : ''}" style="--n:${k + 1}" href="recipes.html#recipe-${i + 1}" aria-label="View recipe: ${esc(r.title)}">
    <img src="${esc(r.image)}" alt="${esc(r.title)}" loading="lazy">
    <div class="home-recipe-cap">
      <h3 class="t-headline-sm">${esc(r.title)}</h3>
      <span class="home-recipe-link">View Recipe ${mi('arrow_right_alt', 22)}</span>
    </div></a>`).join('');

  /* 01 / 02 / 03 indicator (desktop) */
  const idx = $('#recipe-index');
  idx.innerHTML = items.map((_, k) =>
    `<li><button type="button" class="${k === 0 ? 'on' : ''}" aria-label="Go to recipe ${k + 1}">${pad(k + 1)}</button></li>`).join('');
  const cards = $$('.home-recipe', wrap), nums = $$('button', idx);
  const setOn = k => nums.forEach((b, j) => b.classList.toggle('on', j === k));
  nums.forEach((b, k) => b.addEventListener('click', () =>
    cards[k].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setOn(cards.indexOf(e.target));
    }), { rootMargin: '-45% 0px -45% 0px' });
    cards.forEach(c => io.observe(c));
  }
  watchImages(wrap);
}
  /* ---------- Recipes Page ---------- */
    /* ---------- Recipes Page ---------- */
function initRecipesPage() {
  const grid = $('#recipes-grid');
  const detail = $('#recipe-detail');
  if (!grid || !detail) return;

  const recipes = C.recipes || [];
  const rp = C.recipesPage || {};
  const baseTitle = document.title;

  /* hero banner image */
  const banner = C.recipeBanner;
  if (banner) {
    const hero = $('.page-hero');
    if (hero) {
      hero.style.backgroundImage =
        `linear-gradient(rgba(4, 34, 23, 0.45), rgba(4, 34, 23, 0.55)), url("${banner.image}")`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }
  }

  /* helpers - lists can be an array, or text with one item per line */
  const list = v => Array.isArray(v) ? v.filter(Boolean) : String(v || '').split('\n').map(s => s.trim()).filter(Boolean);
  const stepText = s => typeof s === 'string' ? s : (s.text || s.instruction || '');
  const cardTime = r => r.time || r.total || r.prep || '';
  const groups = r => (r.ingredientGroups && r.ingredientGroups.length)
    ? r.ingredientGroups.map(g => ({ title: g.title, items: list(g.items) }))
    : [{ title: 'Ingredients', items: list(r.ingredients) }];

  /* one recipe card (used in the list and in "More Recipes") */
  const cardHTML = (r, i) => `
    <article class="rc">
      <a class="rc-img" href="#recipe-${i + 1}" aria-label="${esc(r.title)}">
        <img src="${esc(r.image)}" alt="${esc(r.title)}" loading="lazy">
      </a>
      <div class="rc-body">
        <h2 class="rc-title"><a href="#recipe-${i + 1}">${esc(r.title)}</a></h2>
        ${cardTime(r) ? `<p class="rc-time">${mi('schedule', 16)}${esc(cardTime(r))}</p>` : ''}
        <a class="rc-btn" href="#recipe-${i + 1}">View Recipe</a>
      </div>
    </article>`;

  /* ----- list page ----- */
  grid.innerHTML = `
    <div class="rl-head">
      ${rp.eyebrow ? `<span class="eyebrow t-label-md">${esc(rp.eyebrow)}</span>` : ''}
      <h2 class="rl-title">${esc(rp.title || 'Hot Meals, Cool Kitchen')}</h2>
    </div>
    <div class="rc-grid">${recipes.map(cardHTML).join('')}</div>`;
  watchImages(grid);

  /* ----- detail page ----- */
  const box = (icon, label, val) => val
    ? `<div class="rd-box">${mi(icon, 22)}<span><b>${label}:</b> ${esc(val)}</span></div>` : '';

  function detailHTML(r, idx) {
    const facts = [['Servings', r.servings], ['Diet', r.diet], ['Cuisine', r.cuisine]].filter(f => f[1]);
    const steps = list(r.steps || r.instructions).map(stepText).filter(Boolean);
    const others = recipes.map((_, i) => i).filter(i => i !== idx);
    const more = [...others.filter(i => i > idx), ...others.filter(i => i < idx)].slice(0, 3);

    return `
        <section class="section rd-top">
        <div class="container">
          <div class="rd-hero">
            <div class="rd-photo"><img src="${esc(r.image)}" alt="${esc(r.title)}"></div>
            <div class="rd-info">
              <h1 class="rd-title">${esc(r.title)}</h1>
              ${(r.description || r.headline) ? `<p class="rd-desc">${esc(r.description || r.headline)}</p>` : ''}
              <div class="rd-boxes">
                ${box('timer', 'Prep Time', r.prep)}
                ${box('skillet', 'Cook Time', r.cook)}
                ${box('schedule', 'Total Time', r.total)}
              </div>
              ${facts.length ? `<dl class="rd-facts">${facts.map(f => `<div><dt>${f[0]}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>` : ''}
            </div>
          </div>
        </div>
      </section>

      <section class="rd-band">
        <div class="container">
          <div class="rd-cols">
            ${groups(r).map(g => `
              <div>
                <h2>${esc(g.title)}</h2>
                <ul>${g.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>
              </div>`).join('')}
          </div>
        </div>
      </section>

      ${steps.length ? `
      <section class="section rd-steps">
        <div class="container">
          <h2 class="rl-title">Instructions</h2>
          <ol class="rd-list">${steps.map(s => `<li><span>${esc(s)}</span></li>`).join('')}</ol>
        </div>
      </section>` : ''}

      ${more.length ? `
      <section class="section section--low rd-more">
        <div class="container">
          <h2 class="rl-title">More Recipes Like This</h2>
          <div class="rc-grid">${more.map(i => cardHTML(recipes[i], i)).join('')}</div>
        </div>
      </section>` : ''}`;
  }

  /* ----- show list or detail depending on the URL (#recipe-2 etc.) ----- */
  const indexFromHash = () => {
    const m = location.hash.match(/^#recipe-(\d+)$/);
    const i = m ? Number(m[1]) - 1 : -1;
    return recipes[i] ? i : -1;
  };

  function render() {
    const i = indexFromHash();
    document.body.classList.toggle('recipe-open', i >= 0);
    if (i >= 0) {
      detail.innerHTML = detailHTML(recipes[i], i);
      detail.hidden = false;
      watchImages(detail);
      document.title = `${recipes[i].title} | SUDVEE`;
    } else {
      detail.hidden = true;
      detail.innerHTML = '';
      document.title = baseTitle;
    }
    window.scrollTo(0, 0);
  }

  addEventListener('hashchange', render);
  render();
}


/* ---------- About + stats (home) ---------- */
  function initAboutStats() {
    const el = $('#about-stats'); if (!el) return;
    const a = C.aboutStats; if (!a) return el.remove();
    const stats = a.stats || [];
    el.innerHTML = `<div class="container about-grid reveal">
      <div class="about-head stack">
        <span class="eyebrow t-label-md">${esc(a.eyebrow)}</span>
        <h2 class="about-title">${esc(a.title)}${a.accent ? ` <em>${esc(a.accent)}</em>` : ''}</h2>
        <p class="t-body-md muted">${esc(a.text)}</p>
      </div>
      <div class="about-media">
        <div class="about-video"><video muted loop playsinline preload="metadata" aria-label="${esc(a.eyebrow)}"></video></div>
        ${a.caption ? `<p class="t-body-sm muted about-cap">${esc(a.caption)}</p>` : ''}
        ${a.link ? `<a class="about-more" href="${esc(a.link.href)}">${esc(a.link.label)} ${mi('arrow_right_alt', 22)}</a>` : ''}
      </div>
      <div class="about-stats">${stats.map(s => `<div class="stat">
        <div class="stat-num">${esc(s.value)}${s.suffix ? `<sup>${esc(s.suffix)}</sup>` : ''}</div>
        <p class="t-body-sm stat-label">${esc(s.label)}</p></div>`).join('')}</div>
      <div class="about-dots">${stats.map((_, i) => `<button type="button" class="adot${i ? '' : ' on'}" aria-label="Go to stat ${i + 1}"></button>`).join('')}</div>
    </div>`;

    /* Video: one file loaded at a time - phone video on small screens, computer video otherwise */
    const v = $('video', el), vc = a.video || {}, mq = matchMedia('(max-width:767px)');
    let seen = false;
    const setVideo = () => {
      const src = mq.matches ? (vc.mobile || vc.desktop) : (vc.desktop || vc.mobile);
      const poster = mq.matches ? (vc.mobilePoster || vc.poster) : (vc.poster || vc.mobilePoster);
      if (!src || v.getAttribute('src') === src) return;
      if (poster) v.poster = poster;
      v.setAttribute('src', src); v.muted = true;
      if (reduceMotion) v.controls = true; else if (seen) v.play().catch(() => {});
    };
    setVideo(); mq.addEventListener('change', setVideo);
    v.addEventListener('error', () => v.parentElement.classList.add('no-img'));
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      if (reduceMotion) return;
      seen ? v.play().catch(() => {}) : v.pause();
    }).observe(v);

    /* Phone: stat cards swipe sideways, dots follow */
    const list = $('.about-stats', el), cards = $$('.stat', list), dots = $$('.adot', el);
    if (cards.length < 2) return;
    const stepW = () => cards[0].offsetWidth + (parseFloat(getComputedStyle(list).columnGap) || 0);
    list.addEventListener('scroll', () => {
      const i = Math.round(list.scrollLeft / stepW());
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    }, { passive: true });
    dots.forEach((d, k) => d.addEventListener('click', () =>
      list.scrollTo({ left: k * stepW(), behavior: reduceMotion ? 'auto' : 'smooth' })));
  }



  /* ---------- Scroll reveal (repeatable) ----------
     Every time a .reveal block enters the viewport the animation plays again,
     and it is reset when the block fully leaves, so it replays on every pass
     (scrolling down OR back up). Two observers give hysteresis, so there is
     no flicker at the edge and tall sections still trigger reliably. */
  function initReveal() {
    const els = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));

    // ENTER: play when the block has crossed ~12% above the bottom edge of the screen
    const enter = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    }), { threshold: 0, rootMargin: '0px 0px -12% 0px' });

    // EXIT: reset only once the block is completely out of the viewport
    const exit = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) e.target.classList.remove('in');
    }), { threshold: 0, rootMargin: '0px' });

    els.forEach(e => { enter.observe(e); exit.observe(e); });
  }

  /* ---------- Boot ---------- */
  renderLayout(); initMenu();
  if (page === 'home') { initHero(); initPillars(); initBanner(); initAboutStats(); initArrivals(); initRecipes(); }
 
  if (page === 'products') initProductsPage();
 if (page === 'recipes') initRecipesPage();
  initReveal();
})();