import FetchApi from './movie_Api';

const fetchApi = new FetchApi();

export default class LSService {
  constructor() {
    // if (JSON.parse(localStorage.getItem('Watched'))) {
    //   let watchedArray = JSON.parse(localStorage.getItem('Watched'));
    //   this.watchedArray = watchedArray;
    // } else {
    //   return (this.watchedArray = []);
    // }

    // if (JSON.parse(localStorage.getItem('Queue').length)) {
    //   let queueArray = JSON.parse(localStorage.getItem('Queue'));
    //   this.queueArray = queueArray;
    // } else {
    //   return (this.queueArray = []);
    // }
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

  // добавить фильм в Watched
  async setWatchedToStorage(idMovie) {
    const info = await fetchApi.getMovieInfo(idMovie);
    // console.log(info);

    this.watchedArray.push(info);
    try {
      localStorage.setItem('Watched', JSON.stringify(this.watchedArray));
    } catch (err) {
      console.error(err);
    }
  }

  //Удалить фильм из списка просмотренных
  deleteMovieFromLS(id) {
    let array = this.getFromWatchedLS;
    for (let i = 0; i <= array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  // добавить фильм в Queue
  async setQueueToStorage(idMovie) {
    const info = await fetchApi.getMovieInfo(idMovie);
    this.queueArray.push(info);
    try {
      localStorage.setItem('Queue', JSON.stringify(this.queueArray));
    } catch (err) {
      console.error(err);
    }
  }

  //Удалить фильм из списка очереди
  deleteMovieFromLS(id) {
    let array = this.getQueueLS;
    for (let i = 0; i <= array.length; i++) {
      if (array[i].id === id) {
        array.splice(i, 1);
      }
    }
  }

  // Получить массив объектов из списка Watched
  getFromWatchedLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Watched'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }

  // Получить массив объектов из списка Queue
  getQueueLS() {
    try {
      const movieArr = JSON.parse(localStorage.getItem('Queue'));
      return movieArr === null ? undefined : movieArr;
    } catch (err) {
      console.error('Get state error: ', err);
    }
  }
}

// const {
//   id,
//   poster_path,
//   title,
//   name,
//   genres: { genre_ids },
//   release_date,
//   first_air_date,
//   vote_average,
// } = array;

// console.log(id, poster_path, title, name, genre_ids, release_date, first_air_date, vote_average);

// this.watchedArray = () => {
//   if (JSON.parse(localStorage.getItem('Watched').length)) {
//     let watchedArray = JSON.parse(localStorage.getItem('Watched'));
//     return watchedArray;
//   } else {
//     return (this.watchedArray = []);
//   }
// };
