import React, { useState } from 'react';
import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
  PieChartOutlined,
  DesktopOutlined,
  TeamOutlined,
  FileOutlined,
  BellFilled,
  AppstoreFilled,
  MehFilled
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const items: MenuProps['items'] = [
  {
    label: '',
    key: 'mail',
    icon: <BellFilled />,
  },
  {
    label: '',
    key: 'app',
    icon: <BellFilled />,
  },
  {
    label: '',
    key: 'SubMenu',
    icon: <AppstoreFilled />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    icon: <MehFilled />,
    label: '{Name}',
    key: '',
  },
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items3: MenuItem[] = [
  getItem('Logger Module', '1', <UserOutlined/>),
  getItem('CPC 광고 노출제한 관리', 'sub1', <UserOutlined />, [
    getItem('CPC 광고 중복 클릭 IP', '3'),
  ])
];

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );

const Apptsx: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
        <Sider width={collapsed ? 0 : 200} style={{ background: colorBgContainer }}>
          <div className="demo-logo-vertical" />
          <div style={{height:'64px', justifyContent:'center', textAlign:'center'}}>
            <a style={{}}><MehFilled /></a>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{height:'100%'}}
            defaultSelectedKeys={['1']}
            items={items3}
          />
        </Sider>
      <Layout>
      
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{display:'flex', clear:'none'}}>
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </div>
            <div style={{width:'700px'}}>< Menu mode="horizontal" items={items} style={{flexDirection: "row",
        justifyContent: "flex-end"}}/></div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Apptsx;