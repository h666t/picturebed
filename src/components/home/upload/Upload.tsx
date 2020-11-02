import React from 'react';
import {observer} from 'mobx-react';
import useStore from '../../../stores/indexStore';
import UploadAntd from './UploadAntd';
import Loading from '../../Loading';
import styled from 'styled-components';
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
        <h1>上传结果：</h1>
        {Store.imageStore.isUploading ? <Loading/> : undefined}
        {
          Store.imageStore.serverFile
            ? <div>{Store.imageStore.serverFile.attributes.image.attributes.url}</div>
            : undefined
        }
      </div>
    </Wrapper>
  )
})

export default Upload