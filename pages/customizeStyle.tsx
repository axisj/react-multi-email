import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '../components/Layouts';
import styled from '@emotion/styled';
import BodyRoot from '../components/BodyRoot';
import CustomizeStyleExample from '../examples/CustomizeStyleExample';

const Custom: NextPage = () => {
  return (
    <PageContainer>
      <Container>
        <div>
          <h2>CustomizeStyle</h2>
          <CustomizeStyleExample />
        </div>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled(BodyRoot)``;

export default Custom;
