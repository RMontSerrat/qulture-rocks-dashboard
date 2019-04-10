import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  align-items: center;
  h1 {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: 0;
  }
`

const Header = ({ renderActions, title }) => (
  <StyledHeader>
    {title.nodeType ? title : <h1>{title}</h1>}
    {renderActions}
  </StyledHeader>
)

export default Header;
