import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message, DatePicker, Cascader, Row, Col } from 'antd'
import moment from 'moment';
import { reqApartments, reqUpdateStaff, regGetStaffById } from '../../api'
import memoryUtils from '../../utils/memoryUtils'

const { Option } = Select;
const Item = Form.Item
const TextArea = Input.TextArea
/* 用户详细信息路由 */
export default class User extends Component {
  state = {
    options: [],
    staff: {}
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
  getStaff = async (userId) => {
    const result = await regGetStaffById(userId)
    if (result.data) {
      message.success('个人信息获取成功')
      const user = result.data[0]
      this.setState({
        staff: user
      })
    }
    else {
      message.error('ddddd')
    }
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
      const { s_id, s_name, aid, education, duty, card_id, intime, stype, phone, nation, gender, marry, political, area, birthday, toregulartime, quittime, retiretime, other } = values
      let a_id = aid[0]
      let birth = birthday ? birthday._i : birthday.format('YYYY-MM-DD')
      let in_time = intime._i
      let toregular_time = toregulartime ? toregulartime._i : undefined
      let quit_time = quittime ? quittime._i : undefined
      let retire_time = retiretime ? retiretime._i : undefined
      const staff = { s_id, s_name, a_id, education, duty, card_id, in_time, stype, phone, nation, gender, marry, political, area, birth, toregular_time, quit_time, retire_time, other }

      const result = await reqUpdateStaff(staff)
      if (result.data) {
        message.success('修改成功')
      } else {
        message.error('修改失败')
      }
    }
  };


  //select
  handleChange = () => { }
  //时间点击事件
  chooseTime = () => { }
  //级联选择事件
  cascaderChange = () => { }

  componentDidMount() {
    this.getStaff(memoryUtils.user.u_id)
    this.getApartments()
  }


  render() {
    const user = this.state.staff
    var arr = Object.keys(user)
    if (arr.length !== 0) {
      var { s_id } = user
    }

    const title = (
      <span>个人信息</span>
    )
    const formItemLayout = {
      labelCol: { span: 4, },
      wrapperCol: { span: 8, },
    };

    return (
      <Card title={title}>
        {s_id && <Form  {...formItemLayout} onFinish={this.onFinish}>
          <Row>
            <Col span={12}>

              <Item
                label="员工编号"
                name="s_id"
                initialValue={s_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工编号' }]}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="员工姓名"
                name="s_name"
                initialValue={user.s_name}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工姓名' }]}
              >
                <Input placeholder="请输入员工姓名" style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="所属部门"
                name="aid"
                initialValue={[user.a_id]}
                style={{ fontSize: 30, fontWeight: "bold" }}
                onChange={this.cascaderChange}
                rules={[{ required: true, message: '请选择部门' }]}
              >
                <Cascader
                  style={{ width: 450 }}
                  disabled
                  placeholder="请指定所属部门"
                  options={this.state.options}
                />
              </Item>


              <Item
                label="学历"
                name="education"
                initialValue={user.education}
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
                initialValue={user.duty}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled placeholder="请输入员工职务" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="身份证号"
                name="card_id"
                initialValue={user.card_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工身份证号', },]}
              >
                <Input placeholder="请输入员工身份证号" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="入职时间"
                name="intime"
                initialValue={moment(user.in_time)}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工入职时间' }]}
              >
                <DatePicker disabled onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="类型"
                name="stype"
                initialValue={user.stype}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工类型' }]}
              >
                <Select
                  disabled
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
                initialValue={user.phone}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工联系方式' }]}
              >
                <Input placeholder="请输入员工联系方式" style={{ width: 450 }}></Input>
              </Item>
              <Item
                label="民族"
                name="nation"
                initialValue={user.nation}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请填写员工民族' }]}
              >
                <Input placeholder="请填写员工民族" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="性别"
                name="gender"
                initialValue={user.gender}
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
                initialValue={user.marry}
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
                initialValue={user.political}
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
            </Col>
            <Col span={12}>

              <Item
                label="籍贯"
                name="area"
                initialValue={user.area}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请填写员工籍贯' }]}
              >
                <Input placeholder="请填写员工籍贯" style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="出生日期"
                name="birthday"
                initialValue={moment(user.birth)}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工生日' }]}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>


              <Item
                label="离职时间"
                name="quittime"
                initialValue={user.quit_time ? moment(user.quit_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker disabled onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="转正时间"
                name="toregulartime"
                initialValue={user.toregular_time ? moment(user.toregular_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker disabled onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="退休时间"
                name="retiretime"
                initialValue={user.retire_time ? moment(user.retire_time) : undefined}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker disabled onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="基本工资档次"
                name="b_id"
                initialValue={user.b_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="高温津贴档次"
                name="ht_id"
                initialValue={user.ht_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="人才津贴档次"
                name="t_id"
                initialValue={user.t_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="退休金档次"
                name="p_id"
                initialValue={user.p_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>
              <Item
                label="绩效"
                name="achievements"
                initialValue={user.achievements}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>
              <Item
                label="其他奖金"
                name="other_allowance"
                initialValue={user.other_allowance}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="其它信息"
                name="other"
                initialValue={user.other}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <TextArea placeholder="" style={{ width: 450 }} />
              </Item>

              <Item>
                <Button style={{ marginLeft: 100 }} type="primary" htmlType="submit">提交</Button>
              </Item>
            </Col>
          </Row>
        </Form>}
      </Card>
    )
  }
}

