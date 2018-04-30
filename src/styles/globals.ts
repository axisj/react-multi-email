import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import './styles.scss';
import 'react-github-button/assets/style.css';

injectGlobal`
  ${styledNormalize}
`;
