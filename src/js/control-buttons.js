import LSService from './storage';
import pagination from './paginationButtons';
const lsService = new LSService();
const { lsPagination } = pagination;
import { renderMovieMarkup } from './renderMovieMarkup';
import template from '../templates/film-card-li.hbs';
import plug from '../templates/plug.hbs';
import getPortionData from './getPortionData';

const controlButtons = document.querySelector('.dinamic-content');
const paginationContainer = document.querySelector('.pagination');

export default function changeButtonsColor() {
  showWatchedFilms();
  controlButtons.addEventListener('click', event => {
    const watchedButton = document.querySelector('#watched');
    const queueButton = document.querySelector('#queue');
    if (event.target.classList.contains('active')) {
      return;
    } else if (event.target === watchedButton) {
      queueButton.classList.remove('active');
      watchedButton.classList.add('active');
      showWatchedFilms();
    } else if (event.target === queueButton) {
      watchedButton.classList.remove('active');
      queueButton.classList.add('active');
      showQueue();
    }
  });
}

function showWatchedFilms() {
  let array = lsService.getFromWatchedLS();
  if (!array || array.length === 0) {
    // Если LS пуст то рисуем заглушку и прячем пагинацию
    renderMovieMarkup(plug);
    paginationContainer.classList.add('visually-hidden');
    return;
  }

  paginationContainer.classList.remove('visually-hidden');
  console.log(array);
  renderMovieMarkup(template, getPortionData(array, 20, 1)); //рендерим первую страницу фильмов
  lsPagination(array); //добавляем пагинацию
}

function showQueue() {
  let array = lsService.getQueueLS();
  if (!array || array.length === 0) {
    // Если LS пуст то рисуем заглушку и прячем пагинацию
    renderMovieMarkup(plug);
    paginationContainer.classList.add('visually-hidden');
    return;
  }

  paginationContainer.classList.remove('visually-hidden');
  renderMovieMarkup(template, getPortionData(array, 20, 1)); //рендерим первую страницу фильмов
  lsPagination(array); //добавляем пагинацию
}
