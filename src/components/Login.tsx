import React, {useState} from 'react';
import {observer} from 'mobx-react';
import useStore from '../stores';
import {Form, Input, Button,} from 'antd';
import AuthStore from '../stores/auth';

const Login = observer<React.FC>(() => {
  const {AuthStore} = useStore();
  const [username, setUsername] = useState(AuthStore.values.username);
  const changeUsername = (name: string) => {
    AuthStore.setUsername(name);
    setUsername(name);
  };
  const onFinish: (values: any) => void = values => { //登录
    const {username, password} = values;
    AuthStore.login(username, password).then(() => {
      console.log('登录成功');
    });
  };

  const onFinishFailed: (errorInfo: any) => void = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  // @ts-ignore
  const validateUsername = (rule, value, callback) => {
    if (/\W/.test(value)) return Promise.reject('用户名只能为字母，数字，下划线，汉字');
    if (value.length < 4 || value.length > 6) return Promise.reject('用户名必须为4-6个字符');
    return Promise.resolve();
  };
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
  };
  const tailLayout = {
    wrapperCol: {offset: 4, span: 20},
  };
  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{required: true, message: '请输入用户名！'}, {validator: validateUsername}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {required: true, message: '请输入密码！'},
            {min: 4, message: '最少4个字符'}
          ]}
        >
          <Input.Password/>
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

export default Login