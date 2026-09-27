/* ==========================================================================
   Sunbulah School — behaviour
   Arabic (rtl) is the shipped default and renders with no JS at all.
   Adds: language switching, nav, hero slider, counters, FAQ, gallery
   lightbox, scroll reveal, form.
   ========================================================================== */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     1. Language switching
     Every translatable node carries data-ar / data-en. Attributes use
     data-{lang}-placeholder | -label | -aria | -content | -alt.
     Arabic is already in the HTML, so a JS failure degrades to Arabic.
  --------------------------------------------------------------- */
  var STORAGE_KEY = 'sunbulah:lang';
  var langButtons = document.querySelectorAll('[data-lang-toggle]');

  var ATTR_MAP = {
    placeholder: 'placeholder',
    label: 'aria-label',
    aria: 'aria-label',
    content: 'content',
    alt: 'alt'
  };

  function readStoredLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function applyLang(lang) {
    var isAr = lang === 'ar';

    html.setAttribute('lang', lang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-ar]').forEach(function (el) {
      var value = el.getAttribute('data-' + lang);
      if (value === null) return;
      // Preserve markup when the translation carries tags (e.g. the hero accent)
      if (value.indexOf('<') !== -1) { el.innerHTML = value; }
      else { el.textContent = value; }
    });

    Object.keys(ATTR_MAP).forEach(function (key) {
      document.querySelectorAll('[data-ar-' + key + ']').forEach(function (el) {
        var value = el.getAttribute('data-' + lang + '-' + key);
        if (value !== null) el.setAttribute(ATTR_MAP[key], value);
      });
    });

    // Toggle button advertises the language it switches TO
    langButtons.forEach(function (btn) {
      var next = btn.querySelector('[data-lang-next]');
      if (next) next.textContent = isAr ? 'English' : 'العربية';
      btn.setAttribute('aria-pressed', String(!isAr));
      btn.setAttribute('aria-label', isAr ? 'Switch to English' : 'التبديل إلى العربية');
    });

    storeLang(lang);
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(html.getAttribute('lang') === 'ar' ? 'en' : 'ar');
    });
  });

  applyLang(readStoredLang() === 'en' ? 'en' : 'ar');

  /* ---------------------------------------------------------------
     2. Header shadow once scrolled
  --------------------------------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------
     3. Mobile navigation
  --------------------------------------------------------------- */
  var menuBtn = document.querySelector('[data-menu-btn]');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------------------------------------------------------------
     4. Hero slider
     Crossfade, so nothing needs mirroring for RTL. Autoplay pauses on
     hover and on keyboard focus, exposes a manual pause control
     (WCAG 2.2.2), and does not run at all under reduced motion.
  --------------------------------------------------------------- */
  var slider = document.querySelector('[data-slider]');

  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dotsWrap = slider.querySelector('[data-slider-dots]');
    var pauseBtn = slider.querySelector('[data-slider-pause]');
    var index = 0;
    var timer = null;
    var paused = reduced;
    var DELAY = 6500;

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () { go(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === index;
        s.classList.toggle('active', on);
        // Inactive slides are hidden from assistive tech and the tab order
        s.setAttribute('aria-hidden', String(!on));
        s.querySelectorAll('a, button').forEach(function (el) {
          if (on) { el.removeAttribute('tabindex'); }
          else { el.setAttribute('tabindex', '-1'); }
        });
      });
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === index)); });
    }

    function tick() { go(index + 1); }
    function start() { if (!paused && !timer) timer = window.setInterval(tick, DELAY); }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var prev = slider.querySelector('[data-slider-prev]');
    var next = slider.querySelector('[data-slider-next]');
    if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(index + 1); restart(); });

    if (pauseBtn) {
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseBtn.addEventListener('click', function () {
        paused = !paused;
        pauseBtn.setAttribute('aria-pressed', String(paused));
        if (paused) { stop(); } else { start(); }
      });
    }

    // Pause while the pointer or keyboard focus is inside the slider
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', function (e) {
      if (!slider.contains(e.relatedTarget)) start();
    });

    // Arrow keys move between slides when focus is inside the slider
    slider.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var rtl = html.getAttribute('dir') === 'rtl';
      var forward = rtl ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
      go(index + (forward ? 1 : -1));
      restart();
      e.preventDefault();
    });

    // Don't animate in a background tab
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); } else { start(); }
    });

    go(0);
    start();
  }

  /* ---------------------------------------------------------------
     5. Counting numbers
     Counts only when the card scrolls into view, once. Under reduced
     motion the final value is written immediately.
  --------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;

    // Years must not be grouped — "2016", never "2,016".
    var plain = el.hasAttribute('data-count-plain');
    var format = function (n) { return plain ? String(n) : n.toLocaleString('en-US'); };

    if (reduced) { el.textContent = format(target); return; }

    var duration = 1400;
    var startedAt = null;

    function frame(now) {
      if (startedAt === null) startedAt = now;
      var p = Math.min((now - startedAt) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      el.textContent = format(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          countObserver.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------------------------------------------------------------
     6. FAQ accordion
  --------------------------------------------------------------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.classList.toggle('open', !open);
    });
  });

  /* ---------------------------------------------------------------
     7. Gallery lightbox
     Modal dialog semantics, focus trapped while open, focus returned
     to the thumbnail that opened it.
  --------------------------------------------------------------- */
  var lightbox = document.getElementById('lightbox');
  var galItems = Array.prototype.slice.call(document.querySelectorAll('[data-gal]'));

  if (lightbox && galItems.length) {
    var lbImg = lightbox.querySelector('[data-lb-img]');
    var lbCap = lightbox.querySelector('[data-lb-cap]');
    var lbCount = lightbox.querySelector('[data-lb-count]');
    var lbClose = lightbox.querySelector('[data-lb-close]');
    var lbPrev = lightbox.querySelector('[data-lb-prev]');
    var lbNext = lightbox.querySelector('[data-lb-next]');
    var lbIndex = 0;
    var lastFocused = null;

    function show(i) {
      lbIndex = (i + galItems.length) % galItems.length;
      var src = galItems[lbIndex].getAttribute('data-gal');
      var img = galItems[lbIndex].querySelector('img');
      var caption = img ? img.getAttribute('alt') : '';
      if (lbImg) { lbImg.setAttribute('src', src); lbImg.setAttribute('alt', caption || ''); }
      if (lbCap) lbCap.textContent = caption || '';
      if (lbCount) lbCount.textContent = (lbIndex + 1) + ' / ' + galItems.length;
    }

    function openLb(i) {
      lastFocused = document.activeElement;
      show(i);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lbClose) lbClose.focus();
    }

    function closeLb() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    galItems.forEach(function (item, i) {
      item.addEventListener('click', function () { openLb(i); });
    });

    if (lbClose) lbClose.addEventListener('click', closeLb);
    if (lbPrev) lbPrev.addEventListener('click', function () { show(lbIndex - 1); });
    if (lbNext) lbNext.addEventListener('click', function () { show(lbIndex + 1); });

    // Click the backdrop (but not the figure) to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLb();
    });

    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeLb(); return; }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        var rtl = html.getAttribute('dir') === 'rtl';
        var forward = rtl ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
        show(lbIndex + (forward ? 1 : -1));
        e.preventDefault();
        return;
      }

      // Trap Tab inside the dialog
      if (e.key === 'Tab') {
        var focusables = lightbox.querySelectorAll('button');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }

  /* ---------------------------------------------------------------
     8. Escape closes the mobile menu
  --------------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
      if (menuBtn) menuBtn.focus();
    }
  });

  /* ---------------------------------------------------------------
     9. Scroll reveal — fires once, skipped under reduced motion
  --------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        window.setTimeout(function () { el.classList.add('in'); }, i * 60);
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------
     9b. Stacked stage cards
     CSS pins each card (position: sticky). This only scales a card down
     as the next one slides over it. Skipped under reduced motion.
  --------------------------------------------------------------- */
  var stack = document.querySelector('[data-stack]');

  if (stack && !reduced) {
    var slots = Array.prototype.slice.call(stack.querySelectorAll('.stack-slot'));
    var BASE_SCALE = 0.9;
    var SCALE_STEP = 0.025;
    var stackFrame = 0;

    var updateStack = function () {
      stackFrame = 0;
      slots.forEach(function (slot, i) {
        var card = slot.firstElementChild;
        var next = slots[i + 1];
        if (!card) return;
        var p = 0;
        if (next) {
          var pinnedTop = parseFloat(getComputedStyle(next).top) || 0;
          var gap = next.getBoundingClientRect().top - pinnedTop;
          p = Math.min(1, Math.max(0, 1 - gap / (card.offsetHeight || 1)));
        }
        var target = BASE_SCALE + i * SCALE_STEP;
        card.style.transform = 'scale(' + (1 - p * (1 - target)) + ')';
      });
    };

    var requestStack = function () {
      if (!stackFrame) stackFrame = window.requestAnimationFrame(updateStack);
    };

    window.addEventListener('scroll', requestStack, { passive: true });
    window.addEventListener('resize', requestStack);
    updateStack();
  }

  /* ---------------------------------------------------------------
     10. Enquiry form
     No backend is wired up yet. The form validates inline, then hands
     the parent off to WhatsApp with their message prefilled — which is
     how families in Babil actually contact a school.
     See README "Connecting the form" to switch to email/API instead.
  --------------------------------------------------------------- */
  var form = document.getElementById('enquiry-form');

  if (form) {
    var status = document.getElementById('form-status');
    var WHATSAPP_NUMBER = form.getAttribute('data-whatsapp') || '';

    var setInvalid = function (input, invalid) {
      var wrap = input.closest('.field');
      if (wrap) wrap.classList.toggle('invalid', invalid);
      input.setAttribute('aria-invalid', String(invalid));
    };

    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { setInvalid(input, !input.checkValidity()); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') {
          setInvalid(input, !input.checkValidity());
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstBad = null;
      form.querySelectorAll('input, select, textarea').forEach(function (input) {
        var bad = !input.checkValidity();
        setInvalid(input, bad);
        if (bad && !firstBad) firstBad = input;
      });

      if (firstBad) { firstBad.focus(); return; }

      var data = new FormData(form);
      var isAr = html.getAttribute('lang') === 'ar';

      var lines = isAr
        ? ['استفسار عن التسجيل — موقع مؤسسة السنبلة التعليمية',
           'الاسم: ' + (data.get('name') || ''),
           'رقم الهاتف: ' + (data.get('phone') || ''),
           'المرحلة: ' + (data.get('stage') || ''),
           'الرسالة: ' + (data.get('message') || '')]
        : ['Enrolment enquiry — Sunbulah School website',
           'Name: ' + (data.get('name') || ''),
           'Phone: ' + (data.get('phone') || ''),
           'Stage: ' + (data.get('stage') || ''),
           'Message: ' + (data.get('message') || '')];

      if (status) {
        status.textContent = isAr
          ? 'شكراً لك. سنفتح الآن محادثة واتساب لإرسال استفسارك إلى الإدارة.'
          : 'Thank you. We are opening WhatsApp so you can send your enquiry to the office.';
        status.classList.add('show');
      }

      if (WHATSAPP_NUMBER) {
        window.open(
          'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')),
          '_blank',
          'noopener'
        );
      }

      form.reset();
    });
  }

  /* ---------------------------------------------------------------
     11. Footer year
  --------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
