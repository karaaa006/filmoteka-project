
const refs = {
  movieListRef: document.querySelector('.movie-list'),
}


export const renderMovieMarkup = (template, arr) => {
  const MovieMarkup = template(arr)
  return refs.movieListRef.innerHTML = MovieMarkup;
}

