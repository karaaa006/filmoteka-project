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
  api.getUpcomingMovies().then(d => {

      if (d.vote_average <= 3) d.rating_color = 'red-rating-cl';
      if (d.vote_average > 3 && d.vote_average <= 5) d.rating_color = 'yellow-rating-cl';
      if (d.vote_average > 5 && d.vote_average <= 8) d.rating_color = 'yellow-green-rating-cl';
      if (d.vote_average > 8) d.rating_color = 'green-rating-cl';
    
    renderSliderFilms(d.results);
  });
}
renderTrendy();

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
}
