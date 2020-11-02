import {observable,action} from 'mobx';
import lean from '../models/public';
import AuthStore from './authStore'
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
      this.isUploading = true
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