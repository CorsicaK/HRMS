import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message, Row, Col, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqUpdateSalary, reqAddSalary, reqBasicSalary, reqHighTempSalary, reqTalentSalary, reqPensionSalary, reqNoSalaryStaff } from '../../api'

const { Option } = Select;
const Item = Form.Item
const TextArea = Input.TextArea

/* 员工的添加和更新的子路由组件 */
export default class SalaryAddUpdate extends Component {
  state = {
    staffOptions: [],
    basicSalaryOptions: [],
    htSalaryOptions: [],
    talentSalaryOptions: [],
    pensionSalaryOptions: []
  };

  initOptions = (staffs, basicSalary, htSalary, talentSalary, pension) => {
    const staffOptions = staffs.map(a => ({
      value: a.s_id,
      label: a.s_name
    }))
    const basicSalaryOptions = basicSalary.map(a => ({
      value: a.b_id,
      label: a.b_name,
    }))
    const htSalaryOptions = htSalary.map(a => ({
      value: a.ht_id,
      label: a.ht_name,
    }))
    const talentSalaryOptions = talentSalary.map(a => ({
      value: a.t_id,
      label: a.t_name,
    }))
    const pensionSalaryOptions = pension.map(a => ({
      value: a.p_id,
      label: a.p_name,
    }))
    this.setState({
      staffOptions,
      basicSalaryOptions,
      htSalaryOptions,
      talentSalaryOptions,
      pensionSalaryOptions
    })
  }

  /* 获取下拉选项列表 */
  getOptions = async () => {
    const result1 = await reqBasicSalary()
    const result2 = await reqHighTempSalary()
    const result3 = await reqTalentSalary()
    const result4 = await reqPensionSalary()
    const result5 = await reqNoSalaryStaff()
    if (result1.data && result2.data && result3.data && result4.data && result5.data) {
      const basicSalary = result1.data
      const htSalary = result2.data
      const talentSalary = result3.data
      const pension = result4.data
      const staffs = result5.data
      this.initOptions(staffs,basicSalary, htSalary, talentSalary, pension )
    }
  }

  onFinish = async (values) => {
    if (values) {
      alert('发送请求')
      const { sid, bid, htid, tid, pid, achievenment, aExplain, otherAllowance, oExplain } = values
      let s_id = parseInt(sid) || sid[0]
      let b_id = bid[0]
      let ht_id = htid ? htid[0] : undefined
      let t_id = tid ? tid[0] : undefined
      let p_id = pid ? pid[0] : undefined
      let achievenments = achievenment ? parseInt(achievenment) : undefined
      let a_explain = aExplain ? aExplain : undefined
      let other_allowance = otherAllowance ? parseInt(otherAllowance) : undefined
      let o_explain = oExplain ? oExplain : undefined
      const salary = { s_id, b_id, ht_id, t_id, p_id, achievenments, a_explain, other_allowance, o_explain }
      let result
      console.log(salary)
      if (this.isUpdate) {
        result = await reqUpdateSalary(salary)
        console.log(result)
      } else {
        result = await reqAddSalary(salary)
      }
      if (result.data) {
        message.success(`${this.isUpdate ? '更新工资信息' : '添加工资'}成功!`)
        window.location.replace('/salary')
      } else {
        message.error(`${this.isUpdate ? '更新工资信息' : '添加工资'}失败!`)
      }
    }
  };

  //select事件
  handleChange = () => { }


  componentWillMount() {
    const salary = this.props.location.state
    //更新标识
    this.isUpdate = !!salary
    //保存员工信息(如果没有,保存是{})
    this.salary = salary || {}
  }
  componentDidMount() {
    this.getOptions()
  }
  render() {
    const { isUpdate, salary } = this
    const { s_name } = salary

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>{isUpdate ? '修改员工：' + s_name + ' 的工资信息' : '添加工资记录'}</span>
      </span>
    )

    //指定Item布局的配置对象
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
                name="sid"
                initialValue={isUpdate ? salary.s_id : [""]}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: true, message: '请输入员工编号' }]}
              >
                {isUpdate ? <Input disabled={isUpdate ? true : false} style={{ width: 450 }}></Input> :
                  <Cascader
                    style={{ width: 450 }}
                    options={this.state.staffOptions}
                  />
                }

              </Item>


              <Item
                label="姓名"
                name="s_name"
                initialValue={salary.s_name}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: isUpdate ? true : false, message: '请输入员工姓名' }]}
              >
                <Input disabled placeholder={isUpdate ? "请输入员工姓名" : "无需填写"} style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="学历"
                name="education"
                initialValue={salary.education}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: isUpdate ? true : false, message: '请选择员工学历' }]}
              >
                <Select
                  placeholder={isUpdate ? "" : "无需选择"}
                  disabled
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
                initialValue={isUpdate ? salary.duty : '无需填写'}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input disabled style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="类型"
                name="stype"
                initialValue={salary.stype}
                style={{ fontSize: 30, fontWeight: "bold" }}
                rules={[{ required: isUpdate ? true : false, message: '请选择员工类型' }]}
              >
                <Select
                  placeholder={isUpdate ? "" : "无需选择"}
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
                label="基本工资"
                name="bid"
                initialValue={[salary.b_id]}
                style={{ fontSize: 30, fontWeight: "bold" }}
                onChange={this.cascaderChange}
                rules={[{ required: true, message: '请选择基本工资等级' }]}
              >
                <Cascader
                  style={{ width: 450 }}
                  placeholder="请基本工资类别"
                  options={this.state.basicSalaryOptions}
                />
              </Item>

              <Item
                label="高温津贴"
                name="htid"
                initialValue={[salary.ht_id]}
                onChange={this.cascaderChange}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Cascader
                  style={{ width: 450 }}
                  options={this.state.htSalaryOptions}
                />
              </Item>

              <Item
                label="人才津贴"
                name="tid"
                initialValue={[salary.t_id]}
                onChange={this.cascaderChange}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Cascader
                  style={{ width: 450 }}
                  options={this.state.talentSalaryOptions}
                />
              </Item>

            </Col>
            <Col span={12}>
              <Item
                label="退休金"
                name="pid"
                initialValue={[salary.p_id]}
                onChange={this.cascaderChange}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Cascader
                  style={{ width: 450 }}
                  options={this.state.pensionSalaryOptions}
                />
              </Item>
              <Item
                label="绩效比例"
                name="achievenment"
                initialValue={salary.achievenments}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input placeholder="请输入绩效" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="绩效说明"
                name="aExplain"
                initialValue={salary.a_explain}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <TextArea style={{ width: 450 }} />
              </Item>
              <Item
                label="其它奖金"
                name="otherAllowance"
                initialValue={salary.other_allowance}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <Input placeholder="请输入其它奖金" style={{ width: 450 }}></Input>
              </Item>

              <Item
                label="奖金说明"
                name="oExplain"
                initialValue={salary.o_explain}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                <TextArea autosize style={{ width: 450 }} />
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

