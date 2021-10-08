import FetchApi from './movie_Api.js';
import genres_decoder from './genres_decoder';

import { renderMovieMarkup } from './renderMovieMarkup.js';
import template from '../templates/film-card-li.hbs';



const movieApi = new FetchApi();


movieApi.getPopularMovies().then(d => {
  const modifiedData = d.results.map(m => {
    m.genre_ids = genres_decoder(m.genre_ids);
    m.genre_ids = m.genre_ids.join(", ");
    if (m.release_date !== undefined) {m.release_date = m.release_date.slice(0, 4)}
    else{m.first_air_date = m.first_air_date.slice(0, 4)}
    return m;
  })
  
  renderMovieMarkup(template, modifiedData)
});
  
  

