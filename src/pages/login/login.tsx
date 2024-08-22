import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import '../../_mock/index'
import './login.scss'
import axios from 'axios';
import {LoginParams,IGlobalState} from "../../type"
import Api from '../../api'
import { useDispatch,useSelector } from 'dva';

const App: React.FC = () => {
	 const dispatch = useDispatch()
	 const  globalState = useSelector<{global:IGlobalState},IGlobalState>(
	 ({global})=>global
	 )
  const onFinish = async (values: LoginParams) => {
	 
    console.log('Success:', values);
	let data = await Api.login(values)
	dispatch({
		type:'global/setUserInfo',
		payload:data
	})
	console.log(data)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
  <div className="login">
  
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
	</div>
  );
};

export default App;