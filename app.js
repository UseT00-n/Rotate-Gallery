const cube = document.getElementById('cube');
let images = [];

// Load saved images
function initGallery() {
  const saved = JSON.parse(localStorage.getItem('cubeGallery')) || [];
  saved.forEach(addImageToCube);
  hideLoader();
}

// Add image as a cube face
function addImageToCube(imgData) {
  const face = document.createElement('div');
  face.className = 'cube-face';
  face.style.backgroundImage = `url(${imgData})`;

  const faceCount = images.length;
  const angle = faceCount * 90;
  face.style.transform = `rotateY(${angle}deg) translateZ(250px)`;

  cube.appendChild(face);
  images.push(face);

  updateCubeTransform();
}

// Save to localStorage
function saveToLocalStorage() {
  const imageData = images.map(face =>
    face.style.backgroundImage.replace(/^url\("?|"?\)$/g, '')
  );
  localStorage.setItem('cubeGallery', JSON.stringify(imageData));
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

// Clear gallery
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm("Clear all images?")) {
    images.forEach(face => face.remove());
    images = [];
    localStorage.removeItem('cubeGallery');
    updateCubeTransform();
  }
});

// Auto-rotate
let currentAngle = 0;
setInterval(() => {
  if (images.length > 0) {
    currentAngle += 90;
    cube.style.transform = `rotateY(${currentAngle}deg)`;
  }
}, 3000);

// Update cube transform (keeps center if images removed/added)
function updateCubeTransform() {
  images.forEach((face, index) => {
    const angle = index * 90;
    face.style.transform = `rotateY(${angle}deg) translateZ(250px)`;
  });
}

// Hide loader
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// Ensure loader disappears if no images
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 3000);

// Start gallery
initGallery();
