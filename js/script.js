// =========================================================
// PORTFOLIO SITE — MAIN SCRIPT
// =========================================================
// This file wires up all the interactive behaviour for the
// portfolio: theme toggle (with saved preference), a
// time-of-day greeting, a mobile nav menu, smooth-scroll
// active link handling, and basic contact form validation.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setGreeting();
  initThemeToggle();
  initMobileNav();
  initContactForm();
  initProjectFilter();
});

/**
 * Insert the current year into the footer copyright line.
 */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Show a greeting message based on the visitor's local time of day.
 */
function setGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greeting;

  if (hour < 5) {
    greeting = "Burning the midnight oil? 🌙";
  } else if (hour < 12) {
    greeting = "Good morning! ☀️";
  } else if (hour < 18) {
    greeting = "Good afternoon! 👋";
  } else {
    greeting = "Good evening! 🌆";
  }

  greetingEl.textContent = greeting;
}

/**
 * Toggle between light and dark themes and remember the
 * user's choice using localStorage.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  let savedTheme;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch {
    showStorageFeedback();
  }
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply saved theme, or fall back to system preference.
  const initialTheme = ["dark", "light"].includes(savedTheme) ? savedTheme : (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      showStorageFeedback();
    }
  });

  function showStorageFeedback() {
    const feedback = document.getElementById("theme-feedback");
    feedback.textContent = "Theme saving is unavailable. You can still switch themes for this visit.";
    feedback.hidden = false;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

/**
 * Show/hide the mobile navigation menu and close it whenever
 * a link is clicked (useful for single-page smooth scrolling).
 */
function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    setOpen(!navLinks.classList.contains("open"));
  });

  function setOpen(open) {
    navLinks.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      setOpen(false);
      navToggle.focus();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setOpen(false);
    });
  });
}

/**
 * Basic client-side validation for the contact form.
 * No backend is required — on success we simply show a
 * confirmation message and reset the form.
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMessage = document.getElementById("form-success");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const message = form.elements.namedItem("message").value.trim();

    let isValid = true;
    isValid = validateField("name", name.length > 0, "Please enter your name.") && isValid;
    isValid = validateField("email", isValidEmail(email), "Please enter a valid email address.") && isValid;
    isValid = validateField("message", message.length > 0, "Please enter a message.") && isValid;

    if (isValid) {
      successMessage.hidden = false;
      form.reset();

    } else {
      successMessage.hidden = true;
      form.querySelector('[aria-invalid="true"]').focus();
    }
  });

  function validateField(fieldName, condition, errorText) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    if (!errorEl) return condition;

    errorEl.textContent = condition ? "" : errorText;
    form.elements.namedItem(fieldName).setAttribute("aria-invalid", String(!condition));
    return condition;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

/** Category and query must both match; original cards stay in the DOM. */
function initProjectFilter() {
  const controls = document.querySelector(".project-controls");
  const search = document.getElementById("project-search");
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".project-card")];
  let category = "all";
  controls.hidden = false;

  function update() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach((card) => {
      const matches = (category === "all" || card.dataset.category === category)
        && card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) count++;
    });
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
    document.getElementById("project-count").textContent =
      count + (count === 1 ? " project shown" : " projects shown");
    document.getElementById("project-empty").hidden = count > 0;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      update();
    });
  });
  search.addEventListener("input", update);
  update();
}
