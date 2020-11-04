import React from 'react';
import { Upload ,message, Spin, Switch, Alert} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import useStore from '../../../stores/indexStore';
import styled from 'styled-components';
import {observer} from 'mobx-react';

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const { Dragger } = Upload;
const UploadAntd = observer(() => {
  const {Store} = useStore()
  const beforeUpload = (file: any)=>{
      Store.imageStore.uploadImage(file.name,file)
        .then((serverFile)=>{console.log(serverFile);})
        .catch((error)=>{message.warning(JSON.stringify(error),1)})
      return false
    }

  return (

    <Wrapper>
      <Spin spinning={Store.imageStore.isUploading}>
      <Dragger beforeUpload={beforeUpload} showUploadList={false}  >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </Spin>
    </Wrapper>

  )
})

export default UploadAntd