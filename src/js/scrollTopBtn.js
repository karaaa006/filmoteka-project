const scrollBtn = document.querySelector('.scroll-top');
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollBtn.classList.remove('is-hidden');
  } else {
    scrollBtn.classList.add('is-hidden');
  }
}

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
