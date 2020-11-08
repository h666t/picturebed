import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading = (props:React.HTMLAttributes<HTMLSpanElement>) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <Div {...props}>
      <Spin indicator={antIcon} />
    </Div>

  )
}

export default Loading