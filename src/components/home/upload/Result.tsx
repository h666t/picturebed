import React, {useEffect, useState} from 'react';
import { Collapse,InputNumber } from 'antd';
import useStore from '../../../stores/indexStore';
import styled from 'styled-components';
const Wrapper = styled.div`
  >.pic{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    overflow: auto;
  }
  >.inputs{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >span:nth-child(1){
          font-weight: bold;
          margin-right: 10px;
        }
    >div{
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        >div:nth-child(1){
          margin-right: 10px;
        }
        >div:nth-child(2){
          margin-left: 10px;
        }
    }
    
  }
`
const { Panel } = Collapse;

const Result = () => {
  const {Store} = useStore()
  const [size,setSize] = useState([500,500])
  function changeWidth(value: any) {
    setSize(i => [i[0],value])
  }
  function changeHeight(value: any) {
    setSize(i => [value,i[1]])
  }
  return (
    <Wrapper>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="a标签" key="1">
          <p>{ `<a href=${Store.imageStore.serverFile.attributes.image.attributes.url} > </a>`}</p>
        </Panel>
        <Panel header="链接" key="2">
          <p>{Store.imageStore.serverFile.attributes.image.attributes.url}</p>
        </Panel>
        <Panel header="自定义宽高链接" key="3">
          <p>{Store.imageStore.serverFile.attributes.image.attributes.url+`?imageView2/0/h/${size[0]}/w/${size[1]}`}</p>
        </Panel>
      </Collapse>
      <div className={'inputs'}>
        <span>自定义宽高</span>
        <div>
          <div>
            <span>宽度：</span>
            <InputNumber min={0} placeholder={'默认500'}  onChange={changeWidth} />
          </div>
          <div>
            <span>高度：</span>
            <InputNumber min={0} placeholder={'默认500'}  onChange={changeHeight} />
          </div>
        </div>
      </div>
      <div className={'pic'}>
        <img src={Store.imageStore.serverFile.attributes.image.attributes.url} alt=""/>
      </div>
    </Wrapper>

  )
}


export default Result



