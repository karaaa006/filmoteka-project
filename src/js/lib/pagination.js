var eventHandler = require('./event-handler.js');

var pagination = function (paginationWrapper, data) {
  var events = new eventHandler();

  var currentPage = data.currentPage || 1;
  var itemsPerPage = data.itemsPerPage || 30;
  var step = data.step || 3;
  var size = Math.ceil(data.totalItems / itemsPerPage);

  if (typeof data.onInit == 'function') {
    events.on('init', data.onInit);
  }
  if (typeof data.onPageChanged == 'function') {
    events.on('pageChanged', data.onPageChanged);
  }

  var navArrows;
  var numPages = size;
  var firstLoad = true;

  /**
   * @param {function} callback
   * @returns {pagination}
   */
  this.onPageChanged = function (callback) {
    events.on('pageChanged', callback);
    return this;
  };

  /**
   * @returns {number}
   */
  this.getCurrentPage = function () {
    return currentPage;
  };

  this.getPrevPage = function () {
    if (currentPage > 1) {
      return currentPage--;
    }

    return false;
  };

  this.getNextPage = function () {
    if (currentPage < numPages) {
      return currentPage++;
    }

    return false;
  };

  var paginationContainer = function (paginationWrapper) {
    var template = [
      '<a class="arrowLeft">&#9668;</a>', // previous
      '<span></span>', // pagination container
      '<a class="arrowRight">&#9658;</a>', // next
    ];
    paginationWrapper.innerHTML = template.join('');
  };

  var arrows = function (paginationWrapper) {
    navArrows = paginationWrapper.getElementsByTagName('a');
    navArrows[0].addEventListener(
      'click',
      function () {
        prevPage(paginationWrapper);
      },
      false,
    );
    navArrows[1].addEventListener(
      'click',
      function () {
        nextPage(paginationWrapper);
      },
      false,
    );
  };

  var prevPage = function (paginationWrapper) {
    if (currentPage > 1) {
      currentPage--;
      changeContent(paginationWrapper);
    }
  };

  var nextPage = function (paginationWrapper) {
    if (currentPage < numPages) {
      currentPage++;
      changeContent(paginationWrapper);
    }
  };

  var changeContent = function (paginationWrapper) {
    if (firstLoad == false) {
      events.fire('pageChanged', [currentPage]);
    }

    if (firstLoad == true) {
      firstLoad = false;
    }

    var pageNumbersWrapper = paginationWrapper.getElementsByTagName('span')[0];
    pageNumbersWrapper.innerHTML = paginationTemplate();
    attachPageEvents(paginationWrapper, pageNumbersWrapper.getElementsByTagName('a'));
  };

  var attachPageEvents = function (paginationWrapper, pageLinks) {
    for (var i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener(
        'click',
        function () {
          currentPage = this.innerText;
          changeContent(paginationWrapper);
        },
        false,
      );
    }
  };

  var paginationTemplate = function () {
    var template = '';
    var elementsToShow = step * 2;

    var add = {
      pageNum: function (start, end) {
        for (var i = start; i <= end; ++i) {
          if (i == currentPage) {
            template += '<a class="current pagNumber">' + i + '</a>';
          } else {
            template += '<a class="pagNumber">' + i + '</a>';
          }
        }
      },
      startDots: function () {
        // add first currentPage with separator
        template += '<a class="pagNumber">1</a><i class="pagDots">...</i>';
      },

      endDots: function () {
        template += '<i class="pagDots">...</i><a class="pagNumber">' + numPages + '</a>';
      },
    };

    if (elementsToShow >= numPages) {
      add.pageNum(1, numPages);
    } else {
      if (currentPage < elementsToShow) {
        add.pageNum(1, elementsToShow);
        add.endDots();
      } else if (currentPage > numPages - elementsToShow) {
        add.startDots();
        add.pageNum(numPages - elementsToShow, numPages);
      } else {
        add.startDots();
        add.pageNum(currentPage - step, parseInt(currentPage) + parseInt(step));
        add.endDots();
      }
    }
    return template;
  };

  var createPagination = function (paginationWrapper) {
    paginationContainer(paginationWrapper);
    arrows(paginationWrapper);
    changeContent(paginationWrapper);
  };

  createPagination(paginationWrapper);
  events.fire('init', currentPage);
};

module.exports = pagination;
