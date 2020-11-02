import {observable, action} from 'mobx';
import lean from '../models/public';
import {User} from 'leancloud-storage';
class AuthStore {
  @observable isLogin: boolean = false;
  @observable isLoading: boolean = false;
  @observable values: { username: string, password: string } = {
    username: (User.current() || {getUsername:()=>{return ''}}).getUsername() ,
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
      lean.logout().then(()=>{console.log('登出成功');})
      this.values.username = ''
      this.isLogin = false
  };
}

export default new AuthStore();