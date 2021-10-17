import Glide from '@glidejs/glide';
import filmsCardSliderTpl from '../templates/card-films-slider.hbs';
import movieApi from './movie_Api';
import '@glidejs/glide/src/assets/sass/glide.core';
import '@glidejs/glide/src/assets/sass/glide.theme';
const sliderContainer = document.querySelector('.js-slider-container');

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});

glide.mount();
const api = new movieApi();
sliderContainer.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') return;

  const id = e.target.dataset.id;

  api.getMovieInfo(id).then(d => console.log(d));
});

function renderTrendy() {
  api.getUpcomingMovies().then(d => {
    d.results.map(movie => {
      if (Number(movie.vote_average) === 0) {
        movie.vote_average = false;
      } else {
        movie.vote_average = movie.vote_average.toFixed(1);
      }
    });

    renderSliderFilms(d.results);
  });
}
renderTrendy();

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
