import introHtml from './Intro.html';
import './Intro.scss';

const IntroSection = (container) => {
    container.innerHTML += introHtml;
};

export { IntroSection };
