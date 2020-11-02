import React from 'react';
import {observer} from 'mobx-react';
import useStore from '../../../stores/indexStore';
import UploadAntd from './UploadAntd';

const Upload = observer<React.FC> (() => {
  const {Store} = useStore()
  console.log(Store.imageStore.serverFile.attributes.image.attributes.url);
  return (
    <div>
      <UploadAntd/>
      <div>
        <h1>上传结果：</h1>
        {
          Store.imageStore.serverFile
            ? <div>{Store.imageStore.serverFile.attributes.image.attributes.url}</div>
            : undefined
        }
      </div>
    </div>
  )
})

export default Upload