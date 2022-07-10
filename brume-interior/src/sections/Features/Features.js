import featuresHtml from './Features.html';
import './Features.scss';

const FeaturesSection = (container) => {
    container.innerHTML += featuresHtml;

    window.addEventListener('DOMContentLoaded', () => {
        const featuresItems = document.querySelectorAll('.features__item');

        /* smooth appearing on the screen */
        if ('IntersectionObserver' in window) {
            const observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const item = entry.target;
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                        observer.unobserve(item);
                    }
                });
            };
            const observerOptions = {
                threshold: 0.15,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            featuresItems.forEach((item) => {
                observer.observe(item);
            });
        } else {
            featuresItems.forEach((item) => {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            });
        }
    });
};

export { FeaturesSection };
