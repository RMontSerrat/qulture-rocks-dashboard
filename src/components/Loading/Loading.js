import React from 'react';
import './Loading.css';
import styled from 'styled-components';

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border: ${props => `${props.size/8}px solid ${props.color}`};
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

const getSize = size => {
  switch (size) {
    case 'small':
      return 18;
    case 'medium':
      return 40;
    case 'large':
      return 60;
    default:
      return 60;
  }
}

const StyledLoading = ({ size = 'large', color = '#bababa' }) => (
  <Loading size={getSize(size)} color={color} className="Loading">
    <div />
    <div />
    <div />
    <div />
  </Loading>
)

export default StyledLoading;
