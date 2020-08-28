import React, { Component } from 'react'
import { Card, Input, Button, Table, message, Space} from 'antd'
import { PlusOutlined,SearchOutlined } from '@ant-design/icons';
import { reqSalary, reqDeleteSalary} from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words'

/* 员工工资的子路由组件 */
export default class StaffHome extends Component {
  state = {
    salarys: [],
    loading: false,
  }

  initColumns = () => {
    this.columns = [
      {
        width: 100,
        title: '员工编号',
        dataIndex: 's_id',
        sorter: (a, b) => a.s_id - b.s_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('s_id'),
      },
      {
        width: 80,
        title: '姓名',
        dataIndex: 's_name',
        sorter: (a, b) => a.s_name.length - b.s_name.length,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('s_name'),
      },
      {
        width: 90,
        title: '职务',
        dataIndex: 'duty',
        sorter: (a, b) => a.duty.length - b.duty.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 80,
        title: '学历',
        dataIndex: 'education',
        ...this.getColumnSearchProps('education'),
      },
      {
        width: 80,
        title: '类型',
        dataIndex: 'stype',
        ...this.getColumnSearchProps('stype'),
      },
      {
        width: 80,
        title: '基础工资',
        dataIndex: 'b_salary',
        sorter: (a, b) => a.b_salary - b.b_salary,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 80,
        title: '人才津贴',
        dataIndex: 't_salary',
        sorter: (a, b) => a.t_salary - b.t_salary,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 80,
        title: '高温津贴',
        dataIndex: 'ht_salary',
        sorter: (a, b) => a.ht_salary - b.ht_salary,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 80,
        title: '退休金',
        dataIndex: 'p_salary',
        sorter: (a, b) => a.p_salary - b.p_salary,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 90,
        title: '基本工资总和(元/月)',
        render: (salary) => {
          const {b_salary,t_salary,p_salary,ht_salary}=salary
          return b_salary+t_salary+p_salary+ht_salary
        }
      },
      {
        width: 80,
        title: '绩效比例',
        dataIndex: 'achievenments',
        sorter: (a, b) => a.achievenments - b.achievenments,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 110,
        title: '绩效说明',
        dataIndex: 'a_explain',
      },
      {
        width: 80,
        title: '其它奖金',
        dataIndex: 'other_allowance',
        sorter: (a, b) => a.other_allowance - b.other_allowance,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 110,
        title: '奖金说明',
        dataIndex: 'o_explain',
      },
      {
        width: 160,
        title: '操作',
        render: (salary) => {
          const {s_id}=salary
          return (
            <span>
              <Button type="primary" onClick={() => this.props.history.push('/salary/addupdate', salary )}>修改</Button>
              &nbsp;&nbsp;
              <Button type='default' onClick={() => this.deleteSalary(s_id)}>删除</Button>
            </span>
          )
        }
      },
    ]

  }


  /* 删除工资记录 */
  deleteSalary= async (staffId) => {
    const result = await reqDeleteSalary(staffId)
    if (result.data) {
      message.success('工资记录' + staffId + '删除成功！')
      this.getSalary()
    }else{
      message.error('删除失败!')
    }
  }

  /* 获取所有工资的列表数据显示 */
  getSalary = async () => {
    this.setState({ loading: true })
    let result
    result = await reqSalary()
    this.setState({ loading: false })
    if (result.data) {
      this.setState({
        salarys: result.data
      })
    }else{
      message.error('删除失败!')
    }
  }
  
  //按列排序
  onSorter = (sorter) => {
    console.log('params', sorter);
  }
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
    this.getSalary()
  }
  render() {
    //取出状态数据
    const { salarys, loading} = this.state
    const extra = (
      <Button type="primary" onClick={()=>this.props.history.push('/salary/addupdate')}>
        <PlusOutlined />添加工资记录
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
          dataSource={salarys}
          columns={this.columns}
          onChange={this.onSorter}
        />
      </Card>
    )
  }
}
