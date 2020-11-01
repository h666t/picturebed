import React, {useCallback} from 'react';
import {Icon} from './Icon';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { Button } from 'antd';
import useStore from '../stores';
import {observer} from 'mobx-react';
import lean from '../models/public';
import {log} from 'util';

const StyledHeader = styled.header`
  background: rgb(52,58,64);
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: space-between;
  >.left{
  display: flex;
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
        border-bottom: 1px solid transparent;
        &.active{
          border-bottom: 1px solid #fff;
        }
    }
  }
    >.right{
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
      <input type={'file'} onChange={(e)=>{
        lean.uploadImage('x',e.target.files![0]).then(()=>{console.log('success');}).catch(err=>{console.log(err);})
      }} />
      <div className="left">
        <Icon id={'#logo'} fill={'rgb(97,218,251)'}/>
        <NavLink to={'/'} exact>Home</NavLink>
        <NavLink to={'/about'} exact>About</NavLink>
        <NavLink to={'/history'} exact>History</NavLink>
      </div>
      {Store.UserStore.user === '' ?
        <div className="right">
          <Button type="primary" onClick={register}>注册</Button>
          <Button type="primary" onClick={login}>登录</Button>
        </div>
        :
        <div className="right">
          <span>你好，{Store.UserStore.user}</span>
          <Button type="primary" onClick={logout}>登出</Button>
        </div>
      }
    </StyledHeader>
  )
})

export {Header}