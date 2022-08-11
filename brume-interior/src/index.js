// libraries
import 'core-js/actual';
import _ from 'lodash';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';
// styles
import './styles/styles.scss';
import './fonts/fonts.scss';

// sections
import { HeaderSection } from 'Sections/Header/Header';
import { IntroSection } from 'Sections/Intro/Intro';
import { FeaturesSection } from 'Sections/Features/Features';
import { PortfolioSection } from 'Sections/Portfolio/Portfolio';
import { ServicesSection } from 'Sections/Services/Services';
import { VideoSection } from 'Sections/VideoSection/VideoSection';
import { StagesSection } from 'Sections/Stages/Stages';
import { FormSection } from 'Sections/FormSection/FormSection';
import { TestimonialsSection } from 'Sections/Testimonials/Testimonials';
import { FooterSection } from 'Sections/Footer/Footer';
// components
import LazyLoad from 'Components/LazyLoad/LazyLoad';
import { PageLoader, HidePageLoader } from 'Components/PageLoader/PageLoader';

const bodyContainer = document.body;

PageLoader(bodyContainer);

const mainContainer = (container) => {
    // root container
    let mainTag = document.createElement('main');
    mainTag.className = 'main';
    // sections
    IntroSection(mainTag);
    FeaturesSection(mainTag);
    PortfolioSection(mainTag);
    ServicesSection(mainTag);
    VideoSection(mainTag);
    StagesSection(mainTag);
    FormSection(mainTag);
    TestimonialsSection(mainTag);

    return container.appendChild(mainTag);
};

// sections
HeaderSection(bodyContainer);
mainContainer(bodyContainer);
FooterSection(bodyContainer);

// components
document.addEventListener('DOMContentLoaded', () => {
    HidePageLoader(bodyContainer);
    LazyLoad();
});
