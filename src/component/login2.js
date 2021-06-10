import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {history} from '../utils/history';
import { Form, Input, Button, Checkbox,Card ,Space} from 'antd';
import * as userService from "../service/userService";
const layout = {

    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export class Login extends React.Component{
    constructor() {
        super();
    }
     onFinish = (values) => {
        console.log('Success:', values);
        let submit={
            username:values.username,
            password: values.password
        }
         userService.login(values);
    };

     onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
   render() {
       return (
           <div>
           <Form
               {...layout}
               name="basic"
               justify="center"

               initialValues={{
                   remember: true,
               }}
               onFinish={this.onFinish}
               onFinishFailed={this.onFinishFailed}
           >
               <Form.Item
                   label="Username"
                   name="username"
                   rules={[
                       {
                           required: true,
                           message: 'Please input your username!',
                       },
                   ]}
               >
                   <Input/>
               </Form.Item>

               <Form.Item
                   label="Password"
                   name="password"
                   rules={[
                       {
                           required: true,
                           message: 'Please input your password!',
                       },
                   ]}
               >
                   <Input.Password/>
               </Form.Item>

               <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                   <Checkbox>Remember me</Checkbox>
               </Form.Item>

               <Form.Item {...tailLayout}>
                   <Button type="primary" htmlType="submit">
                       登录
                   </Button>
                   <Space/>
                   <Button type="primary" >
                       <a href="/register">注册</a>
                   </Button>
               </Form.Item>
           </Form>
           </div>
       )
   }
};