import { renderMovieMarkup } from './renderMovieMarkup'
import FetchApi from './movie_Api'
import template from '../templates/film-card-li.hbs';
import pagination from './paginationButtons';
import { getModifiedData } from './getModifiedData.js';


const { apiPagination } = pagination;
var debounce = require('lodash.debounce')

export default function movieSearch() {
    const input = document.querySelector('.header-input')
    input.addEventListener('input', debounce(inputHandler, 500))
}

function inputHandler(event) {
    const notification = document.querySelector('.notification')
    if (event.target.value.length === 0) {
        notification.textContent = ''
        return
    }
    const query = new FetchApi()
    const queryAnsver = query.searchMovies(event.target.value)
    queryAnsver.then(movieList => {
        if (movieList.total_results !== 0) {
            renderMovieMarkup(template, getModifiedData(movieList));
            apiPagination(movieList, queryAnsver);
            notification.textContent = ''
            return
        } else if (movieList.total_results === 0) {
            notification.textContent = "Search result not successful. Enter the correct movie name and try again"
        }
    })
}