import React, { Component } from 'react'
import { Card, Table, Button, message, Modal,Input, Space } from 'antd'
import { PlusOutlined, ArrowRightOutlined,SearchOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqApartments, reqDeleteApartment, reqUpdateApartment, reqAddApartment } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import Add from './add'
import Update from './update'
import Highlighter from 'react-highlight-words';


/* 部门分类的路由 */
export default class ApartmentHome extends Component {
  state = {
    loading: false,
    apartments: [],//部门列表
    updateApartment: '',
    showStatus: 0
  }

  /* 初始化table的列数组 */
  initColumns = () => {
    this.columns = [
      {
        title: '部门编号',
        dataIndex: 'a_id',
        sorter: (a, b) => a.a_id - b.a_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('a_id'),
      },
      {
        title: '部门名',
        dataIndex: 'a_name',
      },
      {
        title: '部门主管',
        dataIndex: 'a_admin',
        ...this.getColumnSearchProps('admin'),
      },
      {
        title: '部门联系方式',
        dataIndex: 'phone',
      },
      {
        title: '在职员工人数',
        dataIndex: 'num',
        sorter: (a, b) => a.num - b.num,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '操作',
        width: 200,
        render: (apartment) => {
          const { a_id, num } = apartment
          return (<span>
            <Button
              type='primary'
              onClick={() => {
                this.setState({
                  updateApartment: apartment
                })
                this.showUpdate()
              }}>修改</Button>
              &nbsp;&nbsp;
            {num === 0 ?  <Button type='default' onClick={() => this.deleteApartment(a_id)} >删除</Button>:''}
          </span>
          )
        }
      },
      {
        title: '部门人员',
        width: 150,
        render: (apartment) => {
          const { num } = apartment
          return (
            <span>
              {num === 0 ? '' : <Button type="primary" onClick={() => {
                localStorage.setItem('apart', JSON.stringify(apartment))
                this.props.history.push('/apartment/apartStaff', apartment)
              }}>查看</Button>}
            </span>
          )
        }
      }
    ]
  }

  /* 获取部门信息 */
  getApartments = async () => {
    this.setState({ loading: true })
    const result = await reqApartments()
    this.setState({ loading: false })
    if (result.code === 0) {
      this.setState({
        apartments:result.data
      })
    }
    else {
      message.error('获取部门信息失败')
    }
  }


  /* 删除部门 */
  deleteApartment = async (ApartmentId) => {
    const result = await reqDeleteApartment(ApartmentId)
    if (result.data) {
      message.success('部门' + ApartmentId + '删除成功！')
      this.getApartments()
    }else{
      message.error('部门删除失败')
    }
  }

  /*  点击隐藏模态框 */
  handleCancel = () => {
    this.setState({
      showStatus: 0,
      updateApartment: ''
    })

  }
  /*  显示添加部门的模态框 */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /*  显示更新部门的模态框 */
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  /* 更新部门 */
  update = async (values) => {
    if (values) {
      //收集数据
      const { a_id, a_name, a_admin, iphone } = values
      let phone=parseInt(iphone)
      const apartment = { a_id, a_name, a_admin, phone }
      //准备数据
      const result = await reqUpdateApartment(apartment)
      if (result.data) {
        message.success('更新成功')
        this.getApartments()
      } else {
        message.error('更新失败')
      }
      this.setState({
        showStatus: 0,
      });
    }
  }

  /* 添加部门 */
  add = async (values) => {
    if (values) {
      //收集数据
      const { a_id, a_name, a_admin, iphone } = values
      let phone=parseInt(iphone)
      const apartment = { a_id, a_name, a_admin, phone }
      //准备数据
      const result = await reqAddApartment(apartment)
      if (result.data) {
        message.success('添加成功')
        this.getApartments()
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
    // console.log('params', sorter);
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
    this.getApartments()
  }
  render() {

    const { apartments, loading, updateApartment, showStatus } = this.state

    const title = (
      <span>
        <LinkButton onClick={this.getApartments}>部门列表</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
      </span>
    )
    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        <PlusOutlined />添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>

        <Table
          bordered
          rowKey="a_id"
          loading={loading}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          dataSource={apartments}
          columns={this.columns} />
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
            apartment={updateApartment}
          />
        </Modal>

      </Card>
    )
  }
}
