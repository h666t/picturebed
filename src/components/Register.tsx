import React  from 'react';
import {observer} from 'mobx-react';
import useStore from '../stores/indexStore';
import {Form, Input, Button,message } from 'antd';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'
const Wrapper = styled.div`
  >div{
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-width: 600px;
      box-shadow: 4px 5px 20px rgba(0,0,0,0.25);
      padding: 20px 20px;
      >div{
        text-align: center;
        padding: 20px;
        font-size: 28px;
      }
  }
`;

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};
const Register = observer<React.FC>(() => {
  const history = useHistory()
  const {Store} = useStore();
  const onFinish: (values: any) => void = values => { // 注册
    const {username} = values
    const {password} = values
    Store.AuthStore.register(username,password).then(()=>{
      console.log('注册成功');
      history.push('/login')
    },(err)=>{message.warning(err.rawMessage,1)})
  };

  const onFinishFailed: (errorInfo: any) => void = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  // @ts-ignore
  const confirmPasswordTwice = ({getFieldValue}) => ({
    validator(rule: any, value: any) {
      if (!value || value === getFieldValue('password')) {
        return Promise.resolve();
      }
        return Promise.reject('两次密码不完全相同');
    }
  });

  // @ts-ignore
  const validateUsername = (rule,value,callback) => {
    if(/\W/.test(value)) return Promise.reject('用户名只能为字母，数字，下划线，汉字')
    if (value.length < 4 || value.length > 6) return Promise.reject('用户名必须为4-6个字符')
    return Promise.resolve()
  }

  return (
    <Wrapper>
      <div>
        <div>注册</div>
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
            rules={[{required: true, message: '请输入用户名！'},{validator: validateUsername}]}
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

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{
              required: true,
              message: '请再次输入密码！',
              // @ts-ignore
            }, confirmPasswordTwice
            ]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  )
})

export default Register