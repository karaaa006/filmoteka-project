import FetchApi from './movie_Api.js';
import { getModifiedData } from './getModifiedData.js';
import template from '../templates/film-card-li.hbs';
import { renderMovieMarkup } from './renderMovieMarkup';
const movieApi = new FetchApi();

movieApi.getPopularMovies().then(d => {
  console.log(d);
  renderMovieMarkup(template, getModifiedData(d));
});
