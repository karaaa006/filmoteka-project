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
  watchedBtn: document.querySelector('.watched_btn'),
  queueBtn: document.querySelector('.queue_btn'),
};

let spinner = ''

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
  refs.movieMarkup.innerHTML = "";
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

  const id = Number(e.target.closest('li').dataset.movieId);
  lsService.currentID = id;
  spinner = e.target.closest('li').querySelector('.lds-ellipsis')
  
  showSpinner()
  openModal()
  api.getMovieInfo(id).then(d => {
    renderMovieMarckup(d);
    removeSpinner();
    console.log(d);
    let watchedBtn = document.querySelector('.watched_btn');
    // console.log(watchedBtn)
  });
}

function renderMovieMarckup(movie) {
  const markup = movieTpl(movie);
  refs.movieMarkup.innerHTML = markup;
}

refs.modalBackdrop.addEventListener('click', e => {
  let btn = e.target.closest('button');
  if (btn) {
    if (btn.classList.contains('watched_btn')) {
      addToWatched();
      btn.setAttribute('disabled', true);
      // btn.textContent = 'Delete from WATCHED';
    } else if (btn.classList.contains('queue_btn')) {
      addToQueue();
      btn.setAttribute('disabled', true);
      // btn.textContent = 'Delete from QUEUE';
    }
  } else return;
});

// refs.modalBackdrop.addEventListener('click', e => {
//   let btn = e.target.closest('button');
//   if (btn) {
//     if (btn.classList.contains('watched_btn')) {
//       addToWatched();
//       // btn.textContent = 'Delete from WATCHED';
//     } else if (btn.classList.contains('queue_btn')) {
//       addToQueue();
//       // btn.textContent = 'Delete from QUEUE';
//     }
//   } else return;
// });

function addToWatched() {
  let id = lsService.id;
  lsService.setWatchedToStorage(id);
}

// function deleteFromWatched() {
//   let id = lsService.id;
//   lsService.deleteMovieFromLS(id);
// }

function addToQueue() {
  let id = lsService.id;
  lsService.setQueueToStorage(id);
  // refs.queueBtn.setAttribute('disabled', true);
}





function showSpinner (){
  spinner.classList.remove('non-active')
  console.log(spinner)
  // видалити консоль пысля перевырки
}

function removeSpinner () {
  spinner.classList.add('non-active')
  console.log(spinner) 
  // видалити консоль пысля перевырки
}
