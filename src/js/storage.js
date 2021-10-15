import FetchApi from './movie_Api';

const ref = {
  list: document.querySelector('.movie-list'),

  backdropCard: document.querySelector('.backdrop'),
};

console.log(ref.backdropCard);

const fetchApi = new FetchApi();

export default class LSService {
  constructor() {
    this.watchedArray = [];
    this.queueArray = [];
    this.id = 0;
  }

  set currentID(movieId) {
    return (this.id = movieId);
  }

  get currentID() {
    return this.id;
  }
  async setWatchedToStorage(idMovie) {
    const info = await fetchApi.getMovieInfo(idMovie);
    this.watchedArray.push(info);
    try {
      localStorage.setItem('Watched', JSON.stringify(this.watchedArray));
    } catch (err) {
      console.error(err);
    }
  }

  deleteMovieFromLS(id) {
    let array = this.getFromWatchedLS;
    for (let i = 0; i <= array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  async setQueueToStorage(idMovie) {
    const info = await fetchApi.getMovieInfo(idMovie);
    this.queueArray.push(info);
    try {
      localStorage.setItem('Queue', JSON.stringify(this.queueArray));
    } catch (err) {
      console.error(err);
    }
  }

  getFromWatchedLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Watched'));

      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }

  getQueueLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Queue'));

      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }
}
