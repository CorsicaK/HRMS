import React, { Component } from 'react'
import { Card, Button, Table, message, Input, Space } from 'antd'
import LinkButton from '../../components/link-button'
import {reqStypeStaff,reqQuit, reqDeleteStaff,reqToRegular } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


/*实习员工的子路由组件 */
export default class InternshipHome extends Component {
  state = {
    internships: [],//实习员工数组
    loading: false,//是否正在加载
    searchText: '',//模糊查询文本
    searchedColumn: '',//模糊查询列
  }
  /* 初始化table列数组 */
  initColumns = () => {
    this.columns = [
      {
        title: '员工编号',
        dataIndex: 's_id',
        sorter: (a, b) => a.s_id - b.s_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('s_id'),
      },
      {
        title: '姓名',
        dataIndex: 's_name',
        sorter: (a, b) => a.s_name.length - b.s_name.length,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('s_name'),
      },
      {
        title: '部门',
        dataIndex: 'a_name',
        ...this.getColumnSearchProps('a_name'),
      },
      {
        title: '入职时间',
        dataIndex: 'in_time',
        ...this.getColumnSearchProps('in_time'),
        sorter: (a, b) => a.in_time - b.in_time,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        sorter: (a, b) => a.phone - b.phone,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('phone'),
      },
      {
        width: 170,
        title: '员工管理',
        render: (internship) => {
          const { s_id } = internship
          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.quit(s_id)}
              >
                离职
              </Button>&nbsp;&nbsp;
              <Button
                type='primary'
                onClick={() => this.toRegular(s_id)}
              >
                转正
              </Button>
            </span>
          )
        }
      },
 
      {
        width: 170,
        title: '操作',
        render: (internship) => {
          const { s_id } = internship
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/internship/detail', { internship })}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/internship/update', internship)}>修改</LinkButton>
              <LinkButton onClick={() => this.deleteStaff(s_id)}>删除</LinkButton>
            </span>
          )
        }
      },
    ]

  }
  /* 更新实习员工离职的状态 */
  quit = async (staffId) => {
    const result = await reqQuit(staffId)
    if (result === 1) {
      message.success('员工' +staffId+'离职操作成功')
      this.getInternshipAll()
    }else{
      message.error('操作失败')
    }
  }

  /* 更新实习员工转正的状态 */
  toRegular = async (staffId) => {
    let sid=parseInt(staffId)
    const result = await reqToRegular(sid)
    if (result === 1) {
      message.success('员工' +staffId+'转正操作成功')
      this.getInternshipAll()
    }else{
      message.error('操作失败')
    }
  }

  /* 删除员工 */

  deleteStaff = async (staffId) => {
    let sid=parseInt(staffId)
    const result = await reqDeleteStaff(sid)
    console.log(result) 
    if (result === 1) {
      message.success('员工' + staffId + '删除成功！')
      this.getInternshipAll()
    }else{
      message.error('删除失败!')
    }
  }


  /* 获取实习员工的列表数据显示 */
  getInternshipAll = async () => {
    this.setState({ loading: true })//显示加载loading
    const stype='实习'
    let result = await reqStypeStaff(stype)
    this.setState({ loading: false })//隐藏加载loading
    if (result.code === 0) {//判断请求结果是否正常
      this.setState({
        internships: result.data
      })
    }
  }

  //按列排序
  onSorter = (sorter) => {
    console.log('params', sorter);
  }

  //模糊查询功能
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            查询
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  //查询
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  //重置查询
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  componentDidMount() {
    this.initColumns()
    this.getInternshipAll()
  }
  render() {
    //取出状态数据
    const { internships, loading } = this.state
    return (
      <Card>
        <Table
          rowKey='s_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          dataSource={internships}
          columns={this.columns}
          onChange={this.onSorter}
        />
      </Card>
    )
  }
}