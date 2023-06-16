import React from 'react';
// import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellFilled,
  AppstoreFilled,
  MehFilled,
  CrownOutlined,
  PoweroffOutlined,
  UserDeleteOutlined,
  RightOutlined,
  ProfileTwoTone,
  RightCircleFilled
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import Logo from '../img/admin-logo.png'
import LogoText from '../img/admin-text.png'
import TabPane from 'antd/es/tabs/TabPane';
import { DatePicker, Space } from 'antd';
import './cpc_click.css'
import Popup from 'reactjs-popup'
const { Header, Sider, Content } = Layout;

const gnbItems = [
    {
      label: '',
      key: 'mail',
      icon: <BellFilled />,
      children: [
        {
          label: 'item 1'
        },
        {
          label: 'item 2'
        },
      ],
    },
    {
      label: '',
      key: 'app',
      icon: <BellFilled />,
      children: [
        {
          label: 'item 1'
        },
        {
          label: 'item 2'
        },
      ],
    },
    {
      label: '',
      key: 'SubMenu',
      icon: <AppstoreFilled />,
      children: [
        {
          label: 'Item 1',
        },
        // {
        //   type: 'group',
        //   label: 'Item 2',
        //   children: [
        //     {
        //       label: 'Option 3',
        //       key: 'setting:3',
        //     },
        //     {
        //       label: 'Option 4',
        //       key: 'setting:4',
        //     },
        //   ],
        // },
        {
          label: 'item 2'
        },
      ],
    },
    {
      icon: <UserOutlined />,
      label: '{Name}',
      key: '',
      children: [
        {
          icon: <UserOutlined/>,
          label: 'my account',
          key: 'myAccount',
        },
        {
          icon: <CrownOutlined />,
          label: 'admin',
          key: 'admin',
        },
        {
          icon: <PoweroffOutlined />,
          label: 'Log Out',
          key: 'logout'
        }
      ]
    },
];

const Gnb = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height:'61px',
            border:'1px solid #e2e6e8',
            marginLeft:'240px'
          }}
        >
          <div style={{display:'flex', clear:'none'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 60,
            }}
          />
          <div style={{width:'100%'}}>< Menu mode="horizontal" items={gnbItems} style={{height:'60px', flexDirection: "row",
        justifyContent: "flex-end"}}/></div>
        </div>
        </Header>
    )
};
export default Gnb;