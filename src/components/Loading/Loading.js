import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const sizes = {
  small: 18,
  medium: 40,
  large: 60,
}

const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => `${sizes[props.size]}px`};
  height: ${props => `${sizes[props.size]}px`};
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => `${sizes[props.size]}px`};
    height: ${props => `${sizes[props.size]}px`};
    border: ${props => `${sizes[props.size]/16}px solid ${props.color}`};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props => `${props.color} transparent transparent transparent`};
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
  animation-delay: -0.15s;
  }
  
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loading = ({ size = 'large', color = '#bababa' }) => (
  <StyledLoading size={size} color={color} className="Loading">
    <div />
    <div />
    <div />
    <div />
  </StyledLoading>
)

Loading.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
  color: PropTypes.string,
}

export default Loading;
