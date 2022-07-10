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

        /* smooth appearing on the screen */
        const formWrapper = document.querySelector('.formSection__inner');

        if ('IntersectionObserver' in window) {
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        formWrapper.style.opacity = '1';
                        formWrapper.style.transform = 'translateY(0)';
                        observer.unobserve(formWrapper);
                    }
                });
            };
            const observerOptions = {
                threshold: 0.25,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            setTimeout(() => {
                observer.observe(formWrapper);
            }, 500);
        } else {
            formWrapper.style.opacity = '1';
            formWrapper.style.transform = 'translateY(0)';
        }
    });
};

export { FormSection };
