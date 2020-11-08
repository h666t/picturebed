import React, {useEffect, useState} from 'react';
import { Empty} from 'antd';
import useStore from '../stores/indexStore';

import {observer} from 'mobx-react';
import HistoryResult from '../components/history/HistoryResult';
    const History = observer( () => {
    const {Store} = useStore();
    const [isHasHistoryData, setIsHasHistoryData] = useState(false) // 用于判断是否有历史数据
    useEffect(()=>{
        Store.imageStore.fetchHistoryStateLength().then((r)=>{
            // @ts-ignore
          setIsHasHistoryData( r > 0 )
        })
    })
  return (
    <>
      {
        Store.AuthStore.values.username && isHasHistoryData
          ? <HistoryResult/>
          :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  );
})

export default History