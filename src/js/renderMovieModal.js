import movieTpl from '../templates/film-card_modal.hbs';
import movie_Api from './movie_Api';
import LSService from './storage';
import _debounce from 'debounce';
const api = new movie_Api();
const lsService = new LSService();

import { showWatchedFilms } from './control-buttons';
import { showQueue } from './control-buttons';

const refs = {
  filmCard: document.querySelector('.movie-list'),
  modalBackdrop: document.querySelector('.backdrop-js'),
  modalCloseBtn: document.querySelector('[data-modal-close]'),
  movieMarkup: document.querySelector('.template-container'),
  btnWatched: document.querySelector('.watched_btn'),
};

let spinner = '';

refs.filmCard.addEventListener('click', _debounce(onFilmClick, 350));

function addEventListeners() {
  refs.modalCloseBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', closeModalByKeydown);

  refs.modalBackdrop.addEventListener('click', closeModalByBackdropClick);
}

function removeEventListeners() {
  refs.modalCloseBtn.removeEventListener('click', closeModal);

  window.removeEventListener('keydown', closeModalByKeydown);

  refs.modalBackdrop.removeEventListener('click', closeModalByBackdropClick);
}

function openModal() {
  refs.modalBackdrop.classList.remove('is-hidden');

  document.body.style.overflow = 'hidden';

  addEventListeners();
}

function closeModal() {
  refs.modalBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
  removeEventListeners();
}

function closeModalByKeydown(e) {
  if (e.code !== 'Escape') {
    return;
  }
  closeModal();
}

function closeModalByBackdropClick(e) {
  if (e.target.classList.contains('backdrop-js')) {
    closeModal();
  }
}

function onFilmClick(e) {
  if (e.target.nodeName === 'UL') return;
  refs.movieMarkup.innerHTML = '';

  const id = Number(e.target.closest('li').dataset.movieId);
  lsService.currentID = id;

  spinner = e.target.closest('li').querySelector('.lds-ellipsis');

  showSpinner();
  openModal();

  api.getMovieInfo(id).then(d => {
    let watchedArray = lsService.getFromWatchedLS();
    let queueArray = lsService.getQueueLS();

    if (watchedArray) {
      if (watchedArray.some(movie => movie.id === d.id)) d.watched = true;
    }

    if (queueArray) {
      if (queueArray.some(movie => movie.id === d.id)) d.queue = true;
    }

    if (d.vote_average !== 0) {
      if (d.vote_average <= 3) d.rating_color = 'red-rating-cl';
      if (d.vote_average > 3 && d.vote_average <= 5) d.rating_color = 'yellow-rating-cl';
      if (d.vote_average > 5 && d.vote_average <= 8) d.rating_color = 'yellow-green-rating-cl';
      if (d.vote_average > 8) d.rating_color = 'green-rating-cl';
      d.vote_average = d.vote_average.toFixed(1);
    }

    renderMovieMarckup(d);
    removeSpinner();
  });
}

function renderMovieMarckup(movie) {
  const markup = movieTpl(movie);
  refs.movieMarkup.innerHTML = markup;
}

refs.modalBackdrop.addEventListener('click', e => {
  let btn = e.target;

  if (btn.classList.contains('watched_btn')) {
    lsService.setWatchedToStorage();
    btn.classList.replace('watched_btn', 'del_watched');
    btn.textContent = 'Delete from WATCHED';
  } else if (btn.classList.contains('del_watched')) {
    lsService.delFromWatched();
    btn.classList.replace('del_watched', 'watched_btn');
    btn.textContent = 'Add to watched';

    if (document.querySelector('#watched.active')) {
      showWatchedFilms();
    } else return;
  } else if (btn.classList.contains('queue_btn')) {
    lsService.setQueueToStorage();
    btn.classList.replace('queue_btn', 'del_queue');
    btn.textContent = 'Delete from QUEUE';
  } else if (btn.classList.contains('del_queue')) {
    lsService.delFromQueue();
    btn.classList.replace('del_queue', 'queue_btn');
    btn.textContent = 'Add to queue';

    if (document.querySelector('#queue.active')) {
      showQueue();
    } else return;
  }
});

function showSpinner() {
  spinner.classList.remove('non-active');
}

function removeSpinner() {
  spinner.classList.add('non-active');
}
