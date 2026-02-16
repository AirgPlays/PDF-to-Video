const params = new URLSearchParams(window.location.search);
const videoUrl = params.get('url');

const video = document.getElementById('videoPlayer');
const filenameSpan = document.getElementById('filename');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const speedSelect = document.getElementById('speed');
const pipBtn = document.getElementById('pipBtn');
const sharpenToggle = document.getElementById('sharpenToggle');

if (!videoUrl) {
  alert('No video URL provided.');
} else {
  video.src = videoUrl;

  const urlParts = videoUrl.split('/');
  const filename = urlParts[urlParts.length - 1] || 'video.mp4';
  filenameSpan.textContent = filename;

  video.play().catch(e => console.log('Autoplay prevented:', e));
}

fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

speedSelect.addEventListener('change', () => {
  video.playbackRate = parseFloat(speedSelect.value);
});

pipBtn.addEventListener('click', async () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (video !== document.pictureInPictureElement) {
    await video.requestPictureInPicture();
  }
});

let sharpenEnabled = false;
sharpenToggle.addEventListener('click', () => {
  sharpenEnabled = !sharpenEnabled;
  if (sharpenEnabled) {
    video.style.filter = 'url(#sharpen)';
    sharpenToggle.textContent = '🔪 Sharpen On';
    sharpenToggle.classList.add('active');
  } else {
    video.style.filter = 'none';
    sharpenToggle.textContent = '🔪 Sharpen Off';
    sharpenToggle.classList.remove('active');
  }
});

video.addEventListener('loadedmetadata', () => {
  console.log('Video loaded, duration:', video.duration);
});