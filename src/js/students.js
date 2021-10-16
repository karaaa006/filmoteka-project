import students from './studentsData.json';
import studentsTemplate from '../templates/students-modal.hbs';
import * as basicLightbox from 'basiclightbox';


const refs = {
    studentGoit: document.querySelector('.dev__link'),
    backdrop: document.querySelector('[data-modal]'),
    modal: document.querySelector('.modal-students'),
}

const markupStudentsModal = studentsTemplate(students);
const instance = basicLightbox.create(markupStudentsModal);

refs.studentGoit.addEventListener('click', onOpenModal);

function onOpenModal() {
    instance.show()

    window.addEventListener('keydown', onCloseModal);

    function onCloseModal(event) {
        if (event.code === 'Escape') {
            instance.close();
            window.removeEventListener('keydown', onCloseModal)
        };
    };
}