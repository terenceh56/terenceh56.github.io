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

let initialized = false;

function init() {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // Only attach listeners once per page load
  if (!initialized) {
    // now this script can find and listen for clicks on the control
    const themeBtn = document.querySelector("#theme-btn");
    const themeBtnMobile = document.querySelector("#theme-btn-mobile");
    
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        themeValue = themeValue === "light" ? "dark" : "light";
        setPreference();
      });
    }
    
    if (themeBtnMobile) {
      themeBtnMobile.addEventListener("click", () => {
        themeValue = themeValue === "light" ? "dark" : "light";
        setPreference();
      });
    }
    
    initialized = true;
  }
}

// Initialize on DOM ready (for initial page load)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM is already ready
  init();
}

document.addEventListener('astro:page-load', () => {
  initialized = false; // Reset on page navigation to re-attach listeners
  init();
});

document.addEventListener('astro:after-swap', () => {
  reflectPreference();
});

// sync with system changes
window.matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
