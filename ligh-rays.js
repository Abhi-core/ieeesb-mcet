// Create light rays container
const rays = document.createElement("div");
rays.classList.add("light-rays");
document.body.appendChild(rays);

// Animate rays using JavaScript
let angle = 0;
function animateRays() {
    angle += 0.05; // rotation speed
    rays.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(animateRays);
}
animateRays();
