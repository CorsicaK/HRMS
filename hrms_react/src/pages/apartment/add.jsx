import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

const Item = Form.Item
export default class Add extends Component {
  formRef = React.createRef();

  onFinish = (values) => {
    if (values) {
      this.props.add(values);
    }
    this.onReset()
  };
  onReset = () => {
    this.formRef.current.resetFields();
  };


  //值改变事件
  onChange = () => { }

  handleCancel = e => {
    this.props.handleCancel()
    this.onReset()
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form {...formItemLayout} ref={this.formRef} onFinish={this.onFinish} >
        <Item
          label="部门编号"
          name="a_id"
          initialValue=""
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门编号' }]}
        >
          <Input style={{ width: 200 }}></Input>
        </Item>

        <Item
          label="部门名"
          name="a_name"
          initialValue=""
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门名金额' }]}
        >
          <Input style={{ width: 200 }} />
        </Item>

        <Item
          label="部门主管"
          name="a_admin"
          initialValue=""
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门主管' }]}
        >
          <Input style={{ width: 200 }} />
        </Item>
        <Item
          label="部门联系方式"
          name="iphone"
          initialValue=""
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门联系方式' }]}
        >
          <Input style={{ width: 200 }} />
        </Item>
        <Item >
          <Button type="default" onClick={this.handleCancel}>取消</Button>
          &nbsp;&nbsp;
          <Button type="primary" htmlType="submit">提交</Button>
        </Item>

      </Form>
    )
  }
}
