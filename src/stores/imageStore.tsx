import {observable,action} from 'mobx';
import lean from '../models/public';

class imageStore {
  @observable file = null
  @observable filename = ''
  @observable serverFile: any = null
  @observable isUploading = false

  @action uploadImage = (name: string,file: any) => {
    return new Promise((resolve, reject)=>{
      lean.uploadImage(name,file).then((serverFile)=>{
        this.isUploading = true
        this.file = file
        this.serverFile = serverFile
        this.filename = name
        resolve(serverFile)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
export default imageStore