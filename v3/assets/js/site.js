// =========================================================
// DAE — SITE-77 · Interactions & animations
// =========================================================
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initProgressBar();
    initNavIndicator();
    initReveal();
    initBackToTop();
    initFilterBar();
    initPlanningLightbox();
  });

  // ---------- Barre de progression de lecture ----------
  function initProgressBar() {
    var bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.innerHTML = '<div class="progress-fill"></div>';
    document.body.prepend(bar);
    var fill = bar.querySelector(".progress-fill");

    function update() {
      var h = document.documentElement;
      var scrollTop = h.scrollTop || document.body.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      var pct = height > 0 ? (scrollTop / height) * 100 : 0;
      fill.style.width = pct + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // ---------- Indicateur glissant de navigation ----------
  function initNavIndicator() {
    var tabsInner = document.querySelector("nav.tabs .tabs-inner");
    if (!tabsInner) return;

    var indicator = document.createElement("span");
    indicator.className = "tabs-indicator";
    tabsInner.appendChild(indicator);

    var links = Array.prototype.slice.call(
      tabsInner.querySelectorAll("a:not(.cta)")
    );
    var activeLink = tabsInner.querySelector("a.active");

    function moveTo(el) {
      if (!el) return;
      indicator.style.left = el.offsetLeft + "px";
      indicator.style.width = el.offsetWidth + "px";
      indicator.classList.add("ready");
    }

    if (activeLink) {
      // léger délai pour laisser les polices se charger 
avant de mesurer
      setTimeout(function () { moveTo(activeLink); }, 60);
    }

    links.forEach(function (link) {
      link.addEventListener("mouseenter", function () { moveTo(link); });
    });
    tabsInner.addEventListener("mouseleave", function () {
      moveTo(activeLink);
    });
    window.addEventListener("resize", function () {
      moveTo(document.activeElement && links.indexOf(document.activeElement) > -1 ? document.activeElement : activeLink);
    });
  }

  // ---------- Révélation au scroll ----------
  function initReveal() {
    // Cartes en grille : on ajoute un léger décalage progressif
    document.querySelectorAll(".grid").forEach(function (grid) {
      Array.prototype.slice.call(grid.children).forEach(function (el, i) {
        el.classList.add("reveal");
        el.style.transitionDelay = Math.min(i * 70, 420) + "ms";
      });
    });

    var singles = document.querySelectorAll(
      "h2, blockquote.formula, .org-figure, .planning-wrap, .hero-line, table, .planning-legend"
    );
    singles.forEach(function (el) { el.classList.add("reveal"); });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- Bouton retour en haut ----------
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Retour en haut de page");
    btn.innerHTML = "↑";

    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 480) btn.classList.add("visible");
      else btn.classList.remove("visible");
    }
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // ---------- Filtres — page Groupes d'intérêt (épuré) ----------
  function initFilterBar() {
    var bar = document.querySelector(".filter-bar");
    if (!bar) return;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll(".filter-btn"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".gdi-card"));
    var grid = cards.length ? cards[0].closest(".grid") : null;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");

        if (grid && !reduceMotion) {
          grid.classList.add("filtering");
          setTimeout(applyFilter, 160);
        } else {
          applyFilter();
        }

        function applyFilter() {
          cards.forEach(function (card) {
            var status = card.getAttribute("data-status");
            var match = filter === "tous" || status === filter;
            card.classList.toggle("gdi-gone", !match);
          });
          if (grid) grid.classList.remove("filtering");
        }
      });
    });
  }

  // ---------- Lightbox — page Planning ----------
  function initPlanningLightbox() {
    var wrap = document.querySelector(".planning-wrap");
    if (!wrap) return;
    var img = wrap.querySelector("img");
    if (!img) return;

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button class="lightbox-close" type="button">Fermer ✕</button>' +
   
   '<img alt="' + (img.getAttribute("alt") || "") + '">';
    document.body.appendChild(lightbox);
    var lbImg = lightbox.querySelector("img");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    function open() {
      lbImg.src = img.src;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    wrap.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }
  // ---------- V4 : téléchargement direct, plus de popup d attente ----------
})();
