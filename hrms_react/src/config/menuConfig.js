import React from 'react'
import {
   HomeOutlined, 
   IdcardOutlined,
   TeamOutlined,
   AppstoreOutlined,
   CreditCardOutlined,
   DollarOutlined,
   MoneyCollectOutlined,
   UserOutlined,
  //  UserSwitchOutlined,
   } from '@ant-design/icons';
   
const menuList = [
  {
    title: '首页',                //菜单标题名称
    key: '/home',                 //对应路径
    icon: <HomeOutlined />,       //图标名称
  },
  {
    title: '部门管理',                
    key: '/apartment',               
    icon: <AppstoreOutlined />,      
  },
  {
    title: '员工管理',
    key: 'staff',
    icon: <TeamOutlined  />,
    children: [                   //子菜单列表
      {
        title: '员工花名册',
        key: '/staff',
        icon: <IdcardOutlined />,
      },
      {
        title: '正式员工',
        key: '/regular',
        icon: <IdcardOutlined />,
      },
      {
        title: '实习员工',
        key: '/internship',
        icon: <IdcardOutlined />,
      },
      {
        title: '退休员工',
        key: '/retire',
        icon: <IdcardOutlined />,
      },
    ]
  },
  {
    title: '工资类别',
    key: 'salaryType',
    icon: <CreditCardOutlined />,
    children: [                   //子菜单列表
      {
        title: '基本工资',
        key: '/basicSalary',
        icon: <DollarOutlined />,
      },
      {
        title: '高温津贴',
        key: '/highTempSalary',
        icon: <DollarOutlined />,
      },
      {
        title: '人才津贴',
        key: '/talent',
        icon: <DollarOutlined />,
      },
      {
        title: '退休金',
        key: '/pension',
        icon: <DollarOutlined />,
      },
    ]
  },
  {
    title: '员工工资组成',
    key: '/salary',
    icon: <MoneyCollectOutlined />,
  },
  {
    title: '个人信息',
    key: '/user',
    icon: <UserOutlined />,
  },
  // {
  //   title: '角色管理',
  //   key: '/role',
  //   icon: <UserSwitchOutlined />,
  // }
]

export default menuList;