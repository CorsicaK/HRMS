import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message, DatePicker, Cascader, Row, Col } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import moment from 'moment';
import { reqApartments, reqUpdateStaff } from '../../api'

const { Option } = Select;
const Item = Form.Item
const TextArea = Input.TextArea

/* 正式员工更新的子路由组件 */
export default class RegularUpdate extends Component {
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
  getApartments = async (apartmentsId) => {
    const result = await reqApartments(apartmentsId)
    if (result.data) {
      const apartments = result.data
      this.initOptions(apartments)
    }
  }

  onFinish = async (values) => {
    const { s_id, s_name, aid, education, duty, card_id, intime, stype, phone, nation, gender, marry, political, area, birthday, toregulartime, quittime, retiretime, other } = values
    let a_id = aid[0]
    let birth = birthday._i || birthday.format('YYYY-MM-DD')
    let in_time = intime._i | intime.format('YYYY-MM-DD')
    let toregular_time = toregulartime ? (toregulartime._i || toregulartime.format('YYYY-MM-DD')) : undefined
    let quit_time = quittime ? quittime._i || quittime.format('YYYY-MM-DD') : undefined
    let retire_time = retiretime ? (retiretime._i || retiretime.format('YYYY-MM-DD')) : undefined
    const regular = { s_id, s_name, a_id, education, duty, card_id, in_time, stype, phone, nation, gender, marry, political, area, birth, toregular_time, quit_time, retire_time, other }
    console.log(regular)
    let result = await reqUpdateStaff(regular)
    if (result.data) {
      message.success('更新员工信息成功!')
      window.location.replace('/regular')
    } else {
      message.error('更新员工信息失败!')
    }
  }

  //select
  handleChange = () => { }
  //时间点击事件
  chooseTime = () => { }
  //级联选择事件
  cascaderChange = () => { }

  componentDidMount() {
    this.getApartments()
  }


  componentWillMount() {
    const regular = this.props.location.state
    this.isUpdate = !!regular
    //保存正式员工信息(如果没有,保存是{})
    this.regular = regular || {}
  }
  render() {

    const { regular } = this
    const { s_name } = regular


    //头部左侧标题
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>修改正式员工：{s_name} 的信息</span>
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
                initialValue={regular.s_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工编号', },]}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>


              <Item
                label="员工姓名"
                name="s_name"
                initialValue={regular.s_name}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工姓名', },]}
              >
                <Input placeholder="请输入员工姓名" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="所属部门"
                name="aid"
                initialValue={[regular.a_id]}
                style={{ fontSize: 30, fontWeight: "bold" }}
                onChange={this.cascaderChange}
                rules={[{ required: true, message: '请选择部门' }]}
              >
                <Cascader
                  style={{ width: 450 }}
                  placeholder="请指定所属部门"
                  options={this.state.options}
                />
              </Item>

              <Item
                label="学历"
                name="education"
                initialValue={regular.education}
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
                initialValue={regular.duty}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input placeholder="请输入员工职务" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="身份证号"
                name="card_id"
                initialValue={regular.card_id}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工身份证号', },]}
              >
                <Input placeholder="请输入员工身份证号" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="入职时间"
                name="intime"
                initialValue={moment(regular.in_time)}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工入职时间' }]}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="类型"
                name="stype"
                initialValue={regular.stype}
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
                initialValue={regular.phone}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工联系方式' }]}
              >
                <Input placeholder="请输入员工联系方式" style={{ width: 450 }}></Input>
              </Item>
              <Item
                label="民族"
                name="nation"
                initialValue={regular.nation}
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
                initialValue={regular.gender}
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
                initialValue={regular.marry}
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
                initialValue={regular.political}
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
                initialValue={regular.area}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请填写员工籍贯' }]}
              >
                <Input placeholder="请填写员工籍贯" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="出生日期"
                name="birthday"
                initialValue={moment(regular.birth)}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请选择员工生日' }]}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>


              <Item
                label="离职时间"
                name="quittime"
                initialValue={regular.quit_time ? moment(regular.quit_time) : ''}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="转正时间"
                name="toregulartime"
                initialValue={regular.toregular_time ? moment(regular.toregular_time) : ''}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="退休时间"
                name="retiretime"
                initialValue={regular.retire_time ? moment(regular.retire_time) : ''}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <DatePicker onChange={this.chooseTime} style={{ width: 450 }} />
              </Item>

              <Item
                label="其它信息"
                name="other"
                initialValue={regular.other}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <TextArea placeholder=""  style={{ width: 450 }} />
              </Item>

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

