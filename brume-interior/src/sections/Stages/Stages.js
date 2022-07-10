import stagesHtml from './Stages.html';
import './Stages.scss';

const StagesSection = (container) => {
    container.innerHTML += stagesHtml;

    window.addEventListener('DOMContentLoaded', () => {
        /* smooth appearing on the screen */
        const stagesItems = document.querySelectorAll('.stages__item');
        
        if ('IntersectionObserver' in window) {
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        item.style.animationName = 'showItem';
                        observer.unobserve(item);
                    }
                });
            };
            const observerOptions = {
                threshold: 0.25,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            stagesItems.forEach((item) => {
                observer.observe(item);
            });
        } else {
            stagesItems.forEach((item) => {
                item.style.animationName = 'showItem';
            });
        }
    });
};

export { StagesSection };
