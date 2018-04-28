import * as React from 'react';
import 'styles/globals';
import { ReactMultiEmail } from 'react-multi-email';

interface IProps {}

class Index extends React.Component<IProps> {
  render() {
    return (
      <>
        TEST
        <ReactMultiEmail />
      </>
    );
  }
}

export default Index;
