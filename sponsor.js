// Sponsors slider functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add click effect to cards
  const cards = document.querySelectorAll('.sponsor-card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
  });
});