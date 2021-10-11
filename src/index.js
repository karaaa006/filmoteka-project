import './sass/main.scss';

import requestApi from './js/movie_Api';
import genres_decoder from './js/genres_decoder';

console.log('Преобразование ID жанров в их название: ', genres_decoder([10759, 9648, 18]));

const request = new requestApi();
request.searchMovies('INJUSTICE').then(d => console.log('Поиск фильмов по запросу: ', d));
request.getPopularMovies().then(d => console.log('Популярные фильмы: ', d));
request.getMovieInfo('122').then(d => console.log('Информация о фильме по ID: ', d));
request.getUpcomingMovies().then(d => console.log('Скоро в кино: ', d));
request.selectPage(41).then(d => console.log('42: ', d));
import getMovies from './js/getPopularMovies.js';
import paginationButtons from './js/paginationButtons.js'
