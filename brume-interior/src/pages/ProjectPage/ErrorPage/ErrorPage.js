import errorPageHtml from './ErrorPage.html';
import './ErrorPage.scss';

const ErrorPage = (container, error) => {
    container.innerHTML = errorPageHtml;

    const errorInfo = document.querySelector('.errorPage__errInfo');
    errorInfo.innerHTML += error;
};

export { ErrorPage };
