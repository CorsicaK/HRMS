import React, { Component } from 'react'
import './register.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { regRegister } from '../../api'

/* 注册的路由组件 */
const Item = Form.Item;
export default class Register extends Component {
  onFinish = async (values) => {
    if (values) {
      const { uId, psd } = values
      let u_id = parseInt(uId)
      const register = { u_id, psd }
      const response = await regRegister(register)
      const result = response.data
      console.log(result)
      if (result) {
        message.success('注册成功')
        // window.location.replace('/login')
      } else {
        message.error('注册失败')
      }
    } else {
      console.log('检验失败')
    }
  }
  render() {
    return (
      <div className="register">
        <header className="register-header">
        </header>
        <section className="register-content">

          <h2>用户注册</h2>
          <Form
            name="normal_register"
            className="register-form"
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
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                注册
               </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
