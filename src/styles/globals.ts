import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import './antd-theme.less';

import 'react-github-button/assets/style.css';

injectGlobal`
  ${styledNormalize}
 
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
`;
