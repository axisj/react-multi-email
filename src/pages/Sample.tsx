import * as React from 'react';

import { styled, StyledContainer } from 'styledComponents';
import 'react-multi-email/style.css';
import { Basic, CustomizeStyle } from 'samples';
import { CodeViewer } from 'components';

const basicRaw = require('!raw-loader!../samples/Basic.tsx');
const customizeStyleRaw = require('!raw-loader!../samples/CustomizeStyle.tsx');
const axuiLogo = require('assets/axui-logo.png');
const GitHubButton = require('react-github-button');

const Component = styled.div`
  .app-header {
    background: #333;
    color: #fff;
    padding-top: 1em;
    padding-bottom: 3em;
    margin-bottom: 2em;

    .logo-img {
      width: 100px;
      img {
        width: 100%;
        display: block;
      }
    }
    h1 {
      color: #fff;
      font-size: 36px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      font-family: 'Montserrat', sans-serif;
      margin: 0.2em 0;
    }

    .github-btn {
      .gh-count {
        margin-right: 1em;
      }
    }

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

interface IProps {}
interface IState {}
class Index extends React.Component<IProps, IState> {
  render() {
    return (
      <Component>
        <header className={'app-header'}>
          <StyledContainer>
            <div className={'logo-img'}>
              <img src={axuiLogo} />
            </div>
            <h1>react-multi-email</h1>
            <div>
              <GitHubButton
                type="stargazers"
                namespace="axui"
                repo="react-multi-email"
              />{' '}
              <GitHubButton
                type="forks"
                namespace="axui"
                repo="react-multi-email"
              />
            </div>
          </StyledContainer>
        </header>

        <StyledContainer>
          <h2>Installation</h2>

          <CodeViewer>npm install react-multi-email -S</CodeViewer>

          <CodeViewer
            code={`
import 'react-multi-email/style.css';
import { ReactMultiEmail } from 'react-multi-email';
`}
          />

          <h2>basic</h2>
          <Basic />

          <CodeViewer code={basicRaw} />

          <h2>customize style</h2>
          <CustomizeStyle />

          <CodeViewer code={customizeStyleRaw} />
        </StyledContainer>
      </Component>
    );
  }
}

export default Index;
