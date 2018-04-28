import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import './styles.scss';

injectGlobal`
  ${styledNormalize}
`;
