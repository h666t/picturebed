import React, {useEffect, useState} from 'react';
import {Pagination, message} from 'antd';
import useStore from '../stores/indexStore';

const History: React.FC = () => {
  const [current,setCurrent] = useState(1)
  const onChange = (page: number) => {
    setCurrent(page)
  };
  const {Store} = useStore();
  const [historyState,setHistoryState] = useState([])
  const [length,setLength] = useState(0) //用于决定分页的大小
  useEffect(()=>{
    Store.imageStore.fetchHistoryStateLength().then((r:any)=>{setLength(r)})
    console.log(length);
  },[])
  useEffect(
    ()=>{Store.imageStore.fetchHistoryState(current - 1, 10,
      // @ts-ignore
    (x)=>{ setHistoryState(x)} )}, [current,Store.imageStore]
  )

  return (
    <>
      {JSON.stringify(historyState)}
      <Pagination onChange={onChange}  total={length}/>
    </>
  );
};

export default History