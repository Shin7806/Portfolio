(function () {
  var saved;
  try { saved = localStorage.getItem('dhruv-folio-theme'); } catch (_) {}
  var theme = saved === 'light' || saved === 'dark' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var resume = location.pathname.replace(/\/$/, '') === '/resume';
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.route = resume ? 'resume' : 'folio';
  document.documentElement.style.colorScheme = resume ? 'light' : theme;
  document.querySelector('meta[name="theme-color"]').content = resume ? '#F3F1EC' : theme === 'dark' ? '#141417' : '#F5F2ED';
})();
