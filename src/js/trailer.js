import FetchApi from './movie_Api';
import * as basicLightbox from 'basiclightbox';

const sliderContainer = document.querySelector('.js-slider-container');

const api = new FetchApi();

async function renderTrailerModal(id) {
  try {
    const trailerLink = await api.getTrailerLink(id);
    const iframe = `
      <iframe
        width="1280"
        height="720"
        src="https://www.youtube.com/embed/${trailerLink}"
        title="YouTube video player"
        disablekb="1"
        frameborder="0"
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>;
    `;
    const lightbox = basicLightbox.create(iframe);

    lightbox.show();
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', closeModal);
    window.addEventListener('click', closeModal);

    function closeModal(e) {
      if (e.code === 'Escape' || e.target.classList.contains('basicLightbox')) {
        lightbox.close();
        document.body.style.overflow = '';
        window.removeEventListener('click', closeModal);
        window.removeEventListener('keydown', closeModal);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

sliderContainer.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') return;

  const movieId = e.target.closest('li').dataset.id;
  renderTrailerModal(movieId);
});
