import FetchApi from './movie_Api.js'
import refs from './refs.js';
import { getModifiedData } from './getModifiedData.js';
import pagination from 'pagination';
import LSService from './storage.js'

const { paginationContainerRef, movieListRef } = refs;
const movieApi = new FetchApi();



var paginationButtonsHome = new pagination(paginationContainerRef,
  {
    currentPage: 1,		// number
    totalItems: 10000,       // number
    itemsPerPage: 20,    // number
    step: 2,			// number
    //  onInit: displayContent	        // function
  });
paginationButtonsHome.onPageChanged(displayContent);


const pagesContainerRef = document.querySelector('.pagination span');
const leftArrowBtn = document.querySelector('.arrowLeft');
const rightArrowBtn = document.querySelector('.arrowRight');
function displayContent(currentPage) {
  getModifiedData(movieApi.selectPage(currentPage));

}


function modifyPaginationTemplate() {
  const leftArrowTmpl = '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
  const rightArrowTmpl = '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';

  leftArrowBtn.insertAdjacentHTML('beforeend', leftArrowTmpl)
  rightArrowBtn.insertAdjacentHTML('beforeend', rightArrowTmpl)
  pagesContainerRef.classList.add('pages-container')
}

modifyPaginationTemplate();
