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

// Apply the current theme as early as possible to avoid flashes,
// especially on initial page load and full navigations to articles.
reflectPreference();

function init() {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  const desktopBtn = document.querySelector("#theme-btn");
  const mobileBtn = document.querySelector("#theme-btn-mobile");

  // Use onclick so repeated init calls simply overwrite handlers
  if (desktopBtn) {
    desktopBtn.onclick = () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    };
  }

  if (mobileBtn) {
    mobileBtn.onclick = () => {
      themeValue = themeValue === "light" ? "dark" : "light";
      setPreference();
    };
  }
}

// --- Initialization hooks ---
// 1) Standard page loads (layouts without ClientRouter / transitions)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  // DOM is already ready
  init();
}

// 2) Astro transitions (pages using ClientRouter)
document.addEventListener("astro:page-load", () => {
  init();
});

document.addEventListener("astro:after-swap", () => {
  reflectPreference();
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
