import { renderMovieMarkup } from './renderMovieMarkup';
import FetchApi from './movie_Api';
import template from '../templates/film-card-li.hbs';
import pagination from './paginationButtons';
import { getModifiedData } from './getModifiedData.js';
import getPopularMovies from './getPopularMovies';
import inputLikeGoogle from './inputLikeGoogle';

const { apiPagination } = pagination;
const debounce = require('lodash.debounce');
export let findedMovies = [];

export function movieSearch() {
  const input = document.querySelector('.header-input');
  const searchResults = document.querySelector('.search-results');
  input.addEventListener('input', debounce(inputHandler, 500));
}

async function inputHandler(event) {
  const notification = document.querySelector('.notification');
  const searchResults = document.querySelector('.search-results');
  if (event.target.value.length === 0) {
    notification.textContent = '';
    searchResults.innerHTML = '';
    getPopularMovies();
    return;
  }
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      searchResults.innerHTML = '';
      fetchMovies(event.target.value);
    }
    return
  })
  pleaseGoFetch(event.target.value)
}

export function fetchMovies(moviesName) {
  const notification = document.querySelector('.notification');
  notification.textContent = '';
  const query = new FetchApi();
  const queryAnsver = query.searchMovies(moviesName);
  queryAnsver.then(movieList => {
    if (movieList.total_results !== 0) {
      renderMovieMarkup(template, getModifiedData(movieList));
      apiPagination(movieList, query);
      return;
    }
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';
    notification.textContent =
      'Search result not successful. Enter the correct movie name and try again';
  });
}


function pleaseGoFetch(movieName) {
  const query = new FetchApi();
  const queryAnsver = query.searchMovies(movieName);
    queryAnsver.then(movieList => {
      console.dir(movieList)
      inputLikeGoogle(movieList.results)
  });
}

