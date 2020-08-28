import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { reqGetApartmentStaff } from '../../api'

/* 员工类型路由 */
export default class Bar extends Component {
  state = {
    internship: [],//实习
    regular: [],//正式
    retire: [],//退休
    apartment: []
  }

  getStatistic = async () => {
    const result = await reqGetApartmentStaff()
    if (result.data) {
      let data = result.data
      let apartment = data.map(a => a.name)
      let internship = data.map(a => a.internship)
      let regular = data.map(a => a.regular)
      let retire = data.map(a => a.retire)
      this.setState({
        apartment,
        internship,
        regular,
        retire
      })
    }
  }

  getOption = (internship, regular, retire, apartment) => {
    return {
      title: {
        text: '员工成分',
      },
      tooltip: {},
      legend: {
        data: ['实习', '正式', '退休']
      },
      xAxis: {
        data: apartment
      },
      yAxis: {},
      series: [{
        name: '实习',
        type: 'bar',
        data: internship
      }, {
        name: '正式',
        type: 'bar',
        data: regular
      }, {
        name: '退休',
        type: 'bar',
        data: retire
      }]
    }
  }

  componentDidMount(){
    this.getStatistic()
  }
  render() {
    const { internship, regular, retire, apartment } = this.state
    return (
      <Card >
        <ReactEcharts option={this.getOption(internship, regular, retire, apartment)} />
      </Card>

    )
  }
}
