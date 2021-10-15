import refs from './refs.js';
import FetchApi from './movie_Api.js';
import { getModifiedData } from './getModifiedData.js';
import pagination from './paginationButtons';

const { apiPagination } = pagination;

const movieApi = new FetchApi();

const movie = movieApi.getPopularMovies();
console.log(movie);

getModifiedData(movie);

movie.then(movieList => {
  apiPagination(movieList, movieApi);
});
