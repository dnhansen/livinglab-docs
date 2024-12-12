document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const img = document.querySelector(".toggle");
  
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add("dark");
      img.data = img.getAttribute('data-dark');
    }
  
    toggleButton.addEventListener('click', () => {
      root.classList.toggle("dark");
      if (root.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        img.data = img.getAttribute('data-dark');
      } else {
        localStorage.setItem('theme', 'light');
        img.data = img.getAttribute('data-light');
      }
    });
});
  