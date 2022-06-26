import stagesHtml from './Stages.html';
import './Stages.scss';

const StagesSection = (container) => {
    container.innerHTML += stagesHtml;
};

export { StagesSection };
