import {observable,action} from 'mobx';
import lean from '../models/public';
import {message} from 'antd'
import {User} from 'leancloud-storage';
import AV from 'leancloud-storage'
import dayjs from 'dayjs';



class imageStore {
  @observable file = null
  @observable filename = ''
  @observable serverFile: any = null
  @observable isUploading = false
  @observable isHistoryDataLoading = false

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
        console.log(this.serverFile);
        this.filename = name
        resolve(serverFile)
      }).catch(err=>{
        message.warning('上传失败',1)
        reject(err)
      }).finally(()=>{this.isUploading = false})
    })
  }

  @action fetchHistoryStateLength(){
    const query = new AV.Query('Image')
    query.include('owner')
    query.equalTo('owner',User.current())
    return new Promise((resolve, reject)=>{
      query.find().then((r)=>{
        resolve(r.length)
      }).catch(err=>{console.log(err);})
    })
  }

  @action find({page=0,limit=5}){
    this.isHistoryDataLoading = true
    const query = new AV.Query('Image')
    query.include('owner')
    query.equalTo('owner',User.current())
      query.limit(limit)
      query.skip(page*limit)
      query.descending('createdAt');
      return new Promise((resolve, reject)=>{
        query.find()
          .then((result)=>{console.log(result); resolve(result)})
          .catch((err)=>{reject(err);})
          .finally(()=>{this.isHistoryDataLoading = false})
    })
  }

  @action fetchHistoryState(page:number,limit:number,fn:(r:{id:string,name:string,url:string,createdAt:any}[])=>void){
    this.find({page, limit})
      .then((r : any)=>{
        const result:any = []
        r.forEach((item:any) => {
          const {url,name,id} = item.attributes.image.attributes
          const {createdAt} = item
          result.push({url,name,id,createdAt});
        })
        fn(result)
        console.log(r);
      })
      .catch(err => message.error('获取历史记录失败'));
  }
}
export default new imageStore()