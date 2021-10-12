import FetchApi from './movie_Api.js';
import { getModifiedData } from './getModifiedData.js';

const movieApi = new FetchApi();

getModifiedData(movieApi.getPopularMovies())

