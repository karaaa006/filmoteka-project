import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css'
import FetchApi from './movie_Api.js'
import refs from './refs.js';
import { getModifiedData } from './getModifiedData.js'

const { paginationContainerRef } = refs;
const movieApi = new FetchApi();

  

const options = {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};

const pagination = new Pagination(paginationContainerRef, options);


pagination.on('beforeMove', evt => {
  const { page } = evt;
 
  getModifiedData(movieApi.selectPage(page))

});