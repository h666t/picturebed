import React, {ChangeEvent} from 'react';
import useStore from '../../stores/indexStore';

const Upload = () => {
  const {Store} = useStore()
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
      const file = e.target.files[0]
      Store.imageStore.uploadImage(file.name,file).then(()=>{
        console.log('上传成功');
        console.log(Store.imageStore.serverFile);
      }).catch(err=>{console.log(JSON.stringify(err));})
    }
  }
  return (
    <div>
      <input type="file" onChange={(e)=>{
        onChange(e)
      }}/>
    </div>
  )
}

export default Upload