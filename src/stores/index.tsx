import  {createContext, useContext} from 'react';
import AuthStore from './auth';

const content = createContext({AuthStore: new AuthStore()});
const useStore = () => useContext(content);
export default useStore;