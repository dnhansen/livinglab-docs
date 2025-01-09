document.addEventListener('DOMContentLoaded', () => {
  const themeSelector = document.querySelector('.theme-selector');
  const root = document.documentElement;
  const imgs = document.querySelectorAll(".toggle");
  const css = document.querySelector("#dark-css");

  function activateTheme(theme) {
    localStorage.setItem('theme', theme);
    themeSelector.value = theme;
    switch (theme) {
      case "light":
        css.media = "not all";
        imgs.forEach((img) => {
          img.data = img.getAttribute('data-light');
        });
        break;
      case "dark":
        css.media = "all";
        imgs.forEach((img) => {
          img.data = img.getAttribute('data-dark');
        });
        break;
      default:
        // auto
        css.media = "(prefers-color-scheme: dark)";
    }
  }

  activateTheme(localStorage.getItem('theme') || "light");

  themeSelector.addEventListener("change", (event) => {
    activateTheme(event.target.value);
  });
});