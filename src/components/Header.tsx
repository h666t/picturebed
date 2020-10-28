import React from 'react';
import {Icon} from './Icon';
import {Link} from 'react-router-dom'


const Header:React.FC = () => {
  return (
    <>
      {/*<Icon id={'#logo'} fill={'rgb(97,218,251)'}/>*/}
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>about</Link>
      <Link to={'/history'}>history</Link>
    </>
  )
}

export {Header}