import React, { Component } from 'react'
import { Card, List, Row, Col } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';

const Item = List.Item

/* 退休员工详情子路由 */
export default class StaffDetail extends Component {
  render() {
    //读取携带过来的state数据
    const { s_id, s_name, a_name, education, duty, card_id, in_time, phone, nation, gender, marry, political, area, birth, other,toregular_time,retire_time } = this.props.location.state.retire

    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ color: '#A3D1D1', marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
        </LinkButton>
        退休员工：{s_name} 的详细信息
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <Row>
          <Col span={11}>
            <List>
              <Item>
                <span className="left">员工编号:</span>
                <span className="right">{s_id}</span>
              </Item>
              <Item>
                <span className="left">员工姓名:</span>
                <span className="right">{s_name}</span>
              </Item>
              <Item>
                <span className="left">所属部门:</span>
                <span className="right">{a_name}</span>
              </Item>
              <Item>
                <span className="left">学历:</span>
                <span className="right">{education}</span>
              </Item>
              <Item>
                <span className="left">职务:</span>
                <span className="right">{duty}</span>
              </Item>
              <Item>
                <span className="left">身份证号:</span>
                <span className="right">{card_id}</span>
              </Item>
              <Item>
                <span className="left">入职时间:</span>
                <span className="right">{in_time}</span>
              </Item>
              <Item>
                <span className="left">转正时间:</span>
                <span className="right">{toregular_time}</span>
              </Item>
              <Item>
                <span className="left">联系方式:</span>
                <span className="right">{phone}</span>
              </Item>
            </List>
          </Col >
          <Col span={2}></Col>
          <Col span={11}>
            <List>
              <Item>
                <span className="left">性别:</span>
                <span className="right">{gender}</span>
              </Item>
              <Item>
                <span className="left">民族:</span>
                <span className="right">{nation}</span>
              </Item>
              <Item>
                <span className="left">婚姻状况:</span>
                <span className="right">{marry}</span>
              </Item>
              <Item>
                <span className="left">政治面貌:</span>
                <span className="right">{political}</span>
              </Item>
              <Item>
                <span className="left">籍贯:</span>
                <span className="right">{area}</span>
              </Item>
              <Item>
                <span className="left">出生日期:</span>
                <span className="right">{birth}</span>
              </Item>
              <Item>
                <span className="left">离职时间:</span>
                <span className="right">{retire_time}</span>
              </Item>
              <Item>
                <span className="left">备注:</span>
                <span className="right">{other}</span>
              </Item>
            </List>
          </Col>
        </Row >
      </Card >
    )
  }
}
