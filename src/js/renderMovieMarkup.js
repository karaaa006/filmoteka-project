import refs from './refs.js';

const { movieListRef } = refs;

export const renderMovieMarkup = (template, arr) => {
  const MovieMarkup = template(arr)
  return movieListRef.innerHTML = MovieMarkup;
}