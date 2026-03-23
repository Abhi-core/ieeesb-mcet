// Make sure OGL is loaded before this script
// <script src="https://cdn.jsdelivr.net/npm/ogl@0.0.41/dist/ogl.min.js"></script>

(function () {
  const { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } = OGL;

  // Images for the gallery
  const images = [
    'https://picsum.photos/id/1015/600/400',
    'https://picsum.photos/id/1025/600/400',
    'https://picsum.photos/id/1035/600/400',
    'https://picsum.photos/id/1045/600/400',
    'https://picsum.photos/id/1055/600/400',
    'https://picsum.photos/id/1065/600/400'
  ];

  const canvas = document.getElementById('circular-gallery');
  const renderer = new Renderer({ canvas, alpha: true });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl);
  camera.position.z = 5;

  const scene = new Transform();

  const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragment = /* glsl */ `
    precision highp float;
    uniform sampler2D tMap;
    varying vec2 vUv;
    void main() {
      gl_FragColor = texture2D(tMap, vUv);
    }
  `;

  const radius = 3;
  const planeGeometry = new Plane(gl, { width: 1.5, height: 1 });

  images.forEach((src, i) => {
    const texture = new Texture(gl);
    const img = new Image();
    img.onload = () => (texture.image = img);
    img.src = src;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry: planeGeometry, program });
    const angle = (i / images.length) * Math.PI * 2;
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.z = Math.sin(angle) * radius;
    mesh.rotation.y = -angle;
    mesh.setParent(scene);

    // Click detection
    mesh.onClick = () => {
      alert(`Image ${i + 1} clicked!`);
    };
  });

  let rotation = 0;
  let isDragging = false;
  let lastX = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
  });

  window.addEventListener('mouseup', () => (isDragging = false));

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastX;
    lastX = e.clientX;
    rotation += deltaX * 0.005;
  });

  function update() {
    requestAnimationFrame(update);
    scene.rotation.y = rotation;
    renderer.render({ scene, camera });
  }
  update();
})();
