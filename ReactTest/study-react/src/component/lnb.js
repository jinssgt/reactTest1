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
import { Link } from 'react-router-dom';
import './cpc_click.css'
import Popup from 'reactjs-popup'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

  const lnbItems = [
    {
      label: 'Logger Module',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'CPC 광고 노출제한 관리',
      key: 'sub1',
      icon: <UserDeleteOutlined/>,
      children: [
        {
          label: 'CPC 광고 중복 클릭 IP',
          key: 'CPCIP',
          route: '/5510',
        }
      ]
    },
    {
      label: '네이버 노출순위',
      key: 'trk_viral_rank',
      icon: <UserOutlined />,
      route: '/trk_viral_rank',
    },
    {
      label: '개시물별 노출',
      key: 'trk_flash_summary_v',
      icon: <UserOutlined />,
      route: 'trk_flash_summary_v',
    },
    {
      label: '개시물별 포스팅URL',
      key: 'trk_flash_post',
      icon: <UserOutlined />,
      route: '/trk_flash_post',
    },
    {
      label: '개시물별 추세',
      key: 'trk_flash_trend_v',
      icon: <UserOutlined />,
      route: '/trk_flash_trend_v',
    }
  ]

  const renderMenu = (menuItems) => {
    return menuItems.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenu(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            {/* Use the Link component to create the navigation link */}
            <Link to={item.route}>{item.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

const Lnb = ({collapsed, clientData, lnbMenu}) => {
    let lnbMenuOptions = [];
    let clientSelectOptions = [];
    // *********** working without parent/child sorting
    // const renderLnbMenu = (menuItems) => {
    //   return menuItems ? (
    //       menuItems.map(item => {
    //         return (
    //           <Menu.Item key={item.viewNo}><p>{item.viewNm}</p></Menu.Item>
    //         )
    //       })
    //   ) : (
    //       <Menu.Item></Menu.Item>
    //   )
    // }

    const preprocessedMenuData = preprocessMenuData(lnbMenu);

    // Render the menu using the preprocessed data
    const renderLnbMenu = (menuItems) => {
      return menuItems ? (
        menuItems.map(item => {
          if (item.children && item.children.length > 0) {
            // This item has children; it's a parent menu
            return (
              <SubMenu key={item.viewNo} title={item.viewNm}>
                {renderLnbMenu(item.children)}
              </SubMenu>
            );
          } else {
            // This item has no children; it's a leaf menu
            return (
              <Menu.Item key={item.viewNo}>
                <p>{item.viewNm}</p>
              </Menu.Item>
            );
          }
        })
      ) : (
        <Menu.Item></Menu.Item>
      );
    };
    function preprocessMenuData(menuData) {
      if (!menuData) {
        return null; // Handle the case where menuData is undefined
      }
      const menuMap = new Map();
    
      menuData.forEach(item => {
        const { viewNo, viewOption, parentNo } = item;
    
        if (!parentNo) {
          // If it's a standalone item, treat it as a parent
          menuMap.set(viewNo, { ...item, children: [] });
        } else {
          if (!menuMap.has(parentNo)) {
            // If the parent doesn't exist in the map, create it
            menuMap.set(parentNo, { children: [] });
          }
          menuMap.get(parentNo).children.push(item);
        }
      });
    
      // Extract the values from the map to create the final menu structure
      return Array.from(menuMap.values());
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    if (clientData && clientData.length > 0) {
      clientSelectOptions = clientData.map((client) => ({
        label: client.clientNm,
        value: client.seq,
      }));
    } else {
      // If clientData is empty or null, add the "Please log in" placeholder
      clientSelectOptions.push({
        label: 'Please log in',
        value: 'login',
        disabled: true,
      });
    }
    return (
        <Sider 
          collapsed={collapsed} 
          // width={collapsed ? 0 : 240} 
          width='240px'
          collapsedWidth="0"
          style={{height:'100vh', position:'fixed', marginTop:'60px', zIndex:9999}}
        >
            <div className="demo-logo-vertical" />
            <div style={{ display: 'flex', flexDirection: 'column', padding: 10,}}>
                <div>
                    <p style={{color:'white'}}>광고주 선택</p>
                    <Select
                    components={{
                        IndicatorSeparator: () => null
                      }}
                    className="selectSp"
                    options={clientSelectOptions}
                    placeholder='광고주를 선택하세요'
                    />
                </div>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ marginTop: '10px', borderBottom: '1px solid #e2e6e8', borderTop: '1px solid #e2e6e8' }}>
              {renderLnbMenu(preprocessedMenuData)}
            </Menu>
        </Sider>
    )
};
export default Lnb;