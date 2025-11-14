// Timeline Animation with One-Way Scroll
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");
    let hasAnimated = new Set(); // Track animated items

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated.has(entry.target)) {
                    // Add staggered animation with delay based on position
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                        hasAnimated.add(entry.target); // Mark as animated
                    }, 200 * Array.from(timelineItems).indexOf(entry.target));
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // Observe all timeline items
    timelineItems.forEach((item) => {
        observer.observe(item);
    });

    // Add hover effect to price tag
    const priceTag = document.querySelector(".price-tag");
    if (priceTag) {
        priceTag.addEventListener("mouseenter", function () {
            this.style.animation = "pulse 0.8s infinite";
        });

        priceTag.addEventListener("mouseleave", function () {
            this.style.animation = "pulse 2s infinite";
        });
    }
});