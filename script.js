document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Theme toggle (persisted, defaults to system preference)
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('themeIconSun');
const moonIcon = document.getElementById('themeIconMoon');

function applyTheme(theme) {
  if (theme) root.setAttribute('data-theme', theme);
  else root.removeAttribute('data-theme');
  const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  sunIcon.style.display = isDark ? 'none' : 'block';
  moonIcon.style.display = isDark ? 'block' : 'none';
}

const stored = localStorage.getItem('phc-landing-theme');
applyTheme(stored);

toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('phc-landing-theme', next);
  applyTheme(next);
});
