import {observable, action} from 'mobx';
import lean from '../models/public';
import UserStore from './user'
class AuthStore {
  @observable isLogin: boolean = false;
  @observable isLoading: boolean = false;
  @observable values: { username: string, password: string } = {
    username: '',
    password: ''
  };

  @action setIsLogin = (value: boolean) => {
    this.isLogin = value;
  };

  @action setUsername = (value: string) => {
    this.values.username =  value
  };

  @action setPassword = (value: string) => {
    this.values.password = value;
  };

  @action login(username:string,password:string) {
   this.isLoading = true;
    return new Promise((resolve, reject)=>{
      lean.login(username,password).then((user)=>{
        this.isLoading = false;
        this.isLogin = true;
        this.setUsername(username)
        this.setPassword(password)
        UserStore.setUser(username)
        resolve(user)
      }).catch((error)=>{
        reject(error)
      })
    })
  }

  @action register(username:string,password:string) {
    this.isLoading = true;
    return new Promise((resolve, reject)=>{
      lean.register(username,password).then((user)=>{
        this.isLoading = false
        resolve(user)
      }).catch((error)=>{
        reject(error)
      })
    })
  }

  @action logout = () => {
    if (this.isLogin){
      lean.logout().then(()=>{console.log('登出成功');})
      UserStore.replaceUser()
    }
  };
}

export default new AuthStore();