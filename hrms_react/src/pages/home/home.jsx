import React, { Component } from 'react'
import { Row, Col} from 'antd'
import Bar from './bar'
import Line from './line'
import DoublePie from './doublePie'
import Static from './static'
import Barh from './barh'
/* 首页路由 */
export default class Home extends Component {
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col span={8}>
            <Static />
          </Col>
          <Col span={16}>
            <Barh />
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={8}>
            <DoublePie />
          </Col>
          <Col span={8}>
            <Line />
          </Col>
          <Col span={8}>
            <Bar />
          </Col>
        </Row>
      </>
    )
  }
}
