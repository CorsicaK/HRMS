import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message, DatePicker, Cascader, Row, Col } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import moment from 'moment';
import { reqApartments, reqUpdateStaff, reqAddStaff } from '../../api'

const { Option } = Select;
const Item = Form.Item
const TextArea = Input.TextArea

/* 员工的添加和更新的子路由组件 */
export default class StaffAddUpdate extends Component {
  state = {
    options: [],
  };

  initOptions = (apartments) => {
    const options = apartments.map(a => ({
      value: a.a_id,
      label: a.a_name,
    }))
    this.setState({
      options
    })
  }

  /* 获取部门分类列表 */
  getApartments = async () => {
    const result = await reqApartments()
    if (result.data) {
      const apartments = result.data
      this.initOptions(apartments)
    }
  }

  onFinish = async (values) => {
    if (values) {
      const { isUpdate, s_id, s_name, aid, education, duty, card_id, intime, stype, phone, nation, gender, marry, political, area, birthday, toregulartime, quittime, retiretime, other } = values
      let a_id=aid[0]
      let birth = isUpdate ? birthday._i : birthday.format('YYYY-MM-DD')
      let in_time = isUpdate ? intime._i : intime.format('YYYY-MM-DD')
      let toregular_time = isUpdate ? (toregulartime ? toregulartime._i : undefined) : (toregulartime ? toregulartime.format('YYYY-MM-DD') : undefined)
      let quit_time = isUpdate ? (quittime ? quittime._i : undefined) : (quittime ? quittime.format('YYYY-MM-DD') : undefined)
      let retire_time = isUpdate ? (retiretime ? retiretime._i : undefined) : (retiretime ? retiretime.format('YYYY-MM-DD') : undefined)
      const staff = { s_id, s_name, a_id, education, duty, card_id, in_time, stype, phone, nation, gender, marry, political, area, birth, toregular_time, quit_time, retire_time, other }
      let result
      if (isUpdate) {
        result = await reqUpdateStaff(staff)
      } else {
        result = await reqAddStaff(staff)
      }

      if (result.data) {
        message.success(`${isUpdate ? '更新员工信息' : '添加员工'}成功!`)
        window.location.replace('/staff')
      } else {
        message.error(`${isUpdate ? '更新员工信息' : '添加员工'}失败!`)
      }
    }
  };


  //select
  handleChange = () => { }
  //时间点击事件
  chooseTime = () => { }
 //级联选择事件
  cascaderChange = () => {}

  componentDidMount() {
    this.getApartments()
  }

  componentWillMount() {
    const staff = this.props.location.state
    //更新的标识
    this.isUpdate = !!staff
    //保存员工信息
    this.staff = staff || {}
  }
  render() {
    const { isUpdate, staff } = this
    const { s_name } = staff

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>{isUpdate ? '修改员工：' + s_name + '的信息' : '添加员工'}</span>
      </span>
    )

    const formItemLayout = {
      labelCol: { span: 4, },
      wrapperCol: { span: 8, },
    };

    return (
      <Card title={title}>
        <Form  {...formItemLayout} onFinish={this.onFinish}>
          <Row>
            <Col span={12}>

              <Item
                label="员工编号"
                name="s_id"
                initialValue={staff.s_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工编号' }]}
              >
                <Input disabled={staff.s_id ? true : false} style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="员工姓名"
                name="s_name"
                initialValue={staff.s_name}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工姓名' }]}
              >
                <Input placeholder="请输入员工姓名" style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="所属部门"
                name="aid"
                initialValue={[staff.a_id]}
                style={{ fontSize: 30, fontWeight: "bold" }}
                onChange={this.cascaderChange}
                rules={[{ required: true, message: '请选择部门' }]}
              >
                <Cascader
                  style={{ width: 450 }}
                  // matchInputWidth="true"
                  placeholder="请指定所属部门"
                  options={this.state.options}  
                />
              </Item>


              <Item
                label="学历"
                name="education"
                initialValue={staff.education}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工学历' }]}
              >
                <Select
                  style={{ width: 450 }}
                  onChange={this.handleChange}
                >
                  <Option value="专科">专科</Option>
                  <Option value="本科">本科</Option>
                  <Option value="硕士">硕士</Option>
                  <Option value="博士">博士</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Item>

              <Item
                label="职务"
                name="duty"
                initialValue={staff.duty}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input placeholder="请输入员工职务" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="身份证号"
                name="card_id"
                initialValue={staff.card_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工身份证号', },]}
              >
                <Input placeholder="请输入员工身份证号" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="入职时间"
                name="intime"
                initialValue={staff.in_time ? moment(staff.in_time) : null}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工入职时间' }]}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="类型"
                name="stype"
                initialValue={staff.stype}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工类型' }]}
              >
                <Select
                  style={{ width: 450 }}
                  onChange={this.handleChange}
                >
                  <Option value="实习">实习</Option>
                  <Option value="正式">正式</Option>
                  <Option value="退休">退休</Option>
                  <Option value="离职">离职</Option>
                </Select>
              </Item>
              <Item
                label="联系方式"
                name="phone"
                initialValue={staff.phone}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工联系方式' }]}
              >
                <Input placeholder="请输入员工联系方式" style={{ width: 450 }}></Input>
              </Item>
              <Item
                label="民族"
                name="nation"
                initialValue={staff.nation}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请填写员工民族' }]}
              >
                <Input placeholder="请填写员工民族" style={{ width: 450 }}></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="性别"
                name="gender"
                initialValue={staff.gender}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工性别' }]}
              >
                <Select
                  style={{ width: 450 }}
                  onChange={this.handleChange}
                >
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </Item>

              <Item
                label="婚姻状况"
                name="marry"
                initialValue={staff.marry}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工婚姻状况' }]}
              >
                <Select
                  style={{ width: 450 }}
                  onChange={this.handleChange}
                >
                  <Option value="已婚">已婚</Option>
                  <Option value="未婚">未婚</Option>
                </Select>
              </Item>

              <Item
                label="政治面貌"
                name="political"
                initialValue={staff.political}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工政治面貌' }]}
              >
                <Select
                  style={{ width: 450 }}
                  onChange={this.handleChange}
                >
                  <Option value="党员">党员</Option>
                  <Option value="非党员">非党员</Option>
                </Select>
              </Item>

              <Item
                label="籍贯"
                name="area"
                initialValue={staff.area}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请填写员工籍贯' }]}
              >
                <Input placeholder="请填写员工籍贯" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="出生日期"
                name="birthday"
                initialValue={staff.birth ? moment(staff.birth) : null}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工生日' }]}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>


              <Item
                label="离职时间"
                name="quittime"
                initialValue={staff.quit_time ? moment(staff.quit_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="转正时间"
                name="toregulartime"
                initialValue={staff.toregular_time ? moment(staff.toregular_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="退休时间"
                name="retiretime"
                initialValue={staff.retire_time ? moment(staff.retire_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="其它信息"
                name="other"
                initialValue={staff.other}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <TextArea placeholder=""  style={{ width: 450 }} />
              </Item>

              <Item
                name="isUpdate"
                initialValue={isUpdate}
              />

              <Item>
                <Button style={{ marginLeft: 100 }} type="primary" htmlType="submit">提交</Button>
              </Item>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}

