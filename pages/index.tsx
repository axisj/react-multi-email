import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '../components/Layouts';
import styled from '@emotion/styled';
import BasicExample from '../examples/BasicExample';
import BodyRoot from '../components/BodyRoot';

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Container>
        <div>
          <h2>Basic</h2>
          <BasicExample />
        </div>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled(BodyRoot)``;

export default Home;
