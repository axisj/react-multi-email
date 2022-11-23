import styled from '@emotion/styled';
import React from 'react';
import Nav from './Nav';

interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <SContainer>
      <Nav />
      {children}
    </SContainer>
  );
};

const SContainer = styled.div``;
