import input from '../templates/header-input.hbs';
import buttons from '../templates/header-buttons.hbs';
import changeButtonsColor from './control-buttons';
import getPopularMovies from './getPopularMovies';
import { movieSearch } from './moviesSearch';

const homeButton = document.querySelector('#home');
const myLybraryButton = document.querySelector('#my_lybrary');
const dinamicContent = document.querySelector('.dinamic-content');
const header = document.querySelector('.header');
const paginationContainer = document.querySelector('.pagination');
const carouselRef = document.querySelector('.slider-wrapper')

function navButtons() {
  dinamicContent.insertAdjacentHTML('beforeend', input());
  myLybraryButton.addEventListener('click', onLibraryButtonClick);
  movieSearch()
}

navButtons();

function onLibraryButtonClick() {
  myLybraryButton.removeEventListener('click', onLibraryButtonClick);
  homeButton.addEventListener('click', onHomeButtonClick);
  dinamicContent.innerHTML = '';
  dinamicContent.insertAdjacentHTML('beforeend', buttons());
  homeButton.classList.remove('active');
  myLybraryButton.classList.add('active');
  carouselRef.classList.add('visually-hidden');
  header.classList.remove('header');
  header.classList.add('header-library');
  changeButtonsColor();
}

function onHomeButtonClick() {
  homeButton.removeEventListener('click', onHomeButtonClick);
  myLybraryButton.addEventListener('click', onLibraryButtonClick);
  dinamicContent.innerHTML = '';
  dinamicContent.insertAdjacentHTML('beforeend', input());
  myLybraryButton.classList.remove('active');
  homeButton.classList.add('active');
  header.classList.remove('header-library');
  header.classList.add('header');
  paginationContainer.classList.remove('visually-hidden');
  carouselRef.classList.remove('visually-hidden');
  getPopularMovies()
  movieSearch();
}
