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
        // {f
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

const selectSpnOpt = [
    {
      label: '광고주를 선택하세요',
      value: ''
    },
    {
      label: 'option1',
      value: 'option1'
    },
    {
      label: 'option2',
      value: 'option2'
    }
  ]

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  };
  
  function callBack(key){
    console.log(key);
  };
const lnbItems = [
    getItem('Logger Module', '1', <UserOutlined/>),
    getItem('CPC 광고 노출제한 관리', 'sub1', <UserDeleteOutlined />, [
      getItem('CPC 광고 중복 클릭 IP', '3'),
    ])
  ];

const Lnb = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider width={collapsed ? 0 : 240} style={{height:'100vh', position:'fixed',}}>
            <div className="demo-logo-vertical" />
            <div style={{height:'60px', display:'flex', justifyContent:'center', textAlign:'center',  background:'white',}}>
              <div style={{display:'flex', justifyContent:'center', textAlign:'center', height:'35px', marginTop:'13px', marginLeft:'-10px'}}>
                <img src={Logo} alt='logo'/>
              </div>
              <div style={{marginLeft:'15px', marginTop:'17px'}}>
                <img src={LogoText} alt='logoText'/>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: 10,}}>
                <div>
                    <p style={{color:'white'}}>광고주 선택</p>
                    <Select
                    components={{
                        IndicatorSeparator: () => null
                      }}
                    className="selectSp"
                    options={selectSpnOpt}
                    placeholder='광고주를 선택하세요'
                    />
                </div>
            </div>
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={lnbItems}
            style={{marginTop:'10px', borderBottom:'1px solid #e2e6e8', borderTop:'1px solid #e2e6e8'}}
            />
        </Sider>
    )
};
export default Lnb;