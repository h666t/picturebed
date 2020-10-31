import {observable, action} from 'mobx';

class UserStore {
  @observable user = ''

  @action setUser = (username: string) => {
    this.user = username
  }

  @action replaceUser = () => {
    this.user = ''
  }
}

export default new UserStore()