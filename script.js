
// show reveal elements on scroll
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) el.classList.add('show');
  });
}

// count-up for stats
function runCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    if (el.dataset.run) return;
    const target = +el.dataset.target;
    const duration = 2000;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    function tick() {
      start += step;
      if (start >= target) {
        el.textContent = target.toLocaleString();
        el.dataset.run = '1';
      } else {
        el.textContent = start.toLocaleString();
        requestAnimationFrame(tick);
      }
    }
    tick();
  });
}

window.addEventListener('scroll', () => {
  revealOnScroll();
  // trigger counters when stats visible
  const stats = document.querySelector('.stats');
  if (stats) {
    const rect = stats.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) runCounters();
  }
});

// initial check
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  // small delay to allow page-in then reveal
  setTimeout(revealOnScroll, 200);
});
