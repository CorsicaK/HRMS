import React, { Component } from 'react'
import { Card, Input, Button, Table, message, Space, Modal } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqPensionSalary, reqDeletePensionSalary, reqUpdatePensionSalary, reqAddPensionSalary } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words'
import Add from './add'
import Update from './update'

/* 所有退休金类别的子路由组件 */
export default class Pension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pensionSalarys: [],
      loading: false,
      showStatus: 0,//0:不显示,1:添加,2:更新
      updatePensionSalary: ''
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: '编号',
        dataIndex: 'p_id',
        sorter: (a, b) => a.p_id - b.p_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('p_id'),
      },
      {
        title: '类型名',
        dataIndex: 'p_name',
        sorter: (a, b) => a.p_name.length - b.p_name.length,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('p_name'),
      },
      {
        title: '发放标准(元/月)',
        dataIndex: 'p_salary',
        sorter: (a, b) => a.p_salary - b.p_salary,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('p_salary'),
      },
      {
        title: '适用范围',
        dataIndex: 'p_range',
        ...this.getColumnSearchProps('p_range'),
      },
      {
        title: '该档员工数',
        dataIndex: 'num',
        sorter: (a, b) => a.num - b.num,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: '备注',
        dataIndex: 'p_explain',
        ...this.getColumnSearchProps('p_explain'),
      },
      {
        width: 170,
        title: '操作',
        render: (PensionSalary) => {
          const { p_id, num } = PensionSalary
          return (
            <span>
              <LinkButton onClick={() => {
                this.setState({
                  updatePensionSalary: PensionSalary
                })
                this.showUpdate()
              }
              } >修改</LinkButton>
              {num === 0 ? <LinkButton onClick={() => this.deletePensionSalary(p_id)}>删除</LinkButton> : ''}
            </span>
          )
        }
      },
    ]

  }

  /* 删除该档退休金 */
  deletePensionSalary = async (pensionSalaryId) => {
    const result = await reqDeletePensionSalary(pensionSalaryId)
    if (result.data) {
      message.success('删除成功！')
      this.getPensionSalary()
    } else {
      message.error('删除失败!')
    }
  }

  /* 获取所有退休金档的列表数据显示 */
  getPensionSalary = async () => {
    this.setState({ loading: true })
    let result
    result = await reqPensionSalary()
    this.setState({ loading: false })
    if (result) {
      this.setState({
        pensionSalarys: result.data
      })
    } else {
      message.error('获取失败!')
    }
  }

  /*  点击隐藏模态框 */
  handleCancel = () => {
    this.setState({
      showStatus: 0,
      updatePensionSalary: ''
    })

  }
  /*  显示添加退休金类型的模态框 */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /*  显示更新退休金类型的模态框 */
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  /* 更新分类 */
  update = async (values) => {
    if (values) {
      alert('发送请求')
      const { p_id, p_name, p_salary, prange, pexplain } = values
      let p_range = prange ? prange : undefined
      let p_explain = pexplain ? pexplain : undefined
      const pensionSalary = { p_id, p_name, p_salary, p_range, p_explain }
      const result = await reqUpdatePensionSalary(pensionSalary)
      console.log(result)
      if (result.data) {
        message.success('更新成功')
        this.getPensionSalary()
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
      const { p_name, p_salary, prange, pexplain } = values
      let p_range = prange ? prange : undefined
      let p_explain = pexplain ? pexplain : undefined
      const pensionSalary = { p_name, p_salary, p_range, p_explain }
      const result = await reqAddPensionSalary(pensionSalary)
      if (result.data) {
        message.success('添加成功')
        this.getPensionSalary()
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
    this.getPensionSalary()
  }
  render() {
    //取出状态数据
    const { pensionSalarys, loading, updatePensionSalary, showStatus } = this.state
    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        <PlusOutlined />添加
      </Button>
    )


    return (
      <Card extra={extra}>
        <Table
          rowKey='p_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          dataSource={pensionSalarys}
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
            pensionSalary={updatePensionSalary}
          />
        </Modal>

      </Card>
    )
  }
}
