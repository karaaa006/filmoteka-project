import input from '../templates/header-input.hbs';
import buttons from '../templates/header-buttons.hbs';
import changeButtonsColor from './control-buttons';
import FetchApi from './movie_Api.js';
import { getModifiedData } from './getModifiedData.js';


const homeButton = document.querySelector('#home');
const myLybraryButton = document.querySelector('#my_lybrary');
const dinamicContent = document.querySelector('.dinamic-content');
const header = document.querySelector('.header');

function navButtons() {
  dinamicContent.insertAdjacentHTML('beforeend', input());
  myLybraryButton.addEventListener('click', onLibraryButtonClick);
}

navButtons();

function onLibraryButtonClick() {
  myLybraryButton.removeEventListener('click', onLibraryButtonClick);
  homeButton.addEventListener('click', onHomeButtonClick);
  dinamicContent.innerHTML = '';
  dinamicContent.insertAdjacentHTML('beforeend', buttons());
  homeButton.classList.remove('active');
  myLybraryButton.classList.add('active');
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
  const movieApi = new FetchApi();
  getModifiedData(movieApi.getPopularMovies())
}
