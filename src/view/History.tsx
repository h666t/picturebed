import React from 'react';
import { Empty} from 'antd';
import useStore from '../stores/indexStore';

import {observer} from 'mobx-react';
import HistoryResult from '../components/history/HistoryResult';
const History = observer( () => {

  const {Store} = useStore();

  return (
    <>
      {
        Store.AuthStore.values.username
          ? <HistoryResult/>
          :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  );
})

export default History