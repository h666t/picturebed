import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import useStore from '../../../stores/indexStore';

const { Dragger } = Upload;



const UploadAntd = () => {
  const {Store} = useStore()
  const beforeUpload = (file: any)=>{
      Store.imageStore.uploadImage(file.name,file)
        .then((serverFile)=>{console.log(serverFile);})
        .catch((error)=>{alert(JSON.stringify(error))})
      return false
    }

  return (
    <Dragger beforeUpload={beforeUpload} showUploadList={false} >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  )
}

export default UploadAntd