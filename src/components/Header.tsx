import React, {useCallback, useEffect, useState} from 'react';
import {Icon} from './Icon';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { Button } from 'antd';
import useStore from '../stores/indexStore';
import {observer} from 'mobx-react';

const StyledHeader = styled.header`
  background: rgb(52,58,64);
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: space-between;
  @media(max-width: 500px){
    padding: 10px;
  }
  >.left{
  display: flex;
  align-items: center;
      >.icon{
        padding: 0;
        width: 64px;
        height: 64px;
        @media(max-width: 500px){
            width: 32px;
            height: 32px;
         }
        margin-right: 20px;
      }
      >a{
      @media(max-width: 500px){
            font-size: 12px;
         }
        color: #fff;
        margin-right: 10px;
        border-bottom: 1px solid transparent;
        &.active{
          border-bottom: 1px solid #fff;
        }
    }
  }
    >.right{
    @media(max-width: 500px){
            font-size: 12px;
         }
      >button{
        border-radius: 5px;
        padding: 4px 10px;
      }
      >button:nth-child(1){
        margin-right: 5px;
      }
      >button:nth-child(2){
        margin-left: 5px;
      }
      >span{
        color: #fff;
        margin-right: 10px;
      }
  }
`
const Header = observer<React.FC>(() => {
  const {Store} = useStore()
  const history = useHistory()
  const register = () => {
    history.push('/register')
  }
  const login = () => {
    history.push('/login')
  }
  const logout = () => {
    Store.AuthStore.logout()
  }
  return (
    <StyledHeader>
      <div className="left">
        <Icon id={'#logo'} fill={'rgb(97,218,251)'}/>
        <NavLink to={'/'} exact>首页</NavLink>
        <NavLink to={'/about'} exact>关于</NavLink>
        <NavLink to={'/history'} exact>历史</NavLink>
      </div>
      {Store.AuthStore.values.username === '' ?
        <div className="right">
          <Button type="primary" onClick={register}>注册</Button>
          <Button type="primary" onClick={login}>登录</Button>
        </div>
        :
        <div className="right">
          <span>你好，{Store.AuthStore.values.username}</span>
          <Button type="primary" onClick={logout}>登出</Button>
        </div>
      }
    </StyledHeader>
  )
})

export {Header}