import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { reqGetApartmentStaff } from '../../api'

export default class Barh extends Component {
  state = {
    marry: [],//已婚
    unmarry: [],//未婚
    apartment: []
  }

  getStatistic = async () => {
    const result = await reqGetApartmentStaff()
    if (result.data) {
      let data = result.data
      let apartment = data.map(a => a.name)
      let marry = data.map(a => a.marry)
      let unmarry = data.map(a => a.unmarry)
      this.setState({
        apartment,
        marry,
        unmarry
      })
    }
  }
  getOption = (marry, unmarry, apartment) => {
    return {
      title: {
        text: '部门已婚率',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['已婚', '未婚']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: apartment
      },
      series: [
        {
          name: '已婚',
          type: 'bar',
          data: marry
        },
        {
          name: '未婚',
          type: 'bar',
          data: unmarry
        }
      ]
    }

  }

  componentDidMount() {
  this.getStatistic()
}


  render() {
    const { marry, unmarry, apartment } = this.state
    return (
      <Card >
        <ReactEcharts option={this.getOption(marry, unmarry, apartment)} />
      </Card>
    )
  }
}
