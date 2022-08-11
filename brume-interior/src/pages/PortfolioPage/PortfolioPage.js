// styles
import '../../styles/styles.scss';
import '../../fonts/fonts.scss';
import './PortfolioPage.scss';
// sections
import { HeaderSection } from 'Sections/Header/Header';
import { FooterSection } from 'Sections/Footer/Footer';
// components
import { PageLoader, HidePageLoader } from 'Components/PageLoader/PageLoader';
import LazyLoad from 'Components/LazyLoad/LazyLoad';

const bodyContainer = document.body;

PageLoader(bodyContainer);

// sections
HeaderSection(bodyContainer, 'darkTheme');
FooterSection(bodyContainer);
document.body.insertBefore(document.querySelector('.header'), document.querySelector('.main'));

document.addEventListener('DOMContentLoaded', () => {
    HidePageLoader(bodyContainer);
    LazyLoad();
});
