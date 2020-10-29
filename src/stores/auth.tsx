import {observable, action} from 'mobx';

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
    this.values.username = value;
  };

  @action setPassword = (value: string) => {
    this.values.password = value;
  };

  @action login() {
    this.isLoading = true;
    console.log('登录中...');
    setTimeout(() => {
      this.isLogin = true;
      this.isLoading = false;
    }, 1000);
  }

  @action register() {
    this.isLoading = true;
    console.log('注册中...');
    setTimeout(() => {
      this.isLoading = false;
      this.isLogin = true;
    }, 1000);
  }

  @action logout = () => {
    console.log('已注销');
  };
}

export default AuthStore;