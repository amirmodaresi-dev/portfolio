const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const sections = document.querySelectorAll(".section-box");

sections.forEach(section => {
    observer.observe(section);
});