import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import {reqGetApartmentStaff,reqGetEducation} from '../../api'

export default class DoublePie extends Component {
  state = {
    datain: [],
    dataout: [],
    apartment:[]
  }

  getStatistic=async()=>{
    const datain =await reqGetApartmentStaff()
    if (datain.data) {
      this.setState({
        datain: datain.data
    })
    }
    const dataout =await reqGetEducation()
    if(dataout.data){
      let data=dataout.data
      let apartment = data.map(a => a.name);
      this.setState({
        dataout:data,
        apartment
      })
    
    }
  }
  getOption = (datain, dataout,apartment) => {
    return {
      title: {
        text: '学历分布',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 30,
        data: apartment
      },
      series: [
        {
          name: '部门人数',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '40%'],
          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          data: datain
        },
        {
          name: '学历',
          type: 'pie',
          radius: ['50%', '65%'],
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          },
          data: dataout
        }
      ]
    }
  }

  componentDidMount(){
    this.getStatistic()
  }
  render() {
    const { datain, dataout,apartment } = this.state
    return (
      <Card >
        <ReactEcharts option={this.getOption(datain, dataout,apartment)} />
      </Card>
    )
  }
}