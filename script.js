document.getElementById('menu-btn').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('show');
});

ScrollReveal().reveal('[data-sr]', {
    duration: 1000,
    distance: '50px',
    easing: 'ease-out',
    origin: 'bottom',
    interval: 200
});
