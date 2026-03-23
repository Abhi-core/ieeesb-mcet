document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.querySelector('.true-focus');
  const text = textElement.textContent;
  textElement.textContent = '';

  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // replace space with non-breaking space
    span.style.animationDelay = `${i * 0.1}s`;
    textElement.appendChild(span);
  });
});
