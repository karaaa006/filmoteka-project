
 // import movieTpl from '../templates/film-card_modal.hbs';



const refs = {
    filmCard: document.querySelector('.movie-list'), 
    modalBackdrop: document.querySelector('.backdrop-js'),
    modalCloseBtn: document.querySelector('[data-modal-close]'),
    movieMarckup: document.querySelector('.template-container'),
    
  }


  refs.filmCard.addEventListener('click', onFilmClick)


  function addEventListeners () {
    refs.modalCloseBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', closeModalByKeydown);
  
    refs.modalBackdrop.addEventListener('click', closeModalByBackdropClick);
  }

  
  function removeEventListeners () {
    refs.modalCloseBtn.removeEventListener('click', closeModal);

    window.removeEventListener('keydown', closeModalByKeydown);
  
    refs.modalBackdrop.removeEventListener('click', closeModalByBackdropClick);
  }


  function openModal () {
    refs.modalBackdrop.classList.remove('is-hidden')
    document.body.style.overflow = 'hidden' 
    addEventListeners ()
   
  }

  function closeModal () {
    refs.modalBackdrop.classList.add('is-hidden')
    document.body.style.overflow = ''
    removeEventListeners ()
  }

  function closeModalByKeydown (e) {
    if(e.code !=='Escape') {
      return
    }
    closeModal()
  }

  function closeModalByBackdropClick(e) {
    if(e.target.classList.contains('backdrop-js')) {
      closeModal()    
    }
  }
    
  

  function onFilmClick (e) {
    

    if(e.target.tagName = 'li') {
      openModal()
      const movie = e.target.closest('li').dataset.movieId;
      console.log(movie)
      
    } 
     return 
  }


//   function renderMovieMarckup (movie) {
    
//     const markup = movieTpl(movie);
//     movieMarkup.insertAdjacentHTML('afterbegin', markup)
// }


