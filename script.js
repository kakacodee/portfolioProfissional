document.addEventListener('DOMContentLoaded', function () {
    const slideLinks = document.querySelectorAll('.slide-link');
  const slideshow = document.querySelector('.slideshow');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  let index = 0;
  const total = slides.length;
  let autoSlideTimeout = null;

  // Função para obter a duração do vídeo atual (em ms)
  function getCurrentVideoDuration() {
    const video = slides[index].querySelector('video');
    if (video && video.duration && !isNaN(video.duration)) {
      return video.duration * 1000;
    }
    // fallback: 5 segundos
    return 5000;
  }

  function showSlide(i) {
    slideshow.style.transform = `translateX(-${i * 100}%)`;
    // Atualiza visibilidade dos links
    slideLinks.forEach((link, idx) => {
      link.style.display = idx === i ? 'inline-block' : 'none';
    });
    resetAutoSlide();
  }

  function next() {
    index = (index + 1) % total;
    showSlide(index);
  }

  function prev() {
    index = (index - 1 + total) % total;
    showSlide(index);
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  function resetAutoSlide() {
    if (autoSlideTimeout) clearTimeout(autoSlideTimeout);
    const video = slides[index].querySelector('video');
    // Se o vídeo ainda não carregou a duração, aguarda o loadedmetadata
    if (video && (isNaN(video.duration) || video.duration === 0)) {
      video.addEventListener('loadedmetadata', scheduleAutoSlide, { once: true });
    } else {
      scheduleAutoSlide();
    }
  }

  function scheduleAutoSlide() {
    const duration = getCurrentVideoDuration();
    autoSlideTimeout = setTimeout(next, duration);
  }

  // Inicializa
  showSlide(index);
});