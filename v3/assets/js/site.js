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
    initDownloadGate();
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
      // léger délai pour laisser les polices se charger avant de mesurer
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
  // ---------- Popup de 15s avant téléchargement d'un document ----------
  function initDownloadGate() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('a.dl-btn[href$=".pdf"]')
    );
    if (!links.length) return;

    var GATE_SECONDS = 15;

    var messages = [
      "Un petit boost sur le serveur principal du Site-77 ferait toujours plaisir à toute l'équipe du DAE...",
      "Le Gamepass VIP débloque énormément d'avantages qu'on ne peut malheureusement pas détailler ici.",
      "Pendant que ce document se prépare : non, la Fondation ne surveille pas cette page. Probablement.",
      "Un agent de Classe-D recopie actuellement ce dossier à la main. Merci de saluer son courage.",
      "Vérification en cours que vous n'êtes pas un membre infiltré de l'Insurrection du Chaos.",
      "Ce délai n'existe pour aucune raison opérationnelle valable. C'est purement culturel."
    ];

    var overlay = document.createElement("div");
    overlay.className = "dl-gate";
    overlay.innerHTML =
      '<div class="dl-gate-box">' +
      '<p class="dl-gate-eyebrow">Préparation du document</p>' +
      '<h3 class="dl-gate-file">Document</h3>' +
      '<p class="dl-gate-msg"></p>' +
      '<div class="dl-gate-progress"><div class="dl-gate-progress-fill"></div></div>' +
      '<p class="dl-gate-timer"><span class="dl-gate-count">' + GATE_SECONDS + '</span> s avant le téléchargement</p>' +
      '<button class="dl-gate-close" type="button" disabled>Patiente…</button>' +
      "</div>";
    document.body.appendChild(overlay);

    var fileEl = overlay.querySelector(".dl-gate-file");
    var msgEl = overlay.querySelector(".dl-gate-msg");
    var fillEl = overlay.querySelector(".dl-gate-progress-fill");
    var countEl = overlay.querySelector(".dl-gate-count");
    var closeBtn = overlay.querySelector(".dl-gate-close");

    var timer = null;
    var seconds = GATE_SECONDS;
    var targetUrl = "";
    var targetName = "";

    function pickMessage() {
      return messages[Math.floor(Math.random() * messages.length)];
    }

    function open(url, name, label) {
      targetUrl = url;
      targetName = name;
      fileEl.textContent = label || "Document";
      msgEl.textContent = pickMessage();
      seconds = GATE_SECONDS;
      countEl.textContent = seconds;
      fillEl.style.width = "0%";
      closeBtn.disabled = true;
      closeBtn.textContent = "Patiente…";
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";

      clearInterval(timer);
      timer = setInterval(function () {
        seconds -= 1;
        countEl.textContent = Math.max(seconds, 0);
        fillEl.style.width = ((GATE_SECONDS - seconds) / GATE_SECONDS) * 100 + "%";
        if (seconds <= 0) {
          clearInterval(timer);
          triggerDownload();
        }
      }, 1000);
    }

    function triggerDownload() {
      msgEl.textContent = "C'est prêt. Le téléchargement démarre...";
      closeBtn.disabled = false;
      closeBtn.textContent = "Fermer";
      var a = document.createElement("a");
      a.href = targetUrl;
      a.download = targetName || "";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    function close() {
      clearInterval(timer);
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", function () {
      if (!closeBtn.disabled) close();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay && !closeBtn.disabled) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !closeBtn.disabled) close();
    });

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var url = link.getAttribute("href");
        var name = url.split("/").pop();
        var label = link.textContent.trim();
        open(url, name, label);
      });
    });
  }
})();
