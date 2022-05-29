// libraries
import 'core-js/actual';
import _ from 'lodash';
// sections
import { HeaderSection } from 'Sections/Header/Header';
// components
import LazyLoad from 'Components/LazyLoad/LazyLoad';
// styles
import './styles/styles.scss';
import './fonts/fonts.scss';

const body = document.body;

HeaderSection(body);
LazyLoad();
