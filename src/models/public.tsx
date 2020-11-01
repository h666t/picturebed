import AV from 'leancloud-storage';
AV.init({
  appId: "aCfxFc6z4zrzlKj3A4qvoBF9-gzGzoHsz",
  appKey: "05GM3tEaJPlqHlCh9LmO1BOr",
  serverURL: "https://acfxfc6z.lc-cn-n1-shared.com"
})
const lean = {
  register : (username: string,password: string)=>{
    return new Promise((resolve,reject)=>{
      const user = new AV.User()
      user.setUsername(username);
      user.setPassword(password);
      user.signUp().then(
        (user)=>resolve(user),
        (error)=> reject(error))
    })
  } ,

  login:(username: string,password: string)=>{
    return new  Promise((resolve, reject)=>{
      AV.User.logIn(username,password).then(
        (user)=>resolve(user),
        (error)=>reject(error))
    })
  },
  logout:()=>{
      return AV.User.logOut()
  },
  getUsername: ()=>{
    return  AV.User.current().getUsername();
  },
  uploadImage : (name: string,file: any)=>{
    return new Promise((resolve, reject)=>{
      const avFile = new AV.File(name,file)
      const Production = new AV.Object()
      Production.set('name',name)
      Production.set('owner',AV.User.current())
      Production.set('image',avFile)
      Production.save().then( ()=>resolve(),error=>reject(error) )
    })
  }
}

export default lean