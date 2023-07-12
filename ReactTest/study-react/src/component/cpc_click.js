import React, { useEffect } from "react"
// import axios from 'axios'
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
  import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Descriptions, Switch, Image } from 'antd';
  import { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faUserSlash, faCircle } from '@fortawesome/free-solid-svg-icons'
  import Select from 'react-select'
  import Logo from '../img/admin-logo.png'
  import LogoText from '../img/admin-text.png'
  import CircExclm from '../img/circleExclm.png'
  import LoggerTAC from '../img/logger_logo_exposure/text-align-center.png'
  import LoggerTAL from '../img/logger_logo_exposure/text-align-left.png'
  import LoggerTAR from '../img/logger_logo_exposure/text-align-right.png'
  import LoggerWTAL from '../img/logger_logo_exposure/wide_text-align-left.png'
  import LoggerWTAR from '../img/logger_logo_exposure/wide_text-align-right.png'
  import TabPane from 'antd/es/tabs/TabPane';
  import { DatePicker, Space } from 'antd';
  import './cpc_click.css'
  import Popup from 'reactjs-popup'
  import Lnb from './lnb';
  import dayjs from 'dayjs';
  import moment from 'moment';
  import CpcClickTab2 from './cpc_click_tab2';
  import CpcClickTab1 from './cpc_click_tab1';
