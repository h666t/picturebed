import React, {useState} from 'react';
import {Icon} from './Icon';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import { Button } from 'antd';

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

const Header:React.FC = () => {
  const [x,setX] = useState<boolean>(false)
  const history = useHistory()
  const register = () => {
    history.push('/register')
  }
  const login = () => {
    history.push('/login')
    setX(true)
  }

  const logout = () => {
      setX(false)
  }
  return (
    <StyledHeader>
      <div className="left">
        <Icon id={'#logo'} fill={'rgb(97,218,251)'}/>
        <NavLink to={'/'} exact>Home</NavLink>
        <NavLink to={'/about'} exact>About</NavLink>
        <NavLink to={'/history'} exact>History</NavLink>
      </div>
      {x ?
        <div className="right">
        <span>昊天</span>
        <Button type="primary" onClick={logout}>登出</Button>
      </div>
        :
        <div className="right">
          <Button type="primary" onClick={register}>注册</Button>
          <Button type="primary" onClick={login}>登录</Button>
        </div>
      }
    </StyledHeader>
  )
}

export {Header}