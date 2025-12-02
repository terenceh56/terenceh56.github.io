const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue);
}

// set early so no page flashes / CSS is made aware
reflectPreference();

// Store references to event handlers so we can remove them properly
let themeToggleHandler = null;
let themeToggleMobileHandler = null;

function init() {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // Get button elements
  const themeBtn = document.querySelector("#theme-btn");
  const themeBtnMobile = document.querySelector("#theme-btn-mobile");

  // Remove old listeners if they exist (prevents duplicate listeners)
  if (themeBtn && themeToggleHandler) {
    themeBtn.removeEventListener("click", themeToggleHandler);
  }
  if (themeBtnMobile && themeToggleMobileHandler) {
    themeBtnMobile.removeEventListener("click", themeToggleMobileHandler);
  }

  // Create new handler functions
  themeToggleHandler = () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  };

  themeToggleMobileHandler = () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  };

  // Attach new listeners
  if (themeBtn) {
    themeBtn.addEventListener("click", themeToggleHandler);
  }

  if (themeBtnMobile) {
    themeBtnMobile.addEventListener("click", themeToggleMobileHandler);
  }
}

// Initialize on DOM ready (for initial page load)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already ready
  init();
}

// Re-initialize on every page navigation (View Transitions)
document.addEventListener('astro:page-load', init);

document.addEventListener('astro:after-swap', () => {
  reflectPreference();
});

// sync with system changes
window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
