

// Cube faces
let images = [];

// Initialize from localStorage
function initGallery() {
  const saved = JSON.parse(localStorage.getItem('cubeGallery')) || [];
  saved.forEach(img => addImageToCube(img));
}

// Add image to cube
function addImageToCube(imgData) {
  const face = document.createElement('div');
  face.className = 'cube-face';
  face.style.backgroundImage = `url(${imgData})`;
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
document.getElementById('clearBtn').addEventListener('click', () => {
  if(confirm("Clear all images?")) {
    images.forEach(face => face.remove());
    images = [];
    localStorage.removeItem('cubeGallery');
  }
});

// Start the gallery
initGallery();

// Wait for full load
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// Cube functionality
const cube = document.getElementById('cube');
let currentAngle = 0;

// [Previous JS code for cube rotation/upload/clear...]
// Let me know if you need this part expanded!
