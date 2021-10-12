import genres_decoder from './genres_decoder';
import { renderMovieMarkup } from './renderMovieMarkup.js';
import template from '../templates/film-card-li.hbs';

function pad(value) {
  return String(value).padEnd(3, '.0');
}


export function getModifiedData(fetchedData) {
   fetchedData.then(d => {
  const modifiedData = d.results.map(m => {
    m.genre_ids = genres_decoder(m.genre_ids);

    if (m.genre_ids.length > 3) {
      m.genre_ids = m.genre_ids.slice(0, 2);
      m.genre_ids.push('Other');
    }
    m.genre_ids = m.genre_ids.join(', ');
    if (m.release_date !== undefined) {
      m.release_date = m.release_date.slice(0, 4);
    } else {
      m.first_air_date = m.first_air_date.slice(0, 4);
    }
    m.vote_average = pad(m.vote_average);
    return m;
  });

  renderMovieMarkup(template, modifiedData);
});
}