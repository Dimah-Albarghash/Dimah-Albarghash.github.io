/* =========================================================
   Dimah Albarghash — Portfolio
   script.js

   All editable links live in the portfolioLinks object below.
   Update the LinkedIn URL and any project links here — nothing
   else in this file needs to change when you do.
   ========================================================= */

const portfolioLinks = {
  email: "mailto:dimahalbarghash@gmail.com",
  phone: "tel:+966540939105",
  linkedin: "https://www.linkedin.com/in/dimah-albarghash-587035330/",

  projects: {
    bpm: "https://drive.google.com/file/d/1BKBQOTHNAY8_CHvKKdnuyzvly50h97U-/view?usp=share_link",
    ownBakery: "https://drive.google.com/file/d/1KGCBSqz93QB4b1gUlFi2EIq8U-iud7eZ/view?usp=share_link",
    hirak: "https://drive.google.com/file/d/1uXujJ9HGB14qwPJ5scUjE_9EfHPzLkF5/view?usp=share_link",
    hirakWebsite: "https://vr-motion-mimic.lovable.app",
    steam: "https://drive.google.com/file/d/1ruWsE0Xj97GPAgSw6F1E9NKfAFM5gbnl/view?usp=share_link",
    pureRay: "https://drive.google.com/file/d/1a8fyGaWwsZmsxpB0CthmD2psuZIQH2OI/view?usp=share_link",
    pureRayWebsite: "https://pure-ray.lovable.app",
    unemployment: "https://drive.google.com/file/d/1ZzBRHUojHg2FmkEqYoPYECKUqopB03-u/view?usp=share_link",
    peakGym: "https://drive.google.com/file/d/1QjiIhf0Dx5eCm6Owwuj82NYpWOUztzg1/view?usp=share_link",
    erpNext: "https://drive.google.com/file/d/1nNJ8Tcy3_ufv10EJCpEDgqieKGUllYjN/view?usp=share_link",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  assignLinks();
  setupMobileNav();
  setupActiveNavHighlighting();
  setupFooterYear();
});

/**
 * Reads every element with a data-link attribute and points it at the
 * matching URL in portfolioLinks (top-level keys or nested under
 * portfolioLinks.projects).
 */
function assignLinks() {
  const linkElements = document.querySelectorAll("[data-link]");

  linkElements.forEach((el) => {
    const key = el.getAttribute("data-link");
    const url = portfolioLinks[key] || portfolioLinks.projects[key];

    if (!url) return;

    el.setAttribute("href", url);

    // Keep the visible LinkedIn label concise while using the full profile URL.
    if (key === "linkedin") {
      el.textContent = "View LinkedIn Profile";
    }
  });
}

/**
 * Wires up the accessible hamburger menu: toggling open/closed,
 * closing on link click, closing on Escape, and keeping
 * aria-expanded in sync.
 */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll("a[data-nav-link]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // If the viewport grows past the mobile breakpoint while the
  // menu is open, reset its state so it doesn't stay "stuck".
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });
}

/**
 * Highlights the nav link matching the section currently in view.
 */
function setupActiveNavHighlighting() {
  const navLinks = document.querySelectorAll("a[data-nav-link]");
  if (!navLinks.length) return;

  const sectionIds = Array.from(navLinks).map((link) =>
    link.getAttribute("href").replace("#", "")
  );

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active-link", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Keeps the footer year current without hardcoding it, while the
 * markup still contains a static fallback year for no-JS visitors.
 */
function setupFooterYear() {
  const yearEl = document.getElementById("footerYear");
  if (!yearEl) return;

  const currentYear = String(new Date().getFullYear());
  if (yearEl.textContent !== currentYear) {
    yearEl.textContent = currentYear;
  }
}
