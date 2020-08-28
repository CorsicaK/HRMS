import React, { Component } from 'react'
import { Card,  Input, Button, Table, message, Space} from 'antd'
import { PlusOutlined ,SearchOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqStaff, reqDeleteStaff} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words'


/* 所有员工默认的子路由组件 */
export default class StaffHome extends Component {
  state = {
    staffs: [],//所有员工的数组
    loading: false,//是否正在加载
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
        title: '学历',
        dataIndex: 'education',
        ...this.getColumnSearchProps('education'),
      },
      {
        title: '类型',
        dataIndex: 'stype',
        ...this.getColumnSearchProps('stype'),
      },
      {
        title: '籍贯',
        dataIndex: 'area',
        ...this.getColumnSearchProps('area'),
      },
      {
        title: '政治面貌',
        dataIndex: 'political',
        sorter: (a, b) => a.political.length - b.political.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        sorter: (a, b) => a.phone - b.phone,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '性别',
        dataIndex: 'gender',
        ...this.getColumnSearchProps('gender'),
      },
      {
        width: 170,
        title: '操作',
        render: (staff) => {
          const {s_id,b_id}=staff
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/staff/detail', { staff })}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/staff/addupdate', staff )}>修改</LinkButton>
              {b_id?'':<LinkButton onClick={() => this.deleteStaff(s_id)}>删除</LinkButton>}
            </span>
          )
        }
      },
    ]

  }


  /* 删除员工 */
  deleteStaff = async (staffId) => {
    const result = await reqDeleteStaff(staffId)
    console.log(result) 
    if (result.data) {
      message.success('员工' + staffId + '删除成功！')
      this.getStaff()
    }else{
      message.error('删除失败!')
    }
    
  }

  /* 获取所有员工的列表数据显示 */
  getStaff = async () => {
    this.setState({ loading: true })
    let result
    result = await reqStaff()
    this.setState({ loading: false })
    if (result.code === 0) {
      const list = result.data
      this.setState({
        staffs: list
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
    this.getStaff()
  }
  render() {
    //取出状态数据
    const { staffs, loading} = this.state
    const extra = (
      <Button type="primary" onClick={()=>this.props.history.push('/staff/addupdate')}>
        <PlusOutlined />添加员工
      </Button>
    )


    return (
      <Card extra={extra}>
        <Table
          rowKey='s_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          dataSource={staffs}
          columns={this.columns}
          onChange={this.onSorter}
        />
      </Card>
    )
  }
}
