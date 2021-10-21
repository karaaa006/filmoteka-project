import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

instance.defaults.params = { api_key: 'c4da2d26df740b651b6bb4b7cba32696', language: 'en-US' };

export default class FetchApi {
  constructor() {
    this.currentPage = 1;
    let url = new URL(window.location.href);
    if (url.searchParams.get('page')) {
      this.currentPage = Number(url.searchParams.get('page'));
    }

    this.maxPage = 0;
    this.currentQuery = '';
    this.currentRequest = '';
  }

  async searchMovies(query) {
    try {
      this.currentQuery = query;
      this.currentPage = 1;

      const response = await instance.get(
        `/search/movie?&page=${this.currentPage}&include_adult=false&query=${query}`,
      );

      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;
      this.currentRequest = 'search';

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async selectPage(page) {
    let searchParams = await new URLSearchParams(window.location.search);
    searchParams.set('page', page);
    window.location.search = searchParams.toString();
    try {
      this.currentPage = page;
      if (this.currentRequest === 'search') {
        const response = await instance.get(
          `/search/movie?&page=${this.currentPage}&include_adult=false&query=${this.currentQuery}`,
        );

        const moviesList = response.data;

        return moviesList;
      }

      const response = await instance.get(`/movie/popular?page=${this.currentPage}`);
      const moviesList = response.data;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async nextPage() {
    try {
      if (this.currentRequest === 'search') {
        const response = await instance.get(
          `/search/movie?&page=${++this.currentPage}&include_adult=false&query=${
            this.currentQuery
          }`,
        );

        const moviesList = response.data;

        return moviesList;
      }

      const response = await instance.get(`/movie/popular?page=${++this.currentPage}`);
      const moviesList = response.data;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async prevPage() {
    try {
      if (this.currentRequest === 'search') {
        const response = await instance.get(
          `/search/movie?&page=${--this.currentPage}&include_adult=false&query=${
            this.currentQuery
          }`,
        );

        const moviesList = response.data;

        return moviesList;
      }

      const response = await instance.get(`/movie/popular?page=${--this.currentPage}`);
      const moviesList = response.data;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async getPopularMovies() {
    this.currentPage = 1;
    let url = new URL(window.location.href);
    if (url.searchParams.get('page')) {
      this.currentPage = Number(url.searchParams.get('page'));
    }
    try {
      const response = await instance.get(`/movie/popular?page=${this.currentPage}`);
      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;
      this.currentRequest = 'popular';

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async getUpcomingMovies(page = 1) {
    try {
      const response = await instance.get(`/movie/upcoming?&page=${page}`);
      const moviesList = response.data;

      this.maxPage = moviesList.total_pages;

      return moviesList;
    } catch (err) {
      console.log(err);
    }
  }

  async getMovieInfo(id) {
    try {
      const response = await instance.get(`/movie/${id}`);
      const movieInfo = response.data;

      return movieInfo;
    } catch (err) {
      console.log(err);
    }
  }

  async getTrailerLink(id) {
    try {
      const response = await instance.get(`/movie/${id}/videos`);
      const link = response.data.results[0].key;

      return link;
    } catch (err) {
      console.log(err);
    }
  }
}
