// Variables
let images = [];
const cube = document.getElementById('cube');

// Initialize from localStorage
function initGallery() {
  const saved = JSON.parse(localStorage.getItem('cubeGallery')) || [];
  saved.forEach(img => addImageToCube(img));
  hideLoader();  // ✅ hide loader after initializing saved images
}

// Add image to cube
function addImageToCube(imgData) {
  const face = document.createElement('div');
  face.className = 'cube-face';
  face.style.backgroundImage = `url(${imgData})`;

  const faceCount = images.length;
  const angle = faceCount * 90;
  face.style.transform = `rotateY(${angle}deg) translateZ(100px)`;

  cube.appendChild(face);
  images.push(face);
}

// Handle file upload
document.getElementById('fileInput').addEventListener('change', (e) => {
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      addImageToCube(event.target.result);
      saveToLocalStorage();
    };
    reader.readAsDataURL(file);
  });
});

// Save to localStorage
function saveToLocalStorage() {
  const imageData = images.map(face =>
    face.style.backgroundImage.replace('url("', '').replace('")', '')
  );
  localStorage.setItem('cubeGallery', JSON.stringify(imageData));
}

// Clear gallery
document.getElementById('clearGalleryLabel').addEventListener('click', () => {
  if (confirm("Clear all images?")) {
    images.forEach(face => face.remove());
    images = [];
    localStorage.removeItem('cubeGallery');
    location.reload();  // optional → reload page
  }
});

// Cube rotation
let currentAngle = 0;
setInterval(() => {
  currentAngle += 90;
  cube.style.transform = `rotateY(${currentAngle}deg)`;
}, 3000);

// Loader logic
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// fallback in case load event doesn’t fire
setTimeout(hideLoader, 3000);

// in case images are still loading external resources
window.addEventListener('load', hideLoader);

// Start the gallery
initGallery();
