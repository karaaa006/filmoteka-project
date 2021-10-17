import FetchApi from './movie_Api.js';
import { getModifiedData } from './getModifiedData.js';
import { renderMovieMarkup } from './renderMovieMarkup';
import template from '../templates/film-card-li.hbs';
import pagination from './paginationButtons';

const { apiPagination } = pagination;

export default function getPopularMovies() {
  const movieApi = new FetchApi();

  const movie = movieApi.getPopularMovies();

  movie.then(movieList => {
    renderMovieMarkup(template, getModifiedData(movieList));
    apiPagination(movieList, movieApi);
  });
}

getPopularMovies();
