import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import useStore from '../../../stores/indexStore';
import UploadAntd from './UploadAntd';
import styled from 'styled-components';
import Result from './Result';
const Wrapper = styled.div`
  >.tips{
    margin-top: 10px;
    margin-bottom: 10px;
    background:#F85 ;
    padding: 10px;
    color: white;
  }
`

const Upload = observer<React.FC> (() => {
  const {Store} = useStore()

  return (
    <Wrapper>
      {Store.AuthStore.values.username === ''
        ? <div className={'tips'}>请登录后使用</div>
        : undefined
      }
      <div>
        <UploadAntd/>
      </div>
      <div>
        {
          Store.imageStore.serverFile
            ?
            <Result/>
            : undefined
        }
      </div>
    </Wrapper>
  )
})

export default Upload