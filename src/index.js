import './js/slider';
import './sass/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import './js/storage';
import './js/renderMovieModal';
import './js/nav-buttons';
import './js/getPopularMovies.js';
import './js/students';
import FetchApi from './js/movie_Api';
import './js/trailer';

import './js/paginationButtons';

const api = new FetchApi();

console.log(api.getTrailerLink(11));
