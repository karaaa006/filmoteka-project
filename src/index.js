import './sass/main.scss';

import requestApi from './js/movie_Api';
import genres_decoder from './js/genres_decoder';

// Handlebars.registerHelper('sliceDate', function (aString) {
//     return aString.slice(0,3)
// })

console.log('Преобразование ID жанров в их название: ', genres_decoder([10759, 9648, 18]));

const request = new requestApi();
// request.searchMovies('Smith').then(d => console.log('Поиск фильмов по запросу: ', d));
request.getPopularMovies().then(d => console.log('Популярные фильмы: ', d));
// request.getMovieInfo('122').then(d => console.log('Информация о фильме по ID: ', d));
// request.getUpcomingMovies().then(d => console.log('Скоро в кино: ', d));
import getMovies from './js/getPopularMovies.js'
// fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=c4da2d26df740b651b6bb4b7cba32696&language=en-US').then(r => r.json()).then(d => console.log(d));
// fetch('https://api.themoviedb.org/3/configuration?api_key=c4da2d26df740b651b6bb4b7cba32696&language=en-US').then(r => r.json()).then(d => console.log(d));