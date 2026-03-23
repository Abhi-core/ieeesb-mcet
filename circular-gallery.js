document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('#reactbits-gallery');
  const images = gallery.querySelectorAll('img');

  // Simple hover tilt effect
  images.forEach(img => {
    img.addEventListener('mousemove', e => {
      const { left, top, width, height } = img.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = ((y / height) - 0.5) * 10;
      const rotateY = ((x / width) - 0.5) * -10;
      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
  });
});
