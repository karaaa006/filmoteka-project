import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

instance.defaults.params = { api_key: 'c4da2d26df740b651b6bb4b7cba32696' };

export default class FetchApi {
  constructor() {
    this.currentPage = 1;
    this.maxPage = 0;
    this.currentQuery = '';
  }

  async searchMovies(query, page = 1) {
    try {
      this.currentQuery = query;
      const response = await instance.get(
        `/search/movie?language=en-US&page=${page}&include_adult=false&query=${query}`,
      );

      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async selectPage(page) {
    try {
      this.currentPage = page;
      return this.searchMovies(this.currentQuery, this.currentPage);
    } catch (err) {
      console.log(err);
    }
  }

  async nextPage() {
    try {
      if (this.currentPage + 1 > this.maxPage) throw new Error('Ой. Что-то пошло не так!');

      return this.searchMovies(this.currentQuery, ++this.currentPage);
    } catch (err) {
      console.log(err);
    }
  }

  async prevPage() {
    try {
      if (this.currentPage - 1 < 1) throw new Error('Ой. Что-то пошло не так!');

      return this.searchMovies(this.currentQuery, --this.currentPage);
    } catch (err) {
      console.log(err);
    }
  }

  async getPopularMovies(page = 1) {
    try {
      const response = await instance.get(`/trending/all/day?page=${page}`);
      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async getUpcomingMovies(page = 1) {
    try {
      const response = await instance.get(`/movie/upcoming?&language=en-US&page=${page}`);
      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async getMovieInfo(id) {
    try {
      const response = await instance.get(`/movie/${id}?language=en-US`);
      const movieInfo = response.data;

      return movieInfo;
    } catch (err) {
      console.log(err);
    }
  }
}
