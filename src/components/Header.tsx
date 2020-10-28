import React from 'react';
import {Icon} from './Icon';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components'

const StyledHeader = styled.header`
  background: rgb(52,58,64);
  display: flex;
  padding: 10px 50px;
  align-items: center;
  >.icon{
    padding: 0;
    width: 64px;
    height: 64px;
    margin-right: 20px;
  }
  >a{
    color: #fff;
    margin-right: 10px;
    &.active{
      border-bottom: 1px solid #fff;
    }
  }
`

const Header:React.FC = () => {
  return (
    <StyledHeader>
      <Icon id={'#logo'} fill={'rgb(97,218,251)'}/>
      <NavLink to={'/'} exact>Home</NavLink>
      <NavLink to={'/about'} exact>About</NavLink>
      <NavLink to={'/history'} exact>History</NavLink>
    </StyledHeader>
  )
}

export {Header}