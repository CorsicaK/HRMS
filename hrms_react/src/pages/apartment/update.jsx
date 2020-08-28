import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

const Item = Form.Item

export default class Update extends Component {
  formRef = React.createRef();
  onFinish = (values) => {
    if (values) {
      this.props.update(values);
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
          initialValue={this.props.apartment.a_id}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门编号' }]}
        >
          <Input disabled style={{ width: 200 }}></Input>
        </Item>
        <Item
          label="部门名"
          name="a_name"
          initialValue={this.props.apartment.a_name}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门名' }]}
        >
          <Input style={{ width: 200 }}></Input>
        </Item>


        <Item
          label="部门主管"
          name="a_admin"
          initialValue={this.props.apartment.a_admin}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门主管' }]}
        >
          <Input style={{ width: 200 }} />
        </Item>

        <Item
          label="部门联系方式"
          name="iphone"
          initialValue={this.props.apartment.phone}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写部门联系方式' }]}
        >
          <Input placeholder="" style={{ width: 200 }} />
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