import { render } from "@testing-library/react";
  const { RangePicker } = DatePicker;
  const { Header, Sider, Content } = Layout;

  const CpcClick = () => {

    const [data, setData] = useState([]);

    const deleteData = (clientSeq, ip) => {
      // const {id, ip} = record;
      clientSeq = 106659;

      fetch(`http://api.logger.co.kr/anomaly-detection/ip-filter?clientSeq=${clientSeq}&fid=${ip}`, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData(data.filter(item => item.ip !== ip));
      })
      .catch((error) => {
        console.error('ERROR!!!!!!!!:', error);
      });
    };

    const handleDeleteSelected = () => {
      const selectedData = data.filter(item => item.checked);
      const selectedClientSeq = selectedData.map(item => item.clientSeq);
      const selectedFid = selectedData.map(item => item.fid);

      fetch('/ip-filter', {
        method:'DELETE',
        body: JSON.stringify({clientSeqs: selectedClientSeq, fids: selectedFid}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData(data.filter(item => !selectedClientSeq.includes(item.clientSeq) || !selectedFid.includes(item.fid)));
      })
      .catch((error) => {
        console.error('ERROR!!!!!!!:', error);
      });
    };
    
    const tab3Columns = [
      {
        title: '사이트명',
        dataIndex: 'profileName',
        align: 'center',
        width:'19%',
        // render: (text) => <a>{text}</a>,
      },
      {
        title: '도메인',
        dataIndex: 'profileDomain',
        align: 'center',
        width:'19%',
      },
      // {
      //   title: '영역',
      //   dataIndex: 'imageAlign',
      //   align: 'center',
      // },
      {
        title: 'IP 차단 여부',
        dataIndex: '',
        align: 'center',
        render: () => <div><FontAwesomeIcon icon={faCircle} style={{color: "#d6d6d6",}} /><span> OFF</span></div>
      },
      {
        title: '이미지 노출 여부',
        dataIndex: '',
        align: 'center',
        render: () => <div><FontAwesomeIcon icon={faCircle} style={{color: "#4cd2b5",}} /><span> ON</span></div>
      },
      {
        title: '스크립트',
        dataIndex: 'script',
        align: 'center',
        width:'50%',
        render: () => <div style={{height: '40px'}}><input value={anomalyDetectionScriptList[0].script} style={{border: '1px solid #e2e6e8', width:'100%', height:'100%'}} disabled/></div>
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
    
    const [selectedRange, setSelectedRange] = useState(null);

    const handleRangeChange = (dates) => {
      setSelectedRange(dates);
      console.log('range change', dates);
    };
  
    function callBack(key){
      console.log(key);
    };
    const [selectionType, setSelectionType] = useState('checkbox');
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const [autoIpBanChk, setAutoIpBanChk] = useState(true);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [anomalyDetectionScriptList, setAnomalyDetectionScriptList] = useState([]);

    useEffect(() => {
      fetchAnomalyDetectionScriptList();
    }, []);

    const fetchAnomalyDetectionScriptList = async () => {

      const response = await fetch('https://api.logger.co.kr/anomaly-detection/script?clientSeq=106659')
      .then((response) => response.json());

      const dataArray = Array.isArray(response) ? response : [response];

      setAnomalyDetectionScriptList(dataArray[0].data);
    };

    useEffect(() => {
      console.log('anomalyDetectionScriptList', anomalyDetectionScriptList);
    }, [anomalyDetectionScriptList]);

    // const logoExpImgSelected = () => {
    //   this.setState({selected: true});
    //   this.setState({editableColor: 'white'});
    // };

    return (
        // 메인화면
        <Content
          style={{
            margin: '24px 26px',
            padding: 24,
            minHeight: 860,
            background: colorBgContainer,
            marginLeft:'264px'
          }}
        >
          <div>
            <a>LOGGER <RightOutlined /></a>
            <h1 style={{fontSize:'large'}}><FontAwesomeIcon icon={faUserSlash} /> CPC 광고 중복 클릭 IP (네이버)</h1>
          </div>
          <div>
            <Tabs defaultActiveKey='1' onChange={callBack}>
            {/* {typeof window._trk_flashEnvView != 'undefined' && window._trk_flashEnvView("_TRK_PI=TEST")} */}
            {/* trackerward */}
              <TabPane tab='CPC 광고 중복 클릭 IP' key="1">
                <CpcClickTab1/>
              </TabPane>
              <TabPane tab='네이버 광고노출 차단 이력 및 관리' key="2">
                {/* <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30, marginBottom: 30, display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>필터 항목 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker onChange={handleRangeChange} defaultValue={[dayjs('2023/06/01'), dayjs('2023/07/01')]}/></div>
                    <div style={{width:'200px', marginLeft:20}}>
                        <button className='searchBtn' onClick={fetchNaverBlockedIpList} >확인</button>
                    </div>
                  </div>
                </div> */}
                <CpcClickTab2/>
              </TabPane>
              <TabPane tab='부정클릭 감시 설정' key="3">
                <div style={{ marginTop:-30}}>
                  <div className='cpcClickTabBq'>
                    <div className='cpcClickTabBqTFrame'></div>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 스크립트 설정에서 부정클릭 감시 조건에 따른 IP 차단 여부, 감시 이미지 노출 여부를 설정할 수 있습니다.
                      </p>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 부정클릭 감시 조건 설정을 저장한 후, 아래에서 스크립트를 복사하여 삽입해주세요. 설정 내용을 변경하였다면 스크립트를 새로 복사하여 주시기 바랍니다.
                      </p>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 부정클릭 의심 조건과 관계없이 감시 이미지를 자유롭게 노출하고 싶은 경우 직접 다운로드하여 활용해주시기 바랍니다.
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
                            <div style={{display:'flex', height:'60px', borderBottom:'1px solid #e2e6e8'}}>
                                <div className='popUp1H'>
                                스크립트 설정
                                </div>
                                <button className='popup1cls' onClick={close}>&times;</button>
                            </div>
                            <div style={{}}>
                                <div style={{margin:'10px',}}>
                                    <div className='cpcClickTabBq'>
                                        <div className='cpcClickTabBqTFrame'></div>
                                        <p className='cpcClickTabBqP'>
                                            {'\u25CF'}&nbsp;&nbsp;&nbsp; 페이지 이탈 후 5초 이내 재접속한 유입을 부정클릭 의심 접속 대상으로 합니다.
                                        </p>
                                        <p className='cpcClickTabBqP'>
                                            {'\u25CF'}&nbsp;&nbsp;&nbsp; 아래 설정한 조건에 따라 부정클릭 의심 IP로 판단하여 자동 차단 처리합니다.
                                        </p>
                                        <p className='cpcClickTabBqP'>
                                            {'\u25CF'}&nbsp;&nbsp;&nbsp; 감시 이미지 노출은 부정클릭 의심 조건에 해당하는 유입 횟수가 50% 이상일 때 노출됩니다.
                                        </p>
                                        <div className='cpcClickTabBqBFrame'></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{padding:'10px'}}>
                                <Descriptions bordered>
                                <Descriptions.Item style={{width:'230px'}} label="분석 사이트" span={3}>
                                    <select className="tab3PUSlct" style={{width:'50%'}}>
                                      <option value='bizspring'>
                                        bizspring
                                      </option>
                                      <option value='admonster'>
                                        admonster
                                      </option>
                                      <option value='logger'>
                                        logger
                                      </option>
                                    </select>
                                  </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div style={{margin:'10px',}}>
                                <span style={{fontWeight:'bold'}}>부정클릭 의심 IP 자동 차단 설정</span>
                            </div>
                            <div style={{margin:'10px',}}>
                              <Descriptions bordered >
                                      <Descriptions.Item style={{width:'230px'}} label="부정클릭 의심 조건 (페이지 이탈 후 5초 이내 재접속)" span={3}>
                                          <select className="tab3PUSlct">
                                              <option value='<3'>
                                                  3분 이내
                                              </option>
                                              <option value='<5'>
                                                  5분 이내
                                              </option>
                                              <option value='<7'>
                                                  7분 이내
                                              </option>
                                              <option value='<10'>
                                                  10분 이내
                                              </option>
                                              <option value='<15'>
                                                  15분 이내
                                              </option>
                                              <option value='<20'>
                                                  20분 이내
                                              </option>
                                          </select>
                                          <span> 동안 부정클릭으로 의심되는 접속이 </span>
                                          <select className="tab3PUSlct">
                                              <option value='>3'>
                                                  3회 이상
                                              </option>
                                              <option value='>5'>
                                                  5회 이상
                                              </option>
                                              <option value='>7'>
                                                  7회 이상
                                              </option>
                                              <option value='>10'>
                                                  10회 이상
                                              </option>
                                              <option value='>15'>
                                                  15회 이상
                                              </option>
                                              <option value='>20'>
                                                  20회 이상
                                              </option>
                                          </select>
                                          <span> 발생할 때</span>
                                      </Descriptions.Item>
                                      <Descriptions.Item label="자동 IP 차단" span={3}>
                                          <Switch checked={autoIpBanChk} onChange={setAutoIpBanChk} />
                                      </Descriptions.Item>
                                      <Descriptions.Item style={{width:'230px', fontSize:'small'}} label='부정클릭 유입 시 감시 이미지 노출' span={3}>
                                        <Switch style={{marginBottom:'10px'}} />
                                          <div style={{background:'#f8f8f8', padding:'10px'}}>
                                            <div style={{display:'flex', flexDirection:'row'}}>
                                              <div style={{background:'#41b3f9', color:'white', borderRadius:'15px', height:'20px', width:'80px', textAlign:'center'}}>
                                                <span style={{fontSize:'small'}}>STEP 1</span>
                                              </div>
                                              <span style={{marginLeft:'5px', fontSize:'13px'}}>PC에서 노출 위치를 선택하세요</span><br />
                                            </div>
                                            <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                                              <li style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                <label>
                                                  <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAL} alt="LoggerTAL" />
                                                </label>
                                              </li>
                                              <li style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                <label>
                                                  <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAC} alt="LoggerTAC" />
                                                </label>
                                              </li>
                                              <li style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                <label>
                                                  <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAR} alt="LoggerTAR" />
                                                </label>
                                              </li>
                                              <li style={{ flex: '0 0 280px', marginRight: '10px' }}>
                                                <label>
                                                  <img className="WLogoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerWTAL} alt="LoggerWTAL" />
                                                </label>
                                              </li>
                                              <li style={{ flex: '0 0 280px' }}>
                                                <label>
                                                  <img className="WLogoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerWTAR} alt="LoggerWTAR" />
                                                </label>
                                              </li>
                                            </ul>
                                            <div>
                                              <div style={{display:'flex', flexDirection:'row'}}>
                                                <div style={{background:'#41b3f9', color:'white', borderRadius:'15px', height:'20px', width:'80px', textAlign:'center'}}>
                                                  <span style={{fontSize:'small'}}>STEP 2</span>
                                                </div>
                                                <span style={{marginLeft:'5px', fontSize:'13px'}}>PC에서 노출 위치를 선택하세요</span><br />
                                              </div>
                                              <select style={{width:'300px', height:'30px', border:'1px solid #e2e6e8', marginBottom:'30px', marginTop:'10px'}}>
                                                  <option value='topLeft'>
                                                      왼쪽 상단
                                                  </option>
                                                  <option value='topCenter'>
                                                      중앙 상단
                                                  </option>
                                                  <option value='topRight'>
                                                      오른쪽 상단
                                                  </option>
                                                  <option value='midLeft'>
                                                      왼쪽 중앙
                                                  </option>
                                                  <option value='midCenter'>
                                                      중앙 중앙
                                                  </option>
                                                  <option value='midRight'>
                                                      오른쪽 중앙
                                                  </option>
                                                  <option value='btmLeft'>
                                                      왼쪽 하단
                                                  </option>
                                                  <option value='btmCenter'>
                                                      중앙 하단
                                                  </option>
                                                  <option value='btmRight'>
                                                      오른쪽 하단
                                                  </option>
                                              </select>
                                            </div>
                                        </div>
                                      </Descriptions.Item>
                                  </Descriptions>
                                <div style={{padding:'10px', borderTop:'1px solid #edecec', display:'flex', justifyContent: "flex-end"}}>
                                    <button className="searchBtn" style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}} onClick={() => {close();}}>취소</button>
                                    <button className="searchBtn">확인</button>
                                </div>
                            </div>
                        </div>
                      )}
                    </Popup>
                    <Popup trigger={<button className='searchBtn' style={{marginLeft:'10px', border:'1px solid #edecec' ,marginBottom:'15px', width:'200px', height:'30px', borderRadius:'3px', background:'white', color:'black'}}>부정클릭 감시 이미지 다운로드</button>} modal>
                      {close => (
                        <div className="popup1">
                        <div style={{display:'flex', height:'60px', borderBottom:'1px solid #e2e6e8'}}>
                            <div className='popUp1H'>
                            부정클릭 감시 이미지 다운로드
                            </div>
                            <button className='popup1cls' onClick={close}>&times;</button>
                        </div>
                        <div style={{margin:'10px',}}>
                              <div className='cpcClickTabBq' style={{marginTop:'-0px'}}>
                                  <div className='cpcClickTabBqTFrame'></div>
                                  <p className='cpcClickTabBqP'>
                                      {'\u25CF'}&nbsp;&nbsp;&nbsp; 부정클릭 의심 조건과 관계없이 감시 이미지를 자유롭게 노출하고 싶은 경우 직접 다운로드하여 활용해주시기 바랍니다.
                                  </p>
                                  <p className='cpcClickTabBqP'>
                                      {'\u25CF'}&nbsp;&nbsp;&nbsp; 이미지 활용은 권장 가이드를 확인해주세요.
                                  </p>
                                  <div className='cpcClickTabBqBFrame'></div>
                              </div>
                              <div style={{display:'flex', marginTop:'10px'}}>
                                  <span style={{fontWeight:'bold', fontSize:'13px', marginRight:'10px', marginTop:'3px'}}>이미지 다운로드</span>
                                  <a href="https://www.google.com/" target="_blank">
                                      <button className="logoRecGuid" style={{fontSize:'1px', justifyContent:'center', borderRadius:'3px', textAlignVertical:'center', alignItems:'center', background:'#edf7ff', border:'1px solid #9ac5ee', color:'#359bff'}}>
                                          권장 가이드
                                      </button>
                                  </a>
                              </div>
                              <ul style={{listStyleType:'none', display:'flex', flexDirection:'row', marginLeft:'-30px'}}>
                                  <li style={{width:'110px', height:'40px', marginRight:'10px'}}>
                                      {/* <div style={{position:'absolute', width:'110px', height:'40px', justifyContent:'center', display:'flex', textAlign:'center'}}>
                                          <span>
                                              download
                                          </span>
                                      </div> */}
                                      <a href={LoggerTAL} target="_blank" download>
                                          <button className="logoImgDlBtn">
                                            <span className="logoImgDlBox">다운로드</span>
                                            <label>
                                                <img onClick={() => console.log("clicked!")} className="logoExpImgMn" style={{width:'100px'}} src={LoggerTAL} alt="LoggerTAL"></img>
                                            </label>
                                          </button>
                                      </a>
                                  </li>
                                  <li>
                                      <a href={LoggerTAC} target="_blank" download>
                                          <button className="logoImgDlBtn">
                                              <span className="logoImgDlBox">다운로드</span>
                                              <label>
                                                  <img className="logoExpImgMn" style={{width:'100px'}} src={LoggerTAC} alt="LoggerTAC"></img>
                                              </label>
                                          </button>
                                      </a>        
                                  </li>
                                  <li>
                                      <a href={LoggerTAR} target="_blank" download>
                                          <button className="logoImgDlBtn">
                                            <span className="logoImgDlBox">다운로드</span>
                                            <label>
                                                <img className="logoExpImgMn" style={{width:'100px'}} src={LoggerTAR} alt="LoggerTAR"></img>
                                            </label>
                                          </button>
                                      </a>
                                  </li>
                                  <li>
                                      <a href={LoggerWTAL} target="_blank" download>
                                          <button className="logoImgDlBtnW" style={{marginRight:'10px'}}>
                                            <span className="logoImgDlBox" style={{width:'210px'}}>다운로드</span>
                                            <label>
                                                <img className="logoExpImgMn" style={{width:'200px'}} src={LoggerWTAL} alt="LoggerTAR"></img>
                                            </label>
                                          </button>
                                      </a>
                                  </li>
                                  <li>
                                      <a href={LoggerWTAR} target="_blank" download>
                                          <button className="logoImgDlBtnW" style={{}}>
                                            <span className="logoImgDlBox" style={{width:'210px'}}>다운로드</span>
                                            <label>
                                                <img className="logoExpImgMn" style={{width:'200px'}} src={LoggerWTAR} alt="LoggerWTAR"></img>
                                            </label>
                                          </button>
                                      </a>
                                  </li>
                              </ul>
                            <div style={{padding:'10px', borderTop:'1px solid #edecec', display:'flex', justifyContent: "flex-end"}}>
                                <button className="searchBtn" style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}} onClick={() => {close();}}>취소</button>
                                <button className="searchBtn">확인</button>
                            </div>
                        </div>
                      </div>
                      )}
                    </Popup>
                  </div>
                  <Table
                    columns={tab3Columns}
                    dataSource={anomalyDetectionScriptList}
                    bordered
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Content>
    )
  }
export default CpcClick;
  