/* ==========================================================================
   Sunbulah School — behaviour
   Arabic (rtl) is the shipped default and renders with no JS at all.
   This file only adds: language switching, mobile nav, FAQ, reveal, form.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Language switching
     Every translatable node carries data-ar / data-en. Attributes use
     data-{lang}-placeholder | -label | -aria | -content.
     Arabic is already in the HTML, so a JS failure degrades to Arabic.
  --------------------------------------------------------------- */
  var STORAGE_KEY = 'sunbulah:lang';
  var html = document.documentElement;
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

    // Text nodes
    document.querySelectorAll('[data-ar]').forEach(function (el) {
      var value = el.getAttribute('data-' + lang);
      if (value === null) return;
      // Preserve markup when the translation carries tags (e.g. the hero accent)
      if (value.indexOf('<') !== -1) { el.innerHTML = value; }
      else { el.textContent = value; }
    });

    // Attributes
    Object.keys(ATTR_MAP).forEach(function (key) {
      document.querySelectorAll('[data-ar-' + key + ']').forEach(function (el) {
        var value = el.getAttribute('data-' + lang + '-' + key);
        if (value !== null) el.setAttribute(ATTR_MAP[key], value);
      });
    });

    // Toggle button reflects the language it switches TO
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

  // Restore a previous choice. Arabic needs no work — it is already rendered.
  var saved = readStoredLang();
  if (saved === 'en') { applyLang('en'); }
  else { applyLang('ar'); }

  /* ---------------------------------------------------------------
     2. Mobile navigation
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

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
      if (menuBtn) menuBtn.focus();
    }
  });

  /* ---------------------------------------------------------------
     3. FAQ accordion
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
     4. Scroll reveal — fires once, skipped entirely when the user
        has asked for reduced motion.
  --------------------------------------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
     5. Enquiry form
     No backend is wired up yet. The form validates inline, then hands
     the parent off to WhatsApp with their message prefilled — which is
     how families in Babil actually contact a school.
     See README "Connecting the form" to switch to email//API instead.
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
      // Validate on blur, then live-correct once the field is known bad
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
     6. Footer year
  --------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
