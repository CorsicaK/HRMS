import React, { Component } from 'react'
import { Form, Input, Button, InputNumber } from 'antd';

const Item = Form.Item
const TextArea = Input.TextArea

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
          label="编号"
          name="ht_id"
          initialValue={this.props.highTempSalary.ht_id}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请输入类别名' }]}
        >
          <Input disabled style={{ width: 200 }}></Input>
        </Item>
        <Item
          label="类别"
          name="ht_name"
          initialValue={this.props.highTempSalary.ht_name}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请输入类别名' }]}
        >
          <Input style={{ width: 200 }}></Input>
        </Item>


        <Item
          label="发放标准(元/月)"
          name="ht_salary"
          initialValue={this.props.highTempSalary.ht_salary}
          style={{ fontSize: 30, fontWeight: "bold" }}
          rules={[{ required: true, message: '请填写金额' }]}
        >
          <InputNumber style={{ width: 200 }} onChange={this.onChange} />
        </Item>

        <Item
          label="适用范围"
          name="htrange"
          initialValue={this.props.highTempSalary.ht_range}
          style={{ fontSize: 30, fontWeight: "bold" }}
        >
          <TextArea placeholder="" style={{ width: 200 }} />
        </Item>
        <Item
          label="备注"
          name="htexplain"
          initialValue={this.props.highTempSalary.ht_explain}
          style={{ fontSize: 30, fontWeight: "bold" }}
        >
          <TextArea placeholder="" style={{ width: 200 }} />
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
