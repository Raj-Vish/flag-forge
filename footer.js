// Footer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add terminal typing effect to titles
    const titles = document.querySelectorAll('.footer-title');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.classList.add('typewriter');
        
        setTimeout(() => {
            title.textContent = text;
            title.style.animation = 'none';
            title.style.borderRight = 'none';
            const cursor = title.querySelector('.terminal-cursor');
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }, 3500);
    });

    // Social media hover enhancements
    const instagramLink = document.querySelector('.social-link.instagram');
    const linkedinLink = document.querySelector('.social-link.linkedin');

    if (instagramLink) {
        instagramLink.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
        });
        
        instagramLink.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 255, 0, 0.1)';
        });
    }

    if (linkedinLink) {
        linkedinLink.addEventListener('mouseenter', function() {
            this.style.background = '#0077b5';
        });
        
        linkedinLink.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 255, 0, 0.1)';
        });
    }
});