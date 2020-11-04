import {observable,action} from 'mobx';
import lean from '../models/public';
import {message} from 'antd'
import {User} from 'leancloud-storage';

class imageStore {
  @observable file = null
  @observable filename = ''
  @observable serverFile: any = null
  @observable isUploading = false

  @action uploadImage = (name: string,file: any) => {
    return new Promise((resolve, reject)=>{
      if (!User.current()){
        message.warning('请先登录',1)
        return
      }
      if (!/(\.png$)|(\.jpeg$)|(\.jpg$)|(\.svg$)/ig.test(file.name)){
        message.error('仅支持 png / jpeg / jpg / svg 格式图片')
        return;
      }
      if (file.size > 1024*1024){
        message.error('仅支持1M以下图片')
        return;
      }
      this.isUploading = true
      this.serverFile = null
      lean.uploadImage(name,file).then((serverFile)=>{
        this.file = file
        this.serverFile = serverFile
        this.filename = name
        resolve(serverFile)
      }).catch(err=>{
        message.warning('上传失败',1)
        reject(err)
      }).finally(()=>{this.isUploading = false})
    })
  }
}
export default new imageStore()