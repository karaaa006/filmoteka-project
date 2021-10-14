import genresDB from './genres';

export default function (idArray) {
  const genresList = idArray.map(id => genresDB.find(genre => genre.id === id).name);

  return genresList;
}

export const genres_decoderLS = idArray => {
  const genresList = idArray.map(
    movieGenre => genresDB.find(genre => genre.id === movieGenre.id).name,
  );

  return genresList;
};
