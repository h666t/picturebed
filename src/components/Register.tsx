import React, {useState} from 'react';
import {observer} from 'mobx-react';
import useStore from '../stores';

const Register = observer<React.FC>(() => {
  const {AuthStore} = useStore()
  const [username,setUsername] = useState(AuthStore.values.username)
  const changeUsername = (name: string) => {
    AuthStore.setUsername(name)
    setUsername(name)
  }
  return (
    <>
      Register : {username}
      <input type="text" onChange={(e)=>{changeUsername(e.target.value)}}/>
    </>
  )
})

export default Register