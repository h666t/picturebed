import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import useStore from '../../../stores/indexStore';
import UploadAntd from './UploadAntd';
import Loading from '../../Loading';
import styled from 'styled-components';
import {Input} from 'antd'
const Wrapper = styled.div`
  >.tips{
    margin-top: 10px;
    margin-bottom: 10px;
    background:#F85 ;
    padding: 10px;
    color: white;
  }
`
const Result = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  >strong{
    padding: 10px;
  }
`

const Item = styled.div`
  margin-bottom: 10px;
  
`

const Upload = observer<React.FC> (() => {
  const {Store} = useStore()
  useEffect(()=>{
    console.log(Store.imageStore.serverFile);
  })
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
        {Store.imageStore.isUploading ? <Loading/> : undefined}
        {
          Store.imageStore.serverFile
            ?
            <Result>
                <strong>上传结果：</strong>
              <Item>
                <span>HTML：</span>
                <Input  value={ `<a href=${Store.imageStore.serverFile.attributes.image.attributes.url} > </a>` } />
              </Item>
              <Item>
                <span>Link only：</span>
                <Input  value={ `${Store.imageStore.serverFile.attributes.image.attributes.url}` } />
              </Item>
            </Result>
            : undefined
        }
      </div>
    </Wrapper>
  )
})

export default Upload