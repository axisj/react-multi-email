import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '../components/Layouts';
import styled from '@emotion/styled';
import BodyRoot from '../components/BodyRoot';
import AsyncValidateExample from '../examples/AsyncValidateExample';

const Page: NextPage = () => {
  return (
    <PageContainer>
      <Container>
        <div>
          <h2>AsyncValidateExample</h2>
          <AsyncValidateExample />
        </div>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled(BodyRoot)``;

export default Page;
