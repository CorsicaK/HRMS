import React, { Component } from 'react'
import { Statistic, Card, Row, Col } from 'antd';
import { TeamOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import {reqStaffNum} from '../../api'

export default class Static extends Component {
  state = ({
    list: []
  })

  getStaffNum = async () => {
    let result
    result = await reqStaffNum()
    if (result.code === 0) {
      this.setState({
        list: result.data
    })
  }
}

componentDidMount(){
    this.getStaffNum()
  }

  render() {
    const {list} = this.state
    return (
      <Card>
        <Row>
          <Statistic
            title="总员工数(不含离职)"
            value={list[0]}
            valueStyle={{ color: '#7AFEC6	', margin: 'center' }}
            prefix={<TeamOutlined />}
            suffix="人"
          />
        </Row>
        <br/>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                value={list[1]}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ManOutlined />}
                suffix="人"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                value={list[2]}
                valueStyle={{ color: '#cf1322' }}
                prefix={<WomanOutlined />}
                suffix="人"
              />
            </Card>
          </Col>
        </Row>
        <br/>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
            <Statistic title="省内" 
            value={list[3]}
            valueStyle={{ color: '#cf1322' }}
            suffix="人"
             />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
            <Statistic
            title="省外"
                value={list[4]}
                valueStyle={{ color: '##6FB7B7' }}
                suffix="人"
              />
            </Card>
          </Col>
        </Row>

      </Card>
    )
  }
}
