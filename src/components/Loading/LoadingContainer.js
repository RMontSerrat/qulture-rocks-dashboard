import React from 'react';
import styled from 'styled-components';
import Loading from './Loading';

const StyledLoadingContainer = styled.div`
  .Loading {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`

const LoadingContainer = () => (
  <StyledLoadingContainer>
    <Loading />
  </StyledLoadingContainer>
);

export default LoadingContainer;