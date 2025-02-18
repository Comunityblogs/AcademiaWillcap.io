// Objeto global para almacenar referencias a los videos
const videoManager = {};

// Inicializar los controles para cada video
document.querySelectorAll('.video-container video').forEach(video => {
  const videoId = video.id;
  videoManager[videoId] = {
    video: video,
    progressBar: document.getElementById(`progress${videoId.slice(-1)}`),
    isDragging: false, // Para evitar conflictos mientras se arrastra
  };

  // Actualizar barra de progreso mientras el video se reproduce
  video.addEventListener('timeupdate', () => {
    const videoData = videoManager[videoId];
    if (!videoData.isDragging) { // Evita conflictos mientras se arrastra la barra
      const percent = video.currentTime / video.duration || 0; // Asegura que no haya NaN
      videoData.progressBar.style.width = `${percent * 100}%`;
    }
  });

  // Permitir que el video sea enfocado para detectar eventos de teclado
  video.setAttribute('tabindex', '0');
});

    // Controles personalizados para los videos
    function togglePlayPause(videoId) {
      const video = document.getElementById(videoId);
      const button = document.querySelector(`#${videoId} + .controls button`);
      if (video.paused) {
        video.play();
        button.textContent = '⏸️';
      } else {
        video.pause();
        button.textContent = '▶️';
      }
    }

// Función para activar/desactivar el sonido
function toggleMute(videoId) {
  const videoData = videoManager[videoId];
  videoData.video.muted = !videoData.video.muted;
}

// Función para ajustar el volumen
function setVolume(volume, videoId) {
  const videoData = videoManager[videoId];
  videoData.video.volume = volume;
}

// Función para saltar a un punto específico del video al hacer clic en la barra
function seekVideo(event, videoId) {
  const videoData = videoManager[videoId];
  const rect = event.target.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = offsetX / rect.width;

  // Desactivar temporalmente el evento timeupdate
  videoData.isDragging = true;
  videoData.video.currentTime = percent * videoData.video.duration; // Ajusta el tiempo del video
  videoData.progressBar.style.width = `${percent * 100}%`; // Actualiza visualmente la barra
  videoData.isDragging = false; // Reactivar el evento timeupdate
}


// Detectar eventos de teclado para controlar el video
document.addEventListener('keydown', (event) => {
  const activeElement = document.activeElement; // Elemento actualmente enfocado
  if (!activeElement || !activeElement.tagName || activeElement.tagName.toLowerCase() !== 'video') return;

  const videoId = activeElement.id;
  if (event.key === 'ArrowLeft') {
    rewindVideo(videoId); // Retrocede 5 segundos
  } else if (event.key === 'ArrowRight') {
    forwardVideo(videoId); // Avanza 5 segundos
  } else if (event.code === 'Space') {
    event.preventDefault(); // Evita el comportamiento predeterminado de la barra espaciadora
    togglePlayPause(videoId); // Alterna entre reproducir y pausar
  }
});

// Funcionalidad de arrastre (drag-and-drop) para la barra de progreso
document.querySelectorAll('.progress-bar').forEach(bar => {
  let isDragging = false;

  bar.addEventListener('mousedown', (event) => {
    isDragging = true;
    updateProgressOnDrag(event, bar);
  });

  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      updateProgressOnDrag(event, bar);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

function updateProgressOnDrag(event, bar) {
  const videoId = bar.id.replace('progress', 'video'); // Obtiene el ID del video asociado
  const videoData = videoManager[videoId];
  videoData.isDragging = true; // Marcar como arrastrando

  const rect = bar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = Math.max(0, Math.min(1, offsetX / rect.width)); // Limita el porcentaje entre 0 y 1
  videoData.video.currentTime = percent * videoData.video.duration; // Ajusta el tiempo del video
  bar.querySelector('.progress-bar-fill').style.width = `${percent * 100}%`; // Actualiza visualmente la barra

  videoData.isDragging = false; // Desmarcar como arrastrando
}
