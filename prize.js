// Prize section scroll animations - Simple working version
document.addEventListener('DOMContentLoaded', function() {
  const prizeSection = document.querySelector('.prize-section');
  const prizeCards = document.querySelectorAll('.prize-card');
  
  // Initially show the prizes (remove the hidden state)
  prizeCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  });

  function checkScroll() {
    const sectionTop = prizeSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      // Trigger drop animation
      prizeCards.forEach((card, index) => {
        // Remove any existing animation classes
        card.classList.remove('animate-drop');
        
        // Force reflow
        void card.offsetWidth;
        
        // Add animation class with delay
        setTimeout(() => {
          card.classList.add('animate-drop');
        }, index * 200);
      });
    }
  }
  
  // Check on load
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Interactive hover effects
  prizeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
});