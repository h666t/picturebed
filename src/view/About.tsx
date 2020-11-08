import React from 'react';
import { Descriptions } from 'antd';
const About: React.FC = () => {
  return (
    <>  <Descriptions title="关于">
      <Descriptions.Item label="作者：">haotian</Descriptions.Item>
      <Descriptions.Item label="GitHub"><a href="https://github.com/h666t/picturebed">https://github.com/h666t/picturebed</a></Descriptions.Item>
      <Descriptions.Item label="基于">React,antd</Descriptions.Item>
    </Descriptions></>
  )
}
export default About



