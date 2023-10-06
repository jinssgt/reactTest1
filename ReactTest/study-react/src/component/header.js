import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, theme, Space,Tag, Dropdown} from "antd";
import Icon,{ MenuUnfoldOutlined, MenuFoldOutlined,BellFilled,AppstoreFilled,UserOutlined,CrownOutlined,PoweroffOutlined,} from "@ant-design/icons";
// import {MdOutlineApps} from 'react-icons/md'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Logo from '../img/admin-logo.png'
import LogoText from '../img/admin-text.png'
import airIcon from '../img/top/app_air.svg'
import tamIcon from '../img/top/app_tam.svg'
import mngIcon from '../img/top/app_mng.svg'
import bellgray from '../img/top/bell_gray.png'
import bellblue from '../img/top/bell_blue.png'
import chat from '../img/top/chat.png'
import notice from '../img/top/exclamation-mark.png'
import user from '../img/top/user.svg'
const { Header } = Layout;

const Gnb = ({ onValueChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [move, setMove] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const Name = '테스트'
  
  const mailItems=[
    {
      icon: 
      <img className="mailIcon" src={notice} width={30} alt="notice Icon" />,
      label: <Link to="/">
      <p className="AppTitle">공지사항</p>
      <p class="mail-desc">네이버 매체 API 변경 내용 공지합니다.</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="mailIcon" src={bellblue} width={30} alt="bellblue Icon" />,
      label: <Link to="/">
      <p className="AppTitle">서비스 알림</p>
      <p class="mail-desc">서비스 이용 안내</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="mailIcon" src={chat} width={30} alt="bellblue Icon" />,
      label: <Link to="/" className="mailLink">
      <p className="AppTitle">1:1문의</p>
      <p class="mail-desc">AIR 네이버 매체 연결 문의 답변이 완료되었습니다.</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="mailIcon" src={bellblue} width={30} alt="bellblue Icon" />,
      label: <Link to="/">
      <p className="AppTitle">서비스 알림</p>
      <p class="mail-desc">서비스 이용 안내</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="mailIcon" src={bellblue} width={30} alt="bellblue Icon" />,
      label: <Link to="/">
      <p className="AppTitle">서비스 알림</p>
      <p class="mail-desc">서비스 이용 안내</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="mailIcon" src={bellblue} width={30} alt="bellblue Icon" />,
      label: <Link to="/">
      <p className="AppTitle">서비스 알림</p>
      <p class="mail-desc">서비스 이용 안내</p>
      <span class="mail-desc">2022-01-05 10:00 AM</span>
      </Link>,
      key: '5',
    },

  ];
  const appItems=[
    {
      label : <>
        <p>'{Name}'님이 사용중인 앱</p>
      </>
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="menuRoundIcon"src={airIcon} width={30} alt="Air Icon" />,
      value : "/",
      label: <Link to="/">
            <p className="AppTitle">AIR(매체 통합 리포트)</p>
            <span class="app-desc">통합된 매체 데이터의 시각화</span>
      </Link>,
      key: 'Air',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="menuRoundIcon"src={tamIcon} width={30} alt=" Tam Icon" />,
      value : "/",
      label: <Link to="/">
            <p className="AppTitle">TAM</p>
            <span class="app-desc">행동기반 고객 세그먼트 분석과 추출</span>
      </Link>,
      key: 'Tam',
    },
    {
      type: 'divider',
    },
    {
      icon: 
      <img className="menuRoundIcon"src={mngIcon} width={30} alt="Air Icon" />,
      value : "/",
      label: <Link to="/">
            <p className="AppTitle">MANAGER CONSOLE</p>
            <span class="app-desc">조직,광고주 성과 확인과 설정 관리</span>
      </Link>,
      key: 'Mng',
    },
  ];
  const userItems=[
    {
      icon: <UserOutlined/>,
      label: 'my account',
      key: 'myAccount',
    },
    {
      type: 'divider',
    },
    {
      icon: <PoweroffOutlined />,
      label: 'Log Out',
      key: 'logout'
    }
  ];

  const handleChange = () => {
    setCollapsed(!collapsed);
    onValueChange((prevValue)=>!prevValue)
  };
  const movePage =()=>{
    setMove(0)
  }

  return (
    <Layout>
        <Header
        className="fixed-header"
          style={{
            background: colorBgContainer,
          }}
        >
          <Space className="top-left-part"
              style={{
              width: collapsed ? 0 : 190, // Adjust the width based on the collapsed state
              float: 'left',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              alignSelf: 'center',
              overflow: 'hidden', // Ensure content doesn't overflow when collapsed
            }}
           >

          <Link to={{ pathname: "/"}} className="Logo" onClick={movePage}>
            <div style={{height:'60px'}}>
            <img
              src={Logo}
              alt="home"
              className="light-logo"              
              />
            <img
              src={LogoText}
              alt="home"
              className="light-text"
              ></img>
              </div>
          </Link>
          </Space>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleChange}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

        <div className="top-right-part">
        <div>
        <a
          href="https://docs.google.com/document/d/1MekkUblxY_1wMOBO78BKGx7QckOBiFhT/edit?usp=sharing&ouid=107943518726383742638&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
        >
        <Tag color="geekblue">Guide</Tag>
        </a>
        </div>
        <div>
        <Dropdown
          menu={{
            items:mailItems,
            className: "custom-dropdown-menu mail"
          }}
          className="mailMenu"
          trigger={['click']}
          placement="bottomRight"
        >
          <BellFilled />
        </Dropdown>
        </div>
        <div>
        <Dropdown
          menu={{
            items:appItems,
            className: "custom-dropdown-menu app"
          }}
          className="appMenu"
          trigger={['click']}
          placement="bottomRight"
        >
          <AppstoreFilled  style={{fontSize: '20px'}}/>
        </Dropdown>
        </div>
        <div>
        <Dropdown
          menu={{
            items:userItems,
            className: "custom-dropdown-menu user"
          }}
          className="userMenu"
          trigger={['click']}
          placement="bottomRight"
        >
        <span style={{cursor: 'pointer'}}><img className="menuRoundIcon"src={user} width={30} alt="Air Icon" style={{marginRight:10}}/>{Name}</span>

        </Dropdown>
        </div>
        </div>
        </Header>

    </Layout>
  );
};

export default Gnb;