import students from './studentsData.json';
import studentsTemplate from '../templates/students-modal.hbs';
import * as basicLightbox from 'basiclightbox';

const refs = {
  studentGoit: document.querySelector('.footer__link'),
  backdrop: document.querySelector('[data-modal]'),
  modal: document.querySelector('.modal-students'),
};

const markupStudentsModal = studentsTemplate(students);
const instance = basicLightbox.create(markupStudentsModal);

refs.studentGoit.addEventListener('click', onOpenModal);

function onOpenModal() {
  instance.show();
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', closeModal);
  window.addEventListener('click', closeModal);

}

function removeEventListeners () {
  window.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
}

function closeModal (event) {
  if (event.code === 'Escape' || event.target.classList.contains('basicLightbox')) {
  instance.close();
  document.body.style.overflow = '';    
  removeEventListeners();
  }
}







