document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-selector');
    const root = document.documentElement;
    const imgs = document.querySelectorAll(".toggle");
  
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add("dark");
      imgs.forEach((img) => {
        img.data = img.getAttribute('data-dark');
      });
    }
  
    toggleButton.addEventListener('click', () => {
      root.classList.toggle("dark");
      if (root.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        imgs.forEach((img) => {
          img.data = img.getAttribute('data-dark');
        });
      } else {
        localStorage.setItem('theme', 'light');
        imgs.forEach((img) => {
          img.data = img.getAttribute('data-light');
        });
      }
    });
});
