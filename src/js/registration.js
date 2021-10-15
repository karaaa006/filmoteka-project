const closeBtn = document.querySelector('.registration-close');
const regBackdrop = document.querySelector('.registration-backdrop');
closeBtn.addEventListener('click', () => {
  regBackdrop.classList.add('is-hidden');
});
