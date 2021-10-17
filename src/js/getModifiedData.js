import genres_decoder from './genres_decoder';
import { genres_decoderLS } from './genres_decoder';
import { renderMovieMarkup } from './renderMovieMarkup.js';
import template from '../templates/film-card-li.hbs';

function pad(value) {
  return String(value).padEnd(3, '.0');
}

// export function getModifiedData(fetchedData) {
//   fetchedData.then(d => {
//     console.log(d);
//     let modifiedData = d.results.map(m => {
//       m.genre_ids = genres_decoder(m.genre_ids);

//       if (m.genre_ids.length > 3) {
//         m.genre_ids = m.genre_ids.slice(0, 2);
//         m.genre_ids.push('Other');
//       }
//       m.genre_ids = m.genre_ids.join(', ');
//       if (m.release_date !== undefined) {
//         m.release_date = m.release_date.slice(0, 4);
//       } else {
//         m.first_air_date = m.first_air_date.slice(0, 4);
//       }
//       m.vote_average = pad(m.vote_average);
//       return m;
//     });

//     renderMovieMarkup(template, modifiedData);
//   });
// }

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
      m.vote_average = pad(m.vote_average);
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
    data.vote_average = pad(data.vote_average);
  }

  console.log(data);
  return data;
}
