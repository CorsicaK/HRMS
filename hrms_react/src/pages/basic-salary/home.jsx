import React, { Component } from 'react'
import { Card, Input, Button, Table, message, Space, Modal } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqBasicSalary, reqDeleteBasicSalary, reqUpdateBasicSalary, reqAddBasicSalary } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words'
import Add from './add'
import Update from './update'

/* 所有基本工资类别的子路由组件 */
export default class BasicSalaryHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basicSalarys: [],
      loading: false,
      showStatus: 0,//0:不显示,1:添加,2:更新
      updateBasicSalary: ''
    }
  }


  initColumns = () => {
    this.columns = [
      {
        title: '编号',
        dataIndex: 'b_id',
        sorter: (a, b) => a.b_id - b.b_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('b_id'),
      },
      {
        title: '类型名',
        dataIndex: 'b_name',
        sorter: (a, b) => a.b_name.length - b.b_name.length,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('b_name'),
      },
      {
        title: '发放标准(元/月)',
        dataIndex: 'b_salary',
        sorter: (a, b) => a.b_salary - b.b_salary,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('b_salary'),
      },
      {
        title: '适用范围',
        dataIndex: 'b_range',
        ...this.getColumnSearchProps('b_range'),
      },
      {
        title: '备注',
        dataIndex: 'b_explain',
        ...this.getColumnSearchProps('b_explain'),
      },
      {
        title: '该档员工数',
        dataIndex: 'num',
        sorter: (a, b) => a.num - b.num,
        sortDirections: ['descend', 'ascend']
      },
      {
        width: 170,
        title: '操作',
        render: (BasicSalary) => {
          const { b_id, num } = BasicSalary
          return (
            <span>
              <LinkButton onClick={() => {
                this.setState({
                  updateBasicSalary: BasicSalary
                })
                this.showUpdate()
              }
              } >修改</LinkButton>
              {num === 0 ? <LinkButton onClick={() => this.deleteBasicSalary(b_id)}>删除</LinkButton> : ''}
            </span>
          )
        }
      },
    ]

  }

  /* 删除该档工资 */
  deleteBasicSalary = async (basicSalaryId) => {
    const result = await reqDeleteBasicSalary(basicSalaryId)
    if (result.data) {
      message.success('删除成功！')
      this.getBasicSalary()
    } else {
      message.error('删除失败！')
    }
  }

  /* 获取所有基本工资档的列表数据显示 */
  getBasicSalary = async () => {
    this.setState({ loading: true })
    let result
    result = await reqBasicSalary()
    this.setState({ loading: false })
    if (result.data) {
      this.setState({
        basicSalarys: result.data
      })
    } else {
      message.error('获取失败！')
    }
  }

  /*  点击隐藏模态框 */
  handleCancel = () => {
    this.setState({
      showStatus: 0,
      updateBasicSalary: ''
    })

  }
  /*  显示添加基本工资类型的模态框 */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /*  显示更新基本工资类型的模态框 */
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  /* 更新分类 */
  update = async (values) => {
    if (values) {
      alert('发送请求')
      const { b_id, b_name, b_salary, brange, bexplain } = values
      let b_range = brange ? brange : undefined
      let b_explain = bexplain ? bexplain : undefined
      const basicSalary = { b_id, b_name, b_salary, b_range, b_explain }
      const result = await reqUpdateBasicSalary(basicSalary)
      if (result.data) {
        message.success('更新成功')
        this.getBasicSalary()
      } else {
        message.error('更新失败')
      }
      this.setState({
        showStatus: 0,
      });
    }
  }

  /* 添加分类 */
  add = async (values) => {
    if (values) {
      alert('发送请求')
      const { b_name, b_salary, brange, bexplain } = values
      let b_range = brange ? brange : undefined
      let b_explain = bexplain ? bexplain : undefined
      const basicSalary = { b_name, b_salary, b_range, b_explain }
      const result = await reqAddBasicSalary(basicSalary)
      if (result.data) {
        message.success('添加成功')
        this.getBasicSalary()
      } else {
        message.error('添加失败')
      }
      this.setState({
        showStatus: 0,
      });
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

  //重置
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  componentDidMount() {
    this.initColumns()
    this.getBasicSalary()
  }
  render() {
    //取出状态数据
    const { basicSalarys, loading, updateBasicSalary, showStatus } = this.state
    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        <PlusOutlined />添加
      </Button>
    )


    return (
      <Card extra={extra}>
        <Table
          rowKey='b_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          dataSource={basicSalarys}
          columns={this.columns}
          onChange={this.onSorter}
        />
        <Modal
          title="添加"
          width="500px"
          visible={showStatus === 1}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Add
            add={this.add}
            handleCancel={this.handleCancel}
            basicSalary={updateBasicSalary}
          />
        </Modal>

        <Modal
          title="更新"
          width="500px"
          visible={showStatus === 2}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Update
            update={this.update}
            handleCancel={this.handleCancel}
            basicSalary={updateBasicSalary}
          />
        </Modal>

      </Card>
    )
  }
}
