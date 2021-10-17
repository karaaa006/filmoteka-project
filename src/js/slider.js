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

function renderTrendy() {
  api.getUpcomingMovies().then(d => renderSliderFilms(d.results));
}
renderTrendy();

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
