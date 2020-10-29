import React, {useState} from 'react';
import {observer} from 'mobx-react';
import useStore from '../stores';
import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Register = observer<React.FC>(() => {
  const {AuthStore} = useStore()
  const [username,setUsername] = useState(AuthStore.values.username)
  const changeUsername = (name: string) => {
    AuthStore.setUsername(name)
    setUsername(name)
  }
  const onFinish:(values: any)=>void = values => {
    console.log('Success:', values);
  };

  const onFinishFailed:(errorInfo: any)=>void = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </>
  )
})

export default Register