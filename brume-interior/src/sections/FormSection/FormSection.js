import formHtml from './FormSection.html';
import './FormSection.scss';

import { openModal, closeModal } from 'Components/ModalWindow/Modal';

const FormSection = (container) => {
    container.innerHTML += formHtml;

    window.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('.form');
        const formModal = document.querySelector('.form__modal');

        const submitForm = (event) => {
            const name = form.querySelector('.form__input-name').value;
            const nameWrapper = document.querySelector('.form__modal-text-name');
            nameWrapper.innerHTML = name;
            event.preventDefault();
            openModal(formModal);
        };

        form.onsubmit = submitForm;

        formModal.addEventListener('click', () => closeModal(formModal));
        formModal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal(formModal);
            }
        });
    });
};

export { FormSection };
