import  {createContext, useContext} from 'react';
import AuthStore from './authStore';
import imageStore from './imageStore';
const content = createContext({Store: {AuthStore,imageStore}});
const useStore = () => useContext(content);
export default useStore;