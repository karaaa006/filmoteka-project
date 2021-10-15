const input = document.querySelector('.header-input')

import { renderMovieMarkup } from './renderMovieMarkup'
import FetchApi from './movie_Api'
import template from '../templates/film-card-li.hbs';
import pagination from './paginationButtons';
import { getModifiedData } from './getModifiedData.js';

const { apiPagination } = pagination;
var debounce = require('lodash.debounce')

export default function movieSearch() {
    input.addEventListener('input', debounce((event) => {
        console.log(event.target.value)
        const query = new FetchApi()
        const queryAnsver = query.searchMovies(event.target.value)
        console.log(queryAnsver)
        queryAnsver.then(movieList => {
            renderMovieMarkup(template, getModifiedData(movieList));
            apiPagination(movieList, queryAnsver);
        })
    }, 500))
}

