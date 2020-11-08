import React from 'react';
import styled from 'styled-components';
const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 100px;
  color: #aaa;
`
const Footer:React.FC = () => {
  return (
    <StyledFooter>© haotian</StyledFooter>
  )
}

export {Footer}