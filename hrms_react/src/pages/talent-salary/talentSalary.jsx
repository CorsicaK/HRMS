import React, { Component } from 'react'
import { Card, Input, Button, Table, message, Space, Modal } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqTalentSalary, reqDeleteTalentSalary, reqUpdateTalentSalary, reqAddTalentSalary } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Highlighter from 'react-highlight-words'
import Add from './add'
import Update from './update'

/* 所有人才津贴类别的子路由组件 */
export default class TalentSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      talentSalarys: [],
      loading: false,
      showStatus: 0,
      updateTalentSalary: ''
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: '编号',
        dataIndex: 't_id',
        sorter: (a, b) => a.t_id - b.t_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('t_id'),
      },
      {
        title: '类型名',
        dataIndex: 't_name',
        sorter: (a, b) => a.t_name.length - b.t_name.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '发放标准(元/月)',
        dataIndex: 't_salary',
        sorter: (a, b) => a.t_salary - b.t_salary,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('t_salary'),
      },
      {
        title: '适用范围',
        dataIndex: 't_range',
        ...this.getColumnSearchProps('t_range'),
      },
      {
        title:'该档员工数',
        dataIndex:'num',
        sorter:(a,b)=>a.num-b.num,
        sortDirections:['descend','ascend']
      },
      {
        title: '备注',
        dataIndex: 't_explain',
        ...this.getColumnSearchProps('t_explain'),
      },
      {
        width: 170,
        title: '操作',
        render: (TalentSalary) => {
          const { t_id,num } = TalentSalary
          return (
            <span>
              <LinkButton onClick={() => {
                this.setState({
                  updateTalentSalary: TalentSalary
                })
                this.showUpdate()
              }
              } >修改</LinkButton>
               {num === 0 ? <LinkButton onClick={() => this.deleteTalentSalary(t_id)}>删除</LinkButton> : ''}
            </span>
          )
        }
      },
    ]

  }

  /* 删除该档工资 */
  deleteTalentSalary = async (talentSalaryId) => {
    const result = await reqDeleteTalentSalary(talentSalaryId)
    if (result.data) {
      message.success('删除成功！')
      this.getTalentSalary()
    }else {
      message.error('删除失败!')
    }
  }

  /* 获取所有基本工资档的列表数据显示 */
  getTalentSalary = async () => {
    this.setState({ loading: true })
    let result
    result = await reqTalentSalary()
    this.setState({ loading: false })
    if (result.data) {
      this.setState({
        talentSalarys: result.data
      })
    }else {
      message.error('获取失败！')
    }
  }


  /*  点击隐藏模态框 */
  handleCancel = () => {
    this.setState({
      showStatus: 0,
      updateTalentSalary: ''
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
      const {  t_id, t_name, t_salary, trange, texplain } = values
      let t_range = trange ? trange : undefined
      let t_explain = texplain ? texplain : undefined
      const talentSalary = {  t_id, t_name, t_salary, t_range, t_explain }
      console.log(talentSalary)
      const result = await reqUpdateTalentSalary(talentSalary)   
      if (result.data) {
        message.success('更新成功')
        this.getTalentSalary()
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
      const { t_name, t_salary, trange, texplain} = values
      let t_range = trange ? trange : undefined
      let t_explain = texplain ? texplain : undefined
      const talentSalary = {t_name, t_salary, t_range, t_explain }
      const result = await reqAddTalentSalary( talentSalary )
      if (result.data) {
        message.success('添加成功')
        this.getTalentSalary()
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
    this.getTalentSalary()
  }
  render() {
    //取出状态数据
    const { talentSalarys, loading, updateTalentSalary, showStatus } = this.state
    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        <PlusOutlined />添加
      </Button>
    )


    return (
      <Card extra={extra}>
        <Table
          rowKey='t_id'
          bordered
          loading={loading}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
          dataSource={talentSalarys}
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
            talentSalary={updateTalentSalary}
          />
        </Modal>

      </Card>
    )
  }
}
