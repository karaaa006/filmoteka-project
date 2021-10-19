import FetchApi from './movie_Api';
import { renderMovieMarkup } from './renderMovieMarkup';
import { getModifiedData } from './getModifiedData.js';
import template from '../templates/film-card-li.hbs';
import pagination from './paginationButtons';

const { apiPagination } = pagination;

export default function inputLikeGoogle(query) {
  const searchResults = document.querySelector('.search-results');
  searchResults.innerHTML = '';
  const movieList = [];
  let queryLength = 4
  if (query.length < 4){
    queryLength = query.length
  }
  for (let i = 0; i < queryLength; i++) {
    movieList.push(`<p class="search-results__item">${query[i].title}</p>`);
  }
 console.log(movieList)
  searchResults.insertAdjacentHTML('beforeend', movieList.join(''));  
  searchResults.addEventListener('click', showFilm);
}

function showFilm(event) {
  const searchResults = document.querySelector('.search-results');
  searchResults.innerHTML = '';
  searchResults.removeEventListener('click', showFilm);
  const input = document.querySelector('.header-input');
  input.value = event.target.textContent;
  showSearchedMovie(event.target.textContent);
}

function showSearchedMovie(movie) {
  const query = new FetchApi();
  const queryAnsver = query.searchMovies(movie);
  queryAnsver.then(movieList => {
    renderMovieMarkup(template, getModifiedData(movieList));
    apiPagination(movieList, query);
  });
}
