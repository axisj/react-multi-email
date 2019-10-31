import { createGlobalStyle } from 'styled-components';

import './antd-theme.less';

export const GlobalStyles = createGlobalStyle`
  .clearfix:before, .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  html, body{
    height: 100%;
    
  }
`;
