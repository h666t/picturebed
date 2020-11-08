import {List, Pagination} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import useStore from '../../stores/indexStore';
const Img = styled.img`
  object-fit: contain;
`
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

const A = styled.a`
  display: block;
  width:500px; 
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
  @media(max-width: 500px){
      width: 300px;
  }
`
const HistoryResult = observer (
  () => {
    const {Store} = useStore();
    const [current,setCurrent] = useState(1)
    const [length,setLength] = useState(0) //用于决定分页的大小
    useEffect(()=>{
      Store.imageStore.fetchHistoryStateLength().then((r:any)=>{setLength(r)})
    },[])
    useEffect(
      ()=>{Store.imageStore.fetchHistoryState(current - 1, 5,
        (x)=>{ setHistoryState(x)} )}, [current,Store.imageStore]
    )
    const [historyState,setHistoryState] = useState<{id:string,name:string,url:string,createdAt:any}[]>([])
    const onChange = (page: number) => {
      setCurrent(page)
    };
    return (
      <Wrapper>
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
                title={<A href={`${item.url}`}>{'文件名：' + item.name}</A>}
                description={
                  <div>
                    <div>创建时间：{JSON.stringify(dayjs(item.createdAt).format('YYYY年MM月DD日HH:mm'))}</div>
                    <div>url：{item.url}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Pagination className={'pages'} onChange={onChange} defaultCurrent={1} defaultPageSize={5} total={length}/>
      </Wrapper>
    )
  }
)

export default HistoryResult