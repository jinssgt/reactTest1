import React, { useEffect } from 'react';
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
  RightCircleFilled,
  CheckCircleTwoTone
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Dropdown, Tag } from 'antd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import Logo from '../img/admin-logo.png'
import LogoText from '../img/admin-text.png'
import TabPane from 'antd/es/tabs/TabPane';
import userIcon from '../img/top/user.svg'
import { DatePicker, Space } from 'antd';
import './cpc_click.css'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import LoginModal from './loginModal';
import MyAccountModal from './myAccountModal';
import {SIGN_IN, FETCH_MENU_APPS, FETCH_NOTICES, FETCH_ABOUT_ME, FETCH_CLIENT} from './gnb_lnb_api';
const { Header, Sider, Content } = Layout;

const Gnb = ({onValueChange, updateClientData, updateLnbMenu, openLoginModal}) => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    console.log('modal visible?', isLoginModalOpen);
    // openLoginModal();
    console.log('handleOpenLoginModal run');
  };

  const handleOpenMyAccountModal = () => {
    setIsMyAccountModalOpen(true);
  }

  const handleOk = () => {
    setIsLoginModalOpen(false);
    setIsMyAccountModalOpen(false);
  };

  const [gnbItems, setGnbItems] = useState([])

    const [menuApps, setMenuApps] = useState([]);
    const [token, setToken] = useState();
    const [aboutMeData, setAboutMeData] = useState();
    const [noticesData, setNoticesData] = useState();
    const [clientData, setClientData] = useState();
    const [tokenType, setTokenType] = useState();
    useEffect(() => {
      loginTest();
      console.log('about me data load', aboutMeData);
      console.log('login modal initial visibility', isLoginModalOpen);
    }, []);

    const loginTest = () => {
      const column_vals = [{
        // username: 'asj',
        username: 'lovetaki@bizspring.co.kr',
        password: 'Tmakxm0)'
      }]
      fetch(`${SIGN_IN}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(column_vals[0]),
      })
      .then((response) => {
        if (response.ok) {
          const dataArray = Array.isArray(response) ? response : [response];
          // logoTest();
          return response.json();
        }
      })
      .then((data) => {
        console.log('incoming login data', data);
        Cookies.set('token', data.token);
        Cookies.set('tokenType', data.tokenType);
        setToken(data.token);
        setTokenType(data.tokenType);
        fetchLogo();
        // fetchPageNumber();
        fetchMenuApps().then((menuApps) => {
          setGnbItems((prevMenuData) => {
            const updatedMenuAppsParent = {
              ...prevMenuData[2], // Update the third parent
              children: menuApps.map((app) => ({
                label: app.appNm, // Adjust this accordingly to match your app data structure
                // ... other properties of the app object
              })),
            };
            return [
              ...prevMenuData.slice(0, 2), // Keep the first two parents unchanged
              updatedMenuAppsParent,
              ...prevMenuData.slice(3), // Keep the rest of the parents unchanged
            ];
          });
        });
        // userExist();
        fetchAboutMe().then((aboutMeData) => {
          setGnbItems((prevMenuData) => {
            const lastParentIndex = prevMenuData.length - 1;
            const updatedLastParent = {
              ...prevMenuData[lastParentIndex],
              label: aboutMeData.adminNm,
            };
            return [
              ...prevMenuData.slice(0, lastParentIndex),
              updatedLastParent,
            ];
          });
        });
        fetchClient();
        fetchNotices();
      })
    }

    const userExist = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      const username = 'asj';
      fetch(`http://223.130.136.182/auth/user/${username}/exists`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
    }

    useEffect(() => {
      console.log('token : ', Cookies.get('token'));
      console.log('tokenType : ', Cookies.get('tokenType'));
    }, []);

    const fetchPageNumber = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      fetch('http://122.99.192.199:8080/app/menu/view/1000', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
    }

    const fetchLogo = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      fetch('http://223.130.136.182/app/menu/view/1000', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        updateLnbMenu(data);
        console.log('lnbMenu list', data);
        return data;
      })
    }

    const fetchMenuApps = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      return fetch(`${FETCH_MENU_APPS}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setMenuApps(data);
        console.log('aaaaaaaaaaaa', data);
        return data;
      })
    }

    const fetchNotices = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      fetch(`${FETCH_NOTICES}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setNoticesData(data);
        console.log('notice data!!!!', data);
        return data;
      })
    }

    const fetchAboutMe = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      return fetch(`${FETCH_ABOUT_ME}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setAboutMeData(data);
        console.log('about me data', data);
        return data;
      })
    }

    const fetchClient = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      fetch(`${FETCH_CLIENT}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        updateClientData(data);
        console.log('client data', data);
        return data;
      })
    }

    const fetchGuide = () => {
      const token = Cookies.get('token');
      const tokenType = Cookies.get('tokenType');
      fetch('http://223.130.136.182:8088/app/menu/app', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${tokenType} ${token}`
        }
      })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
    }

    const [collapsed, setCollapsed] = useState(false);
    const [showLoginPopup, setshowLoginPopup] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const menuAppHeaderItem = {
      label: (
        <>
          <p>로그인이 필요합니다.</p>
        </>
      ),
    };

    const handleLnbChange = () => {
      setCollapsed(!collapsed);
      onValueChange((prevValue)=>!prevValue)
    }
    
    const dividerItem = {
      type: 'divider',
    };
    const menuAppsProcessed = menuApps.map(app => (
      <Menu.Item key={app.appNo}>{app.appNm}</Menu.Item>
    ));
    return (
      <>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height:'61px',
            border:'1px solid #e2e6e8',
            position:'fixed',
            width:'100%',
            zIndex:9999
          }}
        >
          <div style={{display:'flex', clear:'none'}}>
          <div style={{ height:'60px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',  background:'white', borderBottom:'1px solid #e2e6e8'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height:'35px', paddingLeft:'15px'}}>
              <img src={Logo} alt='logo'/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
              <div style={{width: collapsed ? 0 : 190, overflow: collapsed ? 'hidden' : 'visible',display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',}}>
                <img src={LogoText} alt='logoText' style={{}}/>
              </div>
            </div>
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleLnbChange}
            style={{
              fontSize: '16px',
              width: 64,
              height: 60,
            }}
          />
          <div style={{width:'100%', display:'flex', flexDirection: "row", justifyContent: "flex-end", alignItems:'center'}}>
            {/* < Menu mode="horizontal" items={gnbItems} style={{height:'60px', flexDirection: "row", justifyContent: "flex-end"}}/> */}
            <div style={{marginRight:'30px'}}>
              <a
                href="https://docs.google.com/document/d/1MekkUblxY_1wMOBO78BKGx7QckOBiFhT/edit?usp=sharing&ouid=107943518726383742638&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tag color="geekblue">Guide</Tag>
              </a>
            </div>
            <Dropdown
              // menu={{
              //   items:mailItems,
              //   className: "custom-dropdown-menu mail"
              // }}
              overlay={
                noticesData ? (
                  noticesData.length > 0 ? (
                  <Menu>
                    <Menu.Item>
                      <p>알림</p>
                    </Menu.Item>
                    <Menu.Divider />
                    {noticesData}
                  </Menu>
                  ) : (
                    <Menu>
                    <Menu.Item>
                      <p>새로운 알림이 없습니다</p>
                    </Menu.Item>
                    <Menu.Divider />
                  </Menu>
                  )
                ) : (
                  <Menu style={{width:'200px'}}>
                    <Menu.Item>
                      <p>새로운 알림이 없습니다</p>
                    </Menu.Item>
                    <Menu.Divider />
                  </Menu>
                )
                // <Menu>{menuAppsProcessed}</Menu>
              }
              className="mailMenu"
              trigger={['click']}
              placement="bottomRight"
            >
              <BellFilled style={{marginRight:'30px'}} />
            </Dropdown>
            <Dropdown
              // menu={{
              //   items:menuApps.appNm,
              //   className: "custom-dropdown-menu app"
              // }}
              overlay={
                // <Menu>{menuAppsProcessed}</Menu>
                aboutMeData ? (
                <Menu>
                  <Menu.Item>
                    <p>{aboutMeData.adminNm}님이 사용중인 앱</p>
                  </Menu.Item>
                  <Menu.Divider />
                  {menuApps.map(app => {
                    const appOption = JSON.parse(app.appOption);
                    return (
                      <Menu.Item key={app.appNo}>
                        <Link to={appOption.path}>
                        <div>
                          <img src={appOption.icon} style={{ marginRight: 8 }} />
                          <span>{app.appNm}</span>
                          <p>{appOption.description}</p>
                        </div>
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu>
                ) : (
                  <Menu style={{width:'200px'}}>
                    <Menu.Item>
                      <p>데이터가 없습니다.</p>
                    </Menu.Item>
                    <Menu.Divider />
                    {menuApps.map(app => {
                      const appOption = JSON.parse(app.appOption);
                      return (
                        <Menu.Item key={app.appNo}>
                          <Link to={appOption.path}>
                          <div>
                            <img src={appOption.icon} style={{ marginRight: 8 }} />
                            <span>{app.appNm}</span>
                            <p>{appOption.description}</p>
                          </div>
                          </Link>
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                )
              }
              className="appMenu"
              trigger={['click']}
              placement="bottomRight"
            >
              <AppstoreFilled  style={{fontSize: '20px'}}/>
            </Dropdown>
            <Dropdown
              // menu={{
              //   items:userItems,
              //   className: "custom-dropdown-menu user"
              // }}
              overlay={
                // <Menu>{menuAppsProcessed}</Menu>
                token ? (
                <Menu style={{width:'200px'}}>
                  <Menu.Item onClick={handleOpenMyAccountModal}>
                    <p>My Account</p>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>
                    <p>Log out</p>
                  </Menu.Item>
                </Menu>
                ) : (
                  <Menu style={{width:'200px'}}>
                    <Menu.Item onClick={handleOpenLoginModal}>
                      Log In
                    </Menu.Item>
                  </Menu>
                )
              }
              className="userMenu"
              trigger={['click']}
              placement="bottomRight"
            >
              {aboutMeData ? (
                <span style={{cursor: 'pointer', marginLeft:'30px', marginRight:'30px', display:'flex', alignItems:'center'}}>
                  <img className="menuRoundIcon" src={userIcon} width={30} style={{marginRight:10, borderRadius:'50%'}}/>
                  {aboutMeData.adminNm}
                </span>
                ) : (
                  <span style={{cursor: 'pointer', marginLeft:'30px', marginRight:'30px', display:'flex', alignItems:'center'}}>
                    <img className="menuRoundIcon" src={userIcon} width={30} style={{marginRight:10, borderRadius:'50%'}}/>
                    log in
                </span>
              )}
            </Dropdown>
          </div>
          </div>
          <Popup open={showLoginPopup}>
            <div style={{width:'350px', height:'220px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
              <div style={{marginTop:'30px'}}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'50px'}} />
              </div>
              <div style={{marginTop:'25px', padding:'5px'}}>
                  <span style={{fontWeight:'bold', fontSize:'18px',}}>노출 제한 IP 등록이 완료되었습니다.</span>
              </div>
              <div style={{padding:'5px', marginBottom:'15px'}}>
                  <button onClick={() => {setshowLoginPopup(false);}} className="custom-btn" style={{marginTop:'15px', color:'white', background:'#41b3f9', marginLeft:'10px'}}>확인</button>
              </div>
            </div>
          </Popup>
        </Header>
        <LoginModal isModalOpen={isLoginModalOpen} handleOk={handleOk} />
        <MyAccountModal isModalOpen={isMyAccountModalOpen} handleOk={handleOk} />
      </>
    )
};
export default Gnb;