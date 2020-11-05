import React from 'react';
import { Upload ,message, Spin} from 'antd';
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
        <p className="ant-upload-text">点击或拖拽上传</p>
        <p className="ant-upload-hint">
          仅支持 png / jpeg / jpg / svg 格式图片
        </p>
      </Dragger>
    </Spin>
    </Wrapper>

  )
})

export default UploadAntd