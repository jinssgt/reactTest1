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
import Lnb from './lnb';
const { RangePicker } = DatePicker;
const { Header, Sider, Content } = Layout;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const tab2Columns = [
  {
    title: '광고 매체',
    dataIndex: 'advIdx',
    align: 'center',
    // render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.advIdx - b.advIdx
  },
  {
    title: '광고계정 / 아이디',
    dataIndex: 'advId',
    align: 'center',
    sorter: (a, b) => a.advId - b.advId,
  },
  {
    title: '광고 노출제한 IP',
    dataIndex: 'rstIP',
    align: 'center',
    sorter:(a, b) => a.rstIP - b.rstIP,
  },
  {
    title: '설명',
    dataIndex: 'desc',
    align: 'center',
    sorter:(a, b) => a.desc - b.desc,
  },
  {
    title: '등록일시',
    dataIndex: 'regDate',
    align: 'center',
    sorter:(a, b) => a.regDate - b.regDate,
  },
  {
    title: '차단관리',
    dataIndex: 'unban',
    align: 'center',
    render: () => <button className='unbanBtn'>차단해제</button>,
    sorter:(a, b) => a.unban - b.unban,
  },
];
const tab2Data = [
  {
    key: '1',
    advIdx: '네이버',
    advId: '115804',
    rstIP: '106.249.33.10',
    desc: '부정클릭 의심차단',
    regDate: '2023-04-27 10:00:00',
  },
  {
    key: '2',
    advIdx: '네이버',
    advId: '115806',
    rstIP: '106.249.33.30',
    desc: '부정클릭 의심차단',
    regDate: '2023-04-27 10:20:00',
  },
  {
    key: '3',
    advIdx: '네이버',
    advId: '115805',
    rstIP: '106.249.33.20',
    desc: '부정클릭 의심차단',
    regDate: '2023-04-27 10:10:00',
  },
];

