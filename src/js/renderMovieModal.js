import movieTpl from '../templates/film-card_modal.hbs';
import movie_Api from './movie_Api';
import LSService from './storage';
import _debounce from 'debounce';
const api = new movie_Api();
const lsService = new LSService();

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
  console.log(id);
  console.log(lsService.id);
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
    btn.classList.replace('watched_btn', 'del_watched');
    lsService.setWatchedToStorage();
    btn.textContent = 'Delete from WATCHED';
  } else if (btn.classList.contains('del_watched')) {
    lsService.delFromWatched();
    btn.textContent = 'Add to watched';
    btn.classList.replace('del_watched', 'watched_btn');
  } else if (btn.classList.contains('queue_btn')) {
    lsService.setQueueToStorage();
    btn.classList.toggle('del_queue');
    btn.textContent = 'Delete from QUEUE';
  } else if (btn.classList.contains('del_queue')) {
    lsService.delFromQueue();
    btn.classList.toggle('del_queue');
    btn.textContent = 'Add to queue';
  }
});

function addToWatched() {
  let id = lsService.id;
  lsService.setWatchedToStorage(id);
}

function deleteFromWatched() {
  let id = lsService.id;
  lsService.delFromWatched(id);
}

function addToQueue() {
  let id = lsService.id;
  lsService.setQueueToStorage(id);
}

function deleteFromWatched() {
  let id = lsService.id;
  lsService.delFromQueue(id);
}

function showSpinner() {
  spinner.classList.remove('non-active');
  console.log(spinner);
  // видалити консоль пысля перевырки
}

function removeSpinner() {
  spinner.classList.add('non-active');
  console.log(spinner);
  // видалити консоль пысля перевырки
}
