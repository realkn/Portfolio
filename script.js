document.addEventListener("DOMContentLoaded", () => {
    const fadeElems = document.querySelectorAll(".fade-in");

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeElems.forEach(elem => {
        appearOnScroll.observe(elem);
    });
});
