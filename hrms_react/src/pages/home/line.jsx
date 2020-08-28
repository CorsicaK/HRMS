import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { reqGetApartmentStaff } from '../../api'

/* 政治因素分布路由 */
export default class Line extends Component {
  state = {
    dangyuan: [],//党员
    undangyuan: [],//非党员
    apartment: []
  }

  getStatistic = async () => {
    const result = await reqGetApartmentStaff()
    if (result.data) {
      let data = result.data
      let apartment = data.map(a => a.name)
      let dangyuan = data.map(a => a.dangyuan)
      let undangyuan = data.map(a => a.undangyuan)
      this.setState({
        apartment,
        dangyuan,
        undangyuan
      })
    }
  }

  getOption = (dangyuan, undangyuan, apartment) => {
    return {
      title: {
        text: '党员干部',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['中共党员', '非党员']
      },
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: apartment
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '中共党员',
          type: 'line',
          data: dangyuan
        },
        {
          name: '非党员',
          type: 'line',
          data: undangyuan
        },

      ]
    }
  }

  componentDidMount() {
    this.getStatistic()
  }

  render() {
    const { dangyuan, undangyuan, apartment } = this.state
    return (
      <Card>
        <ReactEcharts option={this.getOption(dangyuan, undangyuan, apartment)} />
      </Card>

    )
  }
}
