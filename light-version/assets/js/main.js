/* ==========================================================================
   PLAN WITH Y — Interaction layer
   Lightweight, dependency-free, accessibility-first.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Header scroll state ------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 2. Mobile menu --------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu(); toggle.focus();
      }
    });
  }

  /* ---- 3. Scroll reveal (IntersectionObserver) ------------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- 4. FAQ accordion ------------------------------------------------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    if (!panel) return;
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        panel.style.height = panel.scrollHeight + "px";
        requestAnimationFrame(function () { panel.style.height = "0px"; });
      } else {
        panel.style.height = panel.scrollHeight + "px";
        var clear = function () {
          panel.style.height = "auto";
          panel.removeEventListener("transitionend", clear);
        };
        if (prefersReduced) panel.style.height = "auto";
        else panel.addEventListener("transitionend", clear);
      }
    });
  });

  /* ---- 5. Animated stat counters --------------------------------------- */
  if (!prefersReduced && "IntersectionObserver" in window) {
    var counters = document.querySelectorAll("[data-count]");
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cObs.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ---- 6. Contact form (graceful, client-side validation + success) ---- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var success = document.querySelector("#form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // No backend in this static build — show confirmation state.
      // Wire `action`/`method` (Formspree, Netlify Forms, etc.) to go live.
      form.style.display = "none";
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus();
        success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ---- 7. Newsletter (footer) inline acknowledgement ------------------- */
  document.querySelectorAll(".news-form").forEach(function (nf) {
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = nf.querySelector("input");
      if (input && !input.checkValidity()) { input.reportValidity(); return; }
      nf.innerHTML = '<span style="color:var(--yellow);font-weight:600;">Thanks — you\'re on the list. ☕</span>';
    });
  });

  /* ---- 8. Footer year --------------------------------------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- 9. Subtle pointer parallax on hero orbs ------------------------- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    var orbsWrap = document.querySelector(".hero__orbs");
    if (orbsWrap) {
      var orbs = orbsWrap.querySelectorAll(".orb");
      window.addEventListener("mousemove", function (e) {
        var x = (e.clientX / window.innerWidth - 0.5);
        var y = (e.clientY / window.innerHeight - 0.5);
        orbs.forEach(function (orb, i) {
          var depth = (i + 1) * 14;
          orb.style.transform = "translate(" + (x * depth) + "px," + (y * depth) + "px)";
        });
      }, { passive: true });
    }
  }
})();
