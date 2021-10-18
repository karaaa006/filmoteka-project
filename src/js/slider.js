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
    d.results.forEach(movie => {
      if (movie.vote_average <= 3) movie.rating_color = 'red-rating-cl';
      if (movie.vote_average > 3 && movie.vote_average <= 5)
        movie.rating_color = 'yellow-rating-cl';
      if (movie.vote_average > 5 && movie.vote_average <= 8)
        movie.rating_color = 'yellow-green-rating-cl';
      if (movie.vote_average > 8) movie.rating_color = 'green-rating-cl';
  
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
