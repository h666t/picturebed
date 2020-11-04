import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const Loading = (props:React.HTMLAttributes<HTMLSpanElement>) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <span {...props}>
      <Spin indicator={antIcon} />
    </span>

  )
}

export default Loading