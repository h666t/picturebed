import React, {useEffect, useState} from 'react';
import {Pagination, Empty,List,Avatar } from 'antd';
import useStore from '../stores/indexStore';
import {User} from 'leancloud-storage';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {observer} from 'mobx-react';

const Wrapper = styled.div`
  max-width: 500px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  >.pages{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
`
const Img = styled.img`
  object-fit: contain;
`

const History = observer( () => {
  const [current,setCurrent] = useState(1)
  const onChange = (page: number) => {
    setCurrent(page)
  };
  const {Store} = useStore();
  const [historyState,setHistoryState] = useState<{id:string,name:string,url:string,createdAt:any}[]>([])
  const [length,setLength] = useState(0) //用于决定分页的大小
  useEffect(()=>{
    Store.imageStore.fetchHistoryStateLength().then((r:any)=>{setLength(r)})
  },[])
  useEffect(
    ()=>{Store.imageStore.fetchHistoryState(current - 1, 5,
      (x)=>{ setHistoryState(x)} )}, [current,Store.imageStore]
  )

  return (
    <>
      {
        Store.AuthStore.values.username && historyState.length > 0
          ? <Wrapper>
            <List
              itemLayout="horizontal"
              dataSource={historyState}
              split={true}
              loading={Store.imageStore.isHistoryDataLoading}
              renderItem={item => (
                <List.Item key={item.id}
                           extra={
                             <Img
                               width={50}
                               height={50}
                               alt="logo"
                               src={item.url}
                             />
                           } >
                  <List.Item.Meta
                    title={<a href="https://ant.design">{'文件名：' + item.name}</a>}
                    description={
                      <div>
                        <div>创建时间：{JSON.stringify(dayjs(item.createdAt).format('YYYY年MM月DD日hh:mm'))}</div>
                        <div>url：{item.url}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Pagination className={'pages'} onChange={onChange} defaultCurrent={1} defaultPageSize={5} total={length}/>
          </Wrapper>
          :<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      }
    </>
  );
})

export default History