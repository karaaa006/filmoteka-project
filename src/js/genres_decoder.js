import genresDB from './genres';

export default function (idArray) {
  const genresList = idArray.map(id => genresDB.find(genre => genre.id === id).name);

  return genresList;
}