const tab3Columns = [
  {
    title: '사이트명',
    dataIndex: 'siteNm',
    align: 'center',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: '도메인',
    dataIndex: 'domain',
    align: 'center',
  },
  {
    title: '영역',
    dataIndex: 'region',
    align: 'center',
  },
  {
    title: '스크립트',
    dataIndex: 'script',
    align: 'center',
    width:'40%',
    render: () => <div style={{border: '1px solid #e2e6e8', height: '40px'}}><text disabled>{}</text></div>
  },
];
const tab3Data = [
  {
    key: '1',
    siteNm: 'bizspring',
    domain: 'bizspring.co.kr',
    region: '상단 우측',
    script: '부정클릭 의심차단',
  },
  {
    key: '2',
    siteNm: 'bizspring',
    domain: 'bizspring.co.kr',
    region: '상단 우측',
    script: '부정클릭 의심차단',
  },
  {
    key: '3',
    siteNm: 'bizspring',
    domain: 'bizspring.co.kr',
    region: '상단 우측',
    script: '부정클릭 의심차단',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const customSelectStyles = {
  control: base => ({
    ...base,
    height: 31,
    minHeight: 31,
    textAlign: 'center',
    justifyContent: 'center',
    display:'flex',
    alignItems:'center'

  })
}

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

const measCat1 = [
  {
    label: 'CPC 광고 매체 전체',
    value: '1'
  },
  {
    label: '네이버 사이트 검색광고',
    value: '2'
  },
  {
    label: '네이버 클릭초이스 상품광고',
    value: '3'
  },
  {
    label: '네이버 쇼핑검색광고',
    value: '4'
  },
  {
    label: '네이버 성과형 디스플레이 광고(GFA)',
    value: '5'
  },
]

const measCat2 = [
  {
    label: '레퍼러 전체 선택',
    value: '1'
  },
  {
    label: '레퍼러 있음',
    value: '2'
  },
  {
    label: '레퍼러 없음',
    value: '3'
  },
]

const measCat3 = [
  {
    label: '전체 유입횟수',
    value: '1'
  },
  {
    label: '전체 유입횟수 5회 이상',
    value: '2'
  },
  {
    label: '전체 유입횟수 10회 이상',
    value: '3'
  },
  {
    label: '전체 유입횟수 20회 이상',
    value: '4'
  },
  {
    label: '전체 유입횟수 30회 이상',
    value: '5'
  },
  {
    label: '전체 유입횟수 40회 이상',
    value: '6'
  },
  {
    label: '전체 유입횟수 50회 이상',
    value: '7'
  },
  {
    label: '전체 유입횟수 60회 이상',
    value: '8'
  },
  {
    label: '전체 유입횟수 70회 이상',
    value: '9'
  },
  {
    label: '전체 유입횟수 80회 이상',
    value: '10'
  },
  {
    label: '전체 유입횟수 90회 이상',
    value: '11'
  },
  {
    label: '전체 유입횟수 100회 이상',
    value: '12'
  },
]

const measCat4 = [
  {
    label: '전체 클릭수',
    value: '1'
  },
  {
    label: '전체 클릭수 5회 이상',
    value: '2'
  },
  {
    label: '전체 클릭수 10회 이상',
    value: '3'
  },
  {
    label: '전체 클릭수 20회 이상',
    value: '4'
  },
  {
    label: '전체 클릭수 30회 이상',
    value: '5'
  },
  {
    label: '전체 클릭수 40회 이상',
    value: '6'
  },
  {
    label: '전체 클릭수 50회 이상',
    value: '7'
  },
  {
    label: '전체 클릭수 60회 이상',
    value: '8'
  },
  {
    label: '전체 클릭수 70회 이상',
    value: '9'
  },
  {
    label: '전체 클릭수 80회 이상',
    value: '10'
  },
  {
    label: '전체 클릭수 90회 이상',
    value: '11'
  },
  {
    label: '전체 클릭수 100회 이상',
    value: '12'
  },
]

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

const CpcClickLnbGnbSample = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectionType, setSelectionType] = useState('checkbox');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider width={collapsed ? 0 : 240} style={{ background: colorBgContainer }}>
        <div className="demo-logo-vertical" />
        <div style={{height:'60px', justifyContent:'center', textAlign:'center', padding:20}}>
          <a><img src={Logo} alt='logo'/> <img src={LogoText} alt='logoText'/></a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: 10}}>
            <div style={{ background: colorBgContainer }}>
                <p>광고주 선택</p>
                <Select
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
          style={{height:'100%'}}
          items={lnbItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
              height: 64,
            }}
          />
          <div style={{width:'100%'}}>< Menu mode="horizontal" items={gnbItems} style={{height:'60px', flexDirection: "row",
        justifyContent: "flex-end"}}/></div>
        </div>
        </Header>
        <Content
          style={{
            margin: '24px 26px',
            padding: 24,
            minHeight: 793,
            background: colorBgContainer,
          }}
        >
          <div>
            <a>LOGGER <RightOutlined /></a>
            <h1 style={{fontSize:'large'}}><FontAwesomeIcon icon={faUserSlash} /> CPC 광고 중복 클릭 IP (네이버)</h1>
          </div>
          <div>
            <Tabs defaultActiveKey='1' onChange={callBack}>
              <TabPane tab='CPC 광고 중복 클릭 IP' key="1">
                <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30,  display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>기간 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker/></div>
                  </div>
                  <div style={{marginLeft: 30, marginRight: 30, marginBottom: 30, marginTop: 15, display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>측정항목 <RightCircleFilled/></div>
                    <div style={{marginLeft: 38, display:'flex', width:'80%'}}>
                      <div style={{width:'25%'}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat1.value = '1'}
                        onChange={handleChange}
                        styles={customSelectStyles}
                        options={measCat1}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat1.value = '1'}
                        onChange={handleChange}
                        styles={customSelectStyles}
                        options={measCat2}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat1.value = '1'}
                        onChange={handleChange}
                        styles={customSelectStyles}
                        options={measCat3}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat1.value = '1'}
                        onChange={handleChange}
                        styles={customSelectStyles}
                        options={measCat4}/>
                      </div>
                      <div style={{width:'200px', marginLeft:20}}>
                        <button className='searchBtn' >확인</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='cpcClickTabBq'>
                    <div className='cpcClickTabBqTFrame'></div>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp;일부 CPC광고는 추적 URL을 설정하거나, 광고매체에 추적 URL을 생성/등록하셔야 분석이 이루어집니다.
                      </p>
                      <p className='cpcClickTabBqP'>
                      {'\u25CF'}&nbsp;&nbsp;&nbsp;본 리포트는 빠른 조회를 위하여 금일 1시간 이전 데이터를 조회합니다.
                      </p>
                      <p className='cpcClickTabBqP'>
                      {'\u25CF'}&nbsp;&nbsp;&nbsp;본 리포트는 최근 100일 동안의 데이터를 조회합니다.
                      </p>
                    <div className='cpcClickTabBqBFrame'></div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab='네이버 광고노출 차단 이력 및 관리' key="2">
                <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30, marginBottom: 30, display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>필터 항목 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker/></div>
                  </div>
                </div>
                <div className='cpcClickTabBq'>
                  <div className='cpcClickTabBqTFrame'></div>
                    <p className='cpcClickTabBqP'>
                      {'\u25CF'}&nbsp;&nbsp;&nbsp; 차단 IP 해제 시 : 네이버 클릭초이스는 약 2분 후에 적용됩니다. (광고매체 사정에 따라 시간차가 있을 수 있습니다.)
                    </p>
                  <div className='cpcClickTabBqBFrame'></div>
                </div>
                <div className='tabTableDiv'>
                  <div>
                    <p style={{fontWeight:'bold'}}>IP 차단 이력 및 관리</p>
                  </div>
                  <div style={{display:'flex', marginBottom:'-7px'}}>
                    <button className='unbanBtnGray'>선택 차단 해제</button>
                    <p style={{fontWeight:'bold', fontSize:'13px', marginLeft:'10px'}}>노출제한 관리 목록: 클릭초이스()</p>
                  </div>
                  <Table
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={tab2Columns}
                    dataSource={tab2Data}
                    bordered
                  />
                </div>
              </TabPane>
              <TabPane tab='부정클릭 감시 설정' key="3">
                <div style={{ marginTop:-30}}>
                  <div className='cpcClickTabBq'>
                    <div className='cpcClickTabBqTFrame'></div>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 스크립트 설정에서 부정클릭 감시 조건을 설정한 후 아래에서 스크립트를 복사하여 삽입해주세요.
                      </p>
                      <p className='cpcClickTabBqP'>
                      {'\u25CF'}&nbsp;&nbsp;&nbsp;부정클릭 감시 설정을 변경하였다면 스크립트를 새로 복사하여 주시기 바랍니다.
                      </p>
                    <div className='cpcClickTabBqBFrame'></div>
                  </div>
                </div>
                <div className='tabTableDiv'>
                  <div>
                    <p style={{fontWeight:'bold'}}>부정클릭 감시 스크립트 삽입</p>
                  </div>
                  <div style={{display:'flex', marginBottom:'-7px'}}>
                    <Popup trigger={<button className='searchBtn' style={{marginBottom:'15px', width:'105px', height:'30px', borderRadius:'3px'}}>스크립트 설정</button>} modal>
                      {close => (
                        <div className="popup1">
                          <div style={{display:'flex', height:'60px', borderBottom:'1px solid black'}}>
                            <div className='popUp1H'>
                              스크립트 설정
                            </div>
                            <button className='popup1cls' onClick={close}>&times;</button>
                          </div>
                          <div>
                            <div>
                              <p style={{fontWeight:'bold'}}>부정클릭 감시 스크립트 삽입</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                  <Table
                    columns={tab3Columns}
                    dataSource={tab3Data}
                    bordered
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CpcClickLnbGnbSample;