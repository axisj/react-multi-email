import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '../components/Layouts';
import styled from '@emotion/styled';
import BodyRoot from '../components/BodyRoot';
import DisableOnBlurValidation from '../examples/DisableOnBlurValidation';

const Custom: NextPage = () => {
  return (
    <PageContainer>
      <Container>
        <div>
          <h2>DisableOnBlurValidation</h2>
          <p>If the DisableOnBlurValidation value is true, email validation is not performed as a blur event.</p>
          <DisableOnBlurValidation />
        </div>
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled(BodyRoot)``;

export default Custom;
