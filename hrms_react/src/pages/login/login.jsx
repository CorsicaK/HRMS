import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { regLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

/* 登录的路由组件 */
const Item = Form.Item;

export default class Login extends Component {

  onFinish = async (values) => {
    if (values) {
      const { uId, psd } = values
      let u_id = parseInt(uId)
      const login = { u_id, psd }
      const response = await regLogin(login)
      const result = response.data
      // console.log(result)
      if (result) {
        message.success('登录成功')
        const user = login
        memoryUtils.user = user
        storageUtils.saveUser(user)
        window.location.replace('/')

      } else {
        message.error(result.msg)
      }
    } else {
      console.log('检验失败')
    }
  }
  render() {
    //如果用户已经登录,自动跳转到管理界面
    const user = memoryUtils.user
    if (user && user.u_id) {
      return <Redirect to='/' />
    }
    return (
      <div className="login">
        <header className="login-header">
        </header>
        <section className="login-content">

          <h2>人力资源系统登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Item name="uId" rules={[{ required: true, message: '账号不能为空!', },]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号"
              />
            </Item>
            <Item name="psd" rules={[
              { required: true, message: '密码不能为空!', },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '密码格式错误', },
            ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                autoComplete="true"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
               </Button> 
               {/* <Button type="primary" className="login-form-button" >
                注册
               </Button> */}
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
