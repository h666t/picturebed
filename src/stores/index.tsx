import  {createContext, useContext} from 'react';
import AuthStore from './auth';
import UserStore from './user'
const content = createContext({Store: {AuthStore, UserStore}});
const useStore = () => useContext(content);
export default useStore;