import React, { Component } from 'react'
import { Card, Button, Table, Input, Space } from 'antd'
import LinkButton from '../../components/link-button'
import { reqStypeStaff} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


/*退休员工的子路由组件 */
export default class RetireHome extends Component {
  state = {
    retires: [],//退休员工数组
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
      },
      {
        title: '退休时间',
        dataIndex: 'retire_time',
        ...this.getColumnSearchProps('retire_time'),
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
        title: '操作',
        render: (retire) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/retire/detail', { retire })}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/retire/update', retire)}>修改</LinkButton>
            </span>
          )
        }
      },
    ]

  }
 
  /* 获取退休员工的列表数据显示 */
  getRetireAll = async () => {
    this.setState({ loading: true })//显示加载loading
    const stype='退休'
    let result = await reqStypeStaff(stype)
    this.setState({ loading: false })//隐藏加载loading
    if (result.code === 0) {//判断请求结果是否正常
      this.setState({
        retires: result.data
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
    this.getRetireAll()
  }
  render() {
    //取出状态数据
    const { retires, loading } = this.state
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
          dataSource={retires}
          columns={this.columns}
          onChange={this.onSorter}
        />
      </Card>
    )
  }
}