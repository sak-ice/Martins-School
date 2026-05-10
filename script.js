/* =============================================
   MARTINS SCHOOL — Main JavaScript
   ============================================= */

/* ---------- Scroll-aware nav shadow ---------- */
(function () {
  var nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", window.scrollY > 10);
    },
    { passive: true },
  );
})();

/* ---------- Mobile nav toggle ---------- */
(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = toggle.classList.toggle("open");
    links.classList.toggle("mobile-open", open);
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.classList.remove("open");
      links.classList.remove("mobile-open");
    });
  });
})();

/* ---------- Tab switcher ---------- */
function switchTab(btn, tabId) {
  var section = btn.closest("section");
  section.querySelectorAll(".tab-btn").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  section.querySelectorAll(".tab-content").forEach(function (t) {
    t.classList.remove("active");
  });
  var panel = document.getElementById(tabId);
  if (panel) panel.classList.add("active");
}

/* ---------- FAQ accordion ---------- */
function toggleFaq(el) {
  var item = el.parentElement;
  var siblings = item.parentElement.querySelectorAll(".faq-item");
  siblings.forEach(function (s) {
    if (s !== item) s.classList.remove("open");
  });
  item.classList.toggle("open");
}

/* ---------- Forms ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var appForm = document.getElementById("application-form");
  if (appForm) {
    appForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast(
        "Application submitted! We'll be in touch within 5 business days.",
      );
      appForm.reset();
    });
  }
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Message sent! Our team will respond within one business day.");
      contactForm.reset();
    });
  }
});

/* ---------- Toast notification ---------- */
function showToast(msg) {
  var existing = document.getElementById("ms-toast");
  if (existing) existing.remove();
  var t = document.createElement("div");
  t.id = "ms-toast";
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1a3c2e",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontSize: "14px",
    zIndex: "9999",
    boxShadow: "0 8px 32px rgba(26,60,46,0.25)",
    maxWidth: "90vw",
    textAlign: "center",
    animation: "fadeIn 0.3s ease",
  });
  document.body.appendChild(t);
  setTimeout(function () {
    t.style.opacity = "0";
    t.style.transition = "opacity 0.4s";
    setTimeout(function () {
      t.remove();
    }, 400);
  }, 4000);
}

/* ---------- Counter animation ---------- */
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || "";
    var start = 0;
    var duration = 1400;
    var step = Math.ceil(target / (duration / 16));
    var timer = setInterval(function () {
      start = Math.min(start + step, target);
      el.textContent = start + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  });
}

/* ---------- Intersection observer for counter ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var statsRow = document.querySelector(".stats-row");
  if (!statsRow) return;
  var triggered = false;
  var obs = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        animateCounters();
      }
    },
    { threshold: 0.3 },
  );
  obs.observe(statsRow);
});
// Search functionality
document
  .getElementById("nav-search-btn")
  .addEventListener("click", function () {
    const query = document.getElementById("nav-search-input").value.trim();
    if (query) {
      const pages = {
        montessori: "montessori.html",
        kindergarten: "montessori.html",
        toddler: "montessori.html",
        secondary: "secondary.html",
        jss: "secondary.html",
        sss: "secondary.html",
        admissions: "admissions.html",
        apply: "admissions.html",
        fees: "admissions.html",
        enroll: "admissions.html",
        about: "about.html",
        history: "about.html",
        news: "news.html",
        events: "news.html",
        contact: "contact.html",
        location: "contact.html",
        address: "contact.html",
        home: "index.html",
        event: "news.html",
        Contact: "contact.html",
        programme: "admissions.html",
        programmes: "admissions.html",
      };

      const lower = query.toLowerCase();
      let found = false;

      for (const [keyword, page] of Object.entries(pages)) {
        if (lower.includes(keyword)) {
          window.location.href = page;
          found = true;
          break;
        }
      }

      if (!found) {
        alert("No results found for: " + query);
      }
    }
  });

// Search on Enter key
document
  .getElementById("nav-search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("nav-search-btn").click();
    }
  });
// Scroll to top button
document.addEventListener("DOMContentLoaded", function () {
  const scrollTop = document.getElementById("scroll-top");
  if (!scrollTop) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  });
});
