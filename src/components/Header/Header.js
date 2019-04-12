import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
`

const Header = ({ renderActions, title }) => (
  <StyledHeader>
    {title.nodeType ? title : <Title>{title}</Title>}
    {renderActions}
  </StyledHeader>
)

Header.propTypes = {
  renderActions: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

export default Header;
