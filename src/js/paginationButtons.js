// import movieApi from './movie_Api.js';
import refs from './refs.js';
import { getModifiedData } from './getModifiedData.js';
var pagination = require('./lib/pagination.js');
import LSService from './storage.js';
import { renderMovieMarkup } from './renderMovieMarkup';
import template from '../templates/film-card-li.hbs';
import getPortionData from './getPortionData';

const { paginationContainerRef } = refs;

export default {
  apiPagination: function (movieList, movieApi) {
    const paginationButtonsHome = new pagination(paginationContainerRef, {
      currentPage: movieList.page,
      totalItems: movieList.total_results,
      itemsPerPage: 20,
      step: 2,
    });

    paginationButtonsHome.onPageChanged(displayContent);

    function displayContent(currentPage) {
      movieApi
        .selectPage(currentPage)
        .then(movieList => renderMovieMarkup(template, getModifiedData(movieList)));
    }

    const pagesContainerRef = document.querySelector('.pagination span');
    const leftArrowBtn = document.querySelector('.arrowLeft');
    const rightArrowBtn = document.querySelector('.arrowRight');

    const leftArrowTmpl =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
    const rightArrowTmpl =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';

    leftArrowBtn.innerHTML = leftArrowTmpl;
    rightArrowBtn.innerHTML = rightArrowTmpl;

    pagesContainerRef.classList.add('pages-container');
  },

  lsPagination: function (movieList) {
    const paginationButtonsHome = new pagination(paginationContainerRef, {
      currentPage: 1,
      totalItems: movieList.length,
      itemsPerPage: 20,
      step: 2,
    });

    paginationButtonsHome.onPageChanged(displayContent);

    function displayContent(currentPage) {
      renderMovieMarkup(template, getPortionData(movieList, 20, currentPage));
    }

    const pagesContainerRef = document.querySelector('.pagination span');
    const leftArrowBtn = document.querySelector('.arrowLeft');
    const rightArrowBtn = document.querySelector('.arrowRight');

    const leftArrowTmpl =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
    const rightArrowTmpl =
      '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';

    leftArrowBtn.innerHTML = leftArrowTmpl;
    rightArrowBtn.innerHTML = rightArrowTmpl;

    pagesContainerRef.classList.add('pages-container');
  },
};
