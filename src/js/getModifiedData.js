import genres_decoder from './genres_decoder';
import { genres_decoderLS } from './genres_decoder';
import { renderMovieMarkup } from './renderMovieMarkup.js';
import template from '../templates/film-card-li.hbs';

function pad(value) {
  if (value === 10) return value;

  return String(value).padEnd(3, '.0');
}

export function getModifiedData(data) {
  let modifiedData = data.results.map(m => {
    m.genre_ids = genres_decoder(m.genre_ids);

    if (m.genre_ids.length > 3) {
      m.genre_ids = m.genre_ids.slice(0, 2);
      m.genre_ids.push('Other');
    }
    m.genre_ids = m.genre_ids.join(', ');
    if (m.release_date) {
      m.release_date = m.release_date.slice(0, 4);
    }
    if (m.vote_average === 0) {
      m.vote_average = false;
    } else {
      if (m.vote_average <= 3) m.rating_color = 'red-rating-cl';
      if (m.vote_average > 3 && m.vote_average <= 5) m.rating_color = 'yellow-rating-cl';
      if (m.vote_average > 5 && m.vote_average <= 8) m.rating_color = 'yellow-green-rating-cl';
      if (m.vote_average > 8) m.rating_color = 'green-rating-cl';
      m.vote_average = m.vote_average.toFixed(1);
    }

    return m;
  });

  return modifiedData;
}

export function getModifiedDataLS(data) {
  data.genre_ids = genres_decoderLS(data.genres);

  if (data.genre_ids.length > 3) {
    data.genre_ids = data.genre_ids.slice(0, 2);
    data.genre_ids.push('Other');
  }
  data.genre_ids = data.genre_ids.join(', ');
  if (data.release_date !== undefined) {
    data.release_date = data.release_date.slice(0, 4);
  } else {
    data.first_air_date = data.first_air_date.slice(0, 4);
  }

  if (data.vote_average === 0) {
    data.vote_average = false;
  } else {
    if (data.vote_average <= 3) data.rating_color = 'red-rating-cl';
    if (data.vote_average > 3 && data.vote_average <= 5) data.rating_color = 'yellow-rating-cl';
    if (data.vote_average > 5 && data.vote_average <= 8)
      data.rating_color = 'yellow-green-rating-cl';
    if (data.vote_average > 8) data.rating_color = 'green-rating-cl';
    data.vote_average = data.vote_average.toFixed(1);
  }

  return data;
}
