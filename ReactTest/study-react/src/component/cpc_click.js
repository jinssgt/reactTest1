import React, { useEffect, useRef } from "react"
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
  import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
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
    const [switchChecked, setSwitchChecked] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    
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
    
    const inputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseStatus = (value) => {
      if(value === true) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    }
    
    const [hoveredRow, setHoveredRow] = useState(null);

    const setProfileNameParam = (data) => {
      setProfileName(data);
    }
    
    const copyToClipBoard = async () => {
      try {
        if (inputRef.current) {
          inputRef.current.select();
    
          const permissionStatus = await navigator.permissions.query({ name: 'clipboard-write' });
    
          if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
            // Clipboard write access granted or will be prompted
            navigator.clipboard.writeText(inputRef.current.value)
              .then(() => {
                console.log('Text copied to clipboard.');
              })
              .catch(error => {
                console.error('Error copying text to clipboard:', error);
              });
          } else {
            console.warn('Clipboard write access denied.');
            // Implement fallback method (e.g., document.execCommand('copy')) if needed
          }
        }
      } catch (error) {
        console.error('Error requesting clipboard permission:', error);
      }
    };
    
    
    const tab3Columns = [
      {
        title: 'pfno',
        dataIndex: 'pfno',
        align:'center',
        hidden: true,
      },
      {
        title: 'termWindow',
        dataIndex: 'termWindow',
        align:'center',
        hidden: true,
      },
      {
        title: 'clickLimit',
        dataIndex: 'clickLimit',
        align: 'center',
        hidden: true,
      },
      {
        title: 'imageType',
        dataIndex: 'imageType',
        align: 'center',
        hidden: true,
      },
      {
        title: 'imageAlign',
        dataIndex: 'imageAlign',
        align: 'center',
        hidden: true,
      },
      {
        title: '사이트명',
        dataIndex: 'profileName',
        align: 'center',
        width:'13%',
        // render: (text) => <a>{text}</a>,
      },
      {
        title: '도메인',
        dataIndex: 'profileDomain',
        align: 'center',
        width:'13%',
      },
      {
        title: 'IP 차단 여부',
        dataIndex: 'autoFilter',
        align: 'center',
        width: '10%',
        render: (value) => <div><FontAwesomeIcon icon={faCircle} style={{color: value === 'Y' ? "#4cd2b5": "#d6d6d6"}} /><span>{value === 'Y' ? ' ON' : ' OFF'}</span></div>
      },
      {
        title: '이미지 노출 여부',
        dataIndex: 'showWarning',
        align: 'center',
        render: (value) => <div><FontAwesomeIcon icon={faCircle} style={{color: value === 'Y' ? "#4cd2b5": "#d6d6d6"}} /><span>{value === 'Y' ? ' ON' : ' OFF'}</span></div>
      },
      {
        title: '스크립트',
        dataIndex: 'script',
        align: 'center',
        width:'45%',
        render: (text, record, index) => <div style={{position:'relative', height: '40px', padding:'0px'}} onMouseEnter={() => setHoveredRow(index)} onMouseLeave={() => setHoveredRow(null)}>
          <input ref={inputRef} type="text" value={anomalyDetectionScriptList[0].script} style={{border: '1px solid #e2e6e8', width:'100%', height:'100%'}} disabled/>
          {hoveredRow === index && (
            <button className="copyBtn" style={{position: 'absolute', top: '0px', right: '0px'}} onClick={copyToClipBoard}>복사하기</button>
          )}
        </div>
      },
      {
        title: '스크립트 관리',
        align: 'center',
        render: (text, record) =>
        <Popup trigger={<button onMouseEnter={() => setProfileNameParam(record.pfno)} className="default-btn">스크립트 설정</button>} modal>
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
                    <div>{record.profileName}</div>
                  </Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{margin:'10px',}}>
                <span style={{fontWeight:'bold'}}>부정클릭 의심 IP 자동 차단 설정</span>
            </div>
            <div style={{margin:'10px',}}>
              <Descriptions bordered >
                      <Descriptions.Item style={{width:'230px'}} label="부정클릭 의심 조건 (페이지 이탈 후 5초 이내 재접속)" span={3}>
                          <select value={termWindowSelect} onChange={handleTermWindowChange} className="tab3PUSlct">
                              {termOption.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                          </select>
                          <span> 동안 부정클릭으로 의심되는 접속이 </span>
                          <select value={clickLimitSelect} onChange={handleClickLimitChange} className="tab3PUSlct">
                              {clickLimitOption.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                          </select>
                          <span> 발생할 때</span>
                      </Descriptions.Item>
                      <Descriptions.Item label="자동 IP 차단" span={3}>
                          <Switch onChange={handleAutoFilterChange} />
                      </Descriptions.Item>
                      <Descriptions.Item style={{width:'230px', fontSize:'small'}} label='부정클릭 유입 시 감시 이미지 노출' span={3}>
                        <Switch style={{ marginBottom: '10px' }} onChange={(checked) => {setSwitchChecked(checked); handleShowWarningChange(checked);}} />
                          {switchChecked ? (
                            <div className="hide" style={{background:'#f8f8f8', padding:'10px'}}>
                              <div style={{display:'flex', flexDirection:'row'}}>
                                <div style={{background:'#41b3f9', color:'white', borderRadius:'15px', height:'20px', width:'80px', textAlign:'center'}}>
                                  <span style={{fontSize:'small'}}>STEP 1</span>
                                </div>
                                <span style={{marginLeft:'5px', fontSize:'13px'}}>PC에서 노출 위치를 선택하세요</span><br />
                              </div>
                              <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                                <li onClick={() => changeImageType('TAL')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                  <label>
                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAL} alt="LoggerTAL" />
                                  </label>
                                </li>
                                <li onClick={() => changeImageType('TAC')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                  <label>
                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAC} alt="LoggerTAC" />
                                  </label>
                                </li>
                                <li onClick={() => changeImageType('TAR')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                  <label>
                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAR} alt="LoggerTAR" />
                                  </label>
                                </li>
                                <li onClick={() => changeImageType('WTAL')} style={{ flex: '0 0 280px', marginRight: '10px' }}>
                                  <label>
                                    <img className="WLogoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerWTAL} alt="LoggerWTAL" />
                                  </label>
                                </li>
                                <li onClick={() => changeImageType('WTAR')} style={{ flex: '0 0 280px' }}>
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
                                <select onChange={handleImagePositionChange} style={{width:'300px', height:'30px', border:'1px solid #e2e6e8', marginBottom:'30px', marginTop:'10px'}}>
                                  {imagePositionOption.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ): null}
                      </Descriptions.Item>
                  </Descriptions>
                <div style={{padding:'10px', borderTop:'1px solid #edecec', display:'flex', justifyContent: "flex-end"}}>
                    <button className="searchBtn" style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}} onClick={() => {close();}}>취소</button>
                    <button className="searchBtn" onClick={handleUpdateScript}>저장</button>
                    <Popup open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
                      <div style={{width:'350px', height:'220px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                        <div style={{marginTop:'30px'}}>
                          <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'50px'}} />
                        </div>
                        <div style={{marginTop:'25px', padding:'5px'}}>
                            <span style={{fontWeight:'bold', fontSize:'18px',}}>노출 제한 IP 등록이 완료되었습니다.</span>
                        </div>
                        <div style={{padding:'5px', marginBottom:'15px'}}>
                            <button onClick={() => {close();}} className="btn costom-btn" style={{marginTop:'15px', color:'white', background:'#41b3f9', marginLeft:'10px'}}>확인</button>
                        </div>
                      </div>
                    </Popup>
                </div>
            </div>
            </div>
          )}
        </Popup>
        ,
      }
    ].filter(item => !item.hidden);
    
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
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [anomalyDetectionScriptList, setAnomalyDetectionScriptList] = useState([]);
    
    useEffect(() => {
      fetchAnomalyDetectionScriptList();
      anomalyDetectionProfileList();
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

    // 스크립트 설정 분석사이트 옵션
    const [profileList, setProfileList] = useState();

    // 'anomaly detection script - Add' site select options per clientSeq
    const anomalyDetectionProfileList = () => {
      const apiUrl = 'https://api.logger.co.kr/anomaly-detection/profile';
      const clientSeq = 106659;
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const apiUrlWithParam = `${apiUrl}?clientSeq=${clientSeq}`;

      fetch(apiUrlWithParam, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('success1111111111', data);
        const dataArray = Array.isArray(data) ? data : [data];
        setProfileList(dataArray[0].data);
      })
      .catch((error) => {
        console.error('Error11111111111', error);
      })
    }
    
    // const logoExpImgSelected = () => {
      //   this.setState({selected: true});
      //   this.setState({editableColor: 'white'});
      // };
      
    const siteOption = [
      {
        label: 'bizspring',
        value: 'bizspring',
      },
      {
        label: 'admonster',
      value: 'admonster',
      },
      {
        label: 'logger',
        value: 'logger',
      },
    ];
    
    const clickLimitOption = [
      {
        label: '3회 이상',
        value: '3',
      },
      {
        label: '5회 이상',
        value: '5',
      },
      {
        label: '7회 이상',
        value: '7',
      },
      {
        label: '10회 이상',
        value: '10',
      },
      {
        label: '15회 이상',
        value: '15',
      },
      {
        label: '20회 이상',
        value: '20',
      },
    ];
    
    const termOption = [
      {
        label: '3분 이내',
        value: '3',
      },
      {
        label: '5분 이내',
        value: '5',
      },
      {
        label: '7분 이내',
        value: '7',
      },
      {
        label: '10분 이내',
        value: '10',
      },
      {
        label: '15분 이내',
        value: '15',
      },
      {
        label: '20분 이내',
        value: '20',
      },
    ];
    
    const imagePositionOption = [
      {
        label: '왼쪽 상단',
        value: 'TOP-LEFT',
      },
      {
        label: '중앙 상단',
        value: 'TOP-CENTER',
      },
      {
        label: '오른쪽 상단',
        value: 'TOP-RIGHT',
      },
      {
        label: '왼쪽 중앙',
        value: 'MIDDLE-LEFT',
      },
      {
        label: '중앙 중앙',
        value: 'CC',
      },
      {
        label: '오른쪽 중앙',
        value: 'MIDDLE-RIGHT',
      },
      {
        label: '왼쪽 하단',
        value: 'BOTTOM-LEFT',
      },
      {
        label: '중앙 하단',
        value: 'BOTTOM-CENTER',
      },
      {
        label: '오른쪽 하단',
        value: 'BOTTOM-RIGHT',
      },
    ]
    
    const [termWindowSelect, setTermWindowSelect] = useState(3);
    const [clickLimitSelect, setClickLimitSelect] = useState(3);
    const [autoFilter, setAutoFilter] = useState('N');
    const [imageType, setImageType] = useState();
    const [imageAlign, setImageAlign] = useState();
    const [showWarning, setShowWarning] = useState('N');
    const [profileDomain, setProfileDomain] = useState();
    const [profileName, setProfileName] = useState('23884');
    const [clientSeq, setClientSeq] = useState(106659);
    
    const handleAddScript = () => {
      const column_vals = [{"clientSeq": clientSeq, "autoFilter": autoFilter, "imageType": imageType, "termWindow": termWindowSelect, "clickLimit": clickLimitSelect, "showWarning": showWarning, "imageAlign": imageAlign, "profileDomain": profileDomain, "pfno": profileName, }];

      
      if(column_vals[0].imageType == undefined && switchChecked){
        alert('이미티 종류를 선택해주세요.');
      } else if(column_vals[0].imageType !== undefined && switchChecked) {
        const payload = `{"clientSeq":"${column_vals[0].clientSeq}", "autoFilter":"${column_vals[0].autoFilter}", "imageType":"${column_vals[0].imageType}","termWindow":${column_vals[0].termWindow},"clickLimit":${column_vals[0].clickLimit}, "showWarning":"${column_vals[0].showWarning}","imageAlign":"${column_vals[0].imageAlign}","pfno":"${column_vals[0].pfno}" }`;
        console.log('handleAddScriptParam: ', payload);
        fetch('https://api.logger.co.kr/anomaly-detection/script', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
        .then((response) => {
          if (response.ok){
            setShowSuccessPopup(true);
            return response.json();
          } else {
            throw new Error('Error adding data');
          }
        })
        .catch((error) => {
          alert('ERROR ADDING DATA', error);
        });
      } else {
        column_vals[0].imageType = undefined;
        const payload = `{"clientSeq":${column_vals[0].clientSeq}, "autoFilter":"${column_vals[0].autoFilter}", "termWindow":${column_vals[0].termWindow}, "clickLimit":${column_vals[0].clickLimit},"showWarning":"${column_vals[0].showWarning}","imageAlign":"${column_vals[0].imageAlign}","pfno":"${column_vals[0].pfno}" }`;
        console.log('handleAddScriptParam: ', payload);
        fetch('https://api.logger.co.kr/anomaly-detection/script', {
          method:'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: payload,
        })
        .then((response) => {
          if (response.ok){
            setShowSuccessPopup(true);
            return response.json();
          } else {
            throw new Error('Error adding data');
          }
        })
        .catch((error) => {
          alert('ERROR ADDING DATA', error);
        });
      };

    };
    const handleUpdateScript = () => {
      const column_vals = [{"clientSeq": clientSeq, "autoFilter": autoFilter, "imageType": imageType, "termWindow": termWindowSelect, "clickLimit": clickLimitSelect, "showWarning": showWarning, "imageAlign": imageAlign, "profileDomain": profileDomain, "pfno": profileName, }];

      if(column_vals[0].imageType == undefined && switchChecked){
        alert('이미티 종류를 선택해주세요.');
      } else if (column_vals[0].imageType !== undefined && switchChecked){
        const payload = `{"clientSeq":"${column_vals[0].clientSeq}", "autoFilter":"${column_vals[0].autoFilter}", "imageType":"${column_vals[0].imageType}","termWindow":${column_vals[0].termWindow},"clickLimit":${column_vals[0].clickLimit}, "showWarning":"${column_vals[0].showWarning}","imageAlign":"${column_vals[0].imageAlign}","pfno":"${column_vals[0].pfno}" }`;
        console.log('handleUpdateScriptParam: ', payload);
        fetch('https://api.logger.co.kr/anomaly-detection/script', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
        .then((response) => {
          if (response.ok){
            fetchAnomalyDetectionScriptList();
            setShowSuccessPopup(true);
            return response.json();
          } else {
            throw new Error('Error updating data');
          }
        })
        .catch((error) => {
          alert('Error Adding Data', error);
        });
      } else {
        column_vals[0].imageAlign = undefined;
        const payload = `{"clientSeq":${column_vals[0].clientSeq}, "autoFilter":"${column_vals[0].autoFilter}", "termWindow":${column_vals[0].termWindow}, "clickLimit":${column_vals[0].clickLimit},"showWarning":"${column_vals[0].showWarning}","imageAlign":"${column_vals[0].imageAlign}","pfno":"${column_vals[0].pfno}" }`;
        console.log('handleUpdateScriptParam: ', payload);
        fetch('https://api.logger.co.kr/anomaly-detection/script', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        })
        .then((response) => {
          if (response.ok){
            fetchAnomalyDetectionScriptList();
            setShowSuccessPopup(true);
            return response.json();
          } else {
            throw new Error('Error updating data');
          }
        })
        .catch((error) => {
          alert('ERROR UPDATING DATA!', error);
        });
      };
    };

    const handleDeleteData = (clientSeq, fid) => {
      clientSeq = 106659;
      console.log('delete init!!!!!!');

      fetch(`https://api.logger.co.kr/anomaly-detection/script?clientseq=${clientSeq}&fid=${fid}` ,{
        method: 'DELETE',
      })
      .then((response) => {
        setShowSuccessPopup(true);
        fetchAnomalyDetectionScriptList();
        response.json();
      })
      .catch((error) => {
        console.error('ERROR!!!!!!', error);
        alert('삭제 실패', error);
      });
    }

    const handleImagePositionChange = (event) => {
      const value = event.target.value;
      setImageAlign(value);
      console.log('image position change', value);
    }
    
    const changeImageType = (value) => {
      if(value == "TAL"){
        const imgtp = 'text-align-left.png';
        setImageType(imgtp);
        console.log('TAL image set', imgtp);
      } else if(value == "TAC"){
        const imgtp = 'text-align-center.png';
        setImageType(imgtp);
        console.log('TAC image set', imgtp);
      } else if(value == "TAR"){
        const imgtp = 'text-align-right.png';
        setImageType(imgtp);
        console.log('TAR image set', imgtp);
      } else if(value == "WTAL"){
        const imgtp = 'wide_text-align-left.png';
        setImageType(imgtp);
        console.log('WTAL image set', imgtp);
      } else {
        const imgtp = 'wide_text-align-right.png';
        setImageType(imgtp);
        console.log('WTAR image set', imgtp);
      }
    }

    const handleShowWarningChange = (checked) => {
      const value = checked ? 'Y' : 'N';
      setShowWarning(value);
      console.log('show warning change', value);
    }
    
    const handleAutoFilterChange = (checked) => {
      const value = checked ? 'Y' : 'N';
      setAutoFilter(value);
      console.log('auto filter change', value);
    }

    const handleSiteChange = (event) => {
      const value = event.target.value;
      setProfileName(value);
      if(value == 23884){
        setProfileDomain('bizspring.co.kr');
        console.log('value is 23884');
      } else if (value == 300021){
        setProfileDomain('changeTest.co.kr');
        console.log('value is 300021');
      }
      console.log('Site Change', value);
    };
    
    const handleTermWindowChange = (event) => {
      const value = event.target.value;
      setTermWindowSelect(value);
      console.log('Term Window Change', value);
    };

    const handleClickLimitChange = (event) => {
      const value = event.target.value;
      setClickLimitSelect(value);
      console.log('click Limit Change', value);
    };

    return (
        // 메인화면
        <>
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
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 스크립트 추가를 마친 후, 아래에서 스크립트를 복사하여 삽입해주세요. 설정 내용을 변경할 때 [스크립트 관리 &gt; 수정]에서 변경된 내용을 저장 후 스크립트를 새로 복사하여 주시기 바랍니다.
                      </p>
                      <p className='cpcClickTabBqP'>
                        {'\u25CF'}&nbsp;&nbsp;&nbsp; 부정클릭 의심 조건과 관계없이 감시 이미지를 자유롭게 노출하고 싶은 경우 직접 다운로드하여 활용해주시기 바랍니다.
                      </p>
                    <div className='cpcClickTabBqBFrame'></div>
                  </div>
                </div>
                <div className='tabTableDiv'>
                  <div>
                    <p style={{fontSize:'16px', fontWeight:600}}>부정클릭 감시 스크립트 삽입</p>
                  </div>
                  <div style={{display:'flex', marginBottom:'-7px'}}>
                    <Popup trigger={<button className='costom-btn' style={{marginBottom:'15px',}}>스크립트 설정</button>} modal>
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
                                    <select value={profileName} onChange={handleSiteChange} className="tab3PUSlct" style={{width:'50%'}}>
                                      {profileList.map((option) => (
                                        <option key={option.pfno} value={option.pfno}>
                                          {option.name}
                                        </option>
                                      ))}
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
                                          <select value={termWindowSelect} onChange={handleTermWindowChange} className="tab3PUSlct">
                                              {termOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                  {option.label}
                                                </option>
                                              ))}
                                          </select>
                                          <span> 동안 부정클릭으로 의심되는 접속이 </span>
                                          <select value={clickLimitSelect} onChange={handleClickLimitChange} className="tab3PUSlct">
                                              {clickLimitOption.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                  {option.label}
                                                </option>
                                              ))}
                                          </select>
                                          <span> 발생할 때</span>
                                      </Descriptions.Item>
                                      <Descriptions.Item label="자동 IP 차단" span={3}>
                                          <Switch onChange={handleAutoFilterChange} />
                                      </Descriptions.Item>
                                      <Descriptions.Item style={{width:'230px', fontSize:'small'}} label='부정클릭 유입 시 감시 이미지 노출' span={3}>
                                        <Switch style={{ marginBottom: '10px' }} onChange={(checked) => {setSwitchChecked(checked); handleShowWarningChange(checked);}} />
                                          {switchChecked ? (
                                            <div className="hide" style={{background:'#f8f8f8', padding:'10px'}}>
                                              <div style={{display:'flex', flexDirection:'row'}}>
                                                <div style={{background:'#41b3f9', color:'white', borderRadius:'15px', height:'20px', width:'80px', textAlign:'center'}}>
                                                  <span style={{fontSize:'small'}}>STEP 1</span>
                                                </div>
                                                <span style={{marginLeft:'5px', fontSize:'13px'}}>PC에서 노출 위치를 선택하세요</span><br />
                                              </div>
                                              <ul style={{ listStyleType: 'none', display: 'flex', flexWrap: 'wrap', padding: 0 }}>
                                                <li onClick={() => changeImageType('TAL')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                  <label>
                                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAL} alt="LoggerTAL" />
                                                  </label>
                                                </li>
                                                <li onClick={() => changeImageType('TAC')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                  <label>
                                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAC} alt="LoggerTAC" />
                                                  </label>
                                                </li>
                                                <li onClick={() => changeImageType('TAR')} style={{ flex: '0 0 183px', marginRight: '10px' }}>
                                                  <label>
                                                    <img className="logoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerTAR} alt="LoggerTAR" />
                                                  </label>
                                                </li>
                                                <li onClick={() => changeImageType('WTAL')} style={{ flex: '0 0 280px', marginRight: '10px' }}>
                                                  <label>
                                                    <img className="WLogoExpImg" style={{ width: '100%', marginBottom: '10px' }} src={LoggerWTAL} alt="LoggerWTAL" />
                                                  </label>
                                                </li>
                                                <li onClick={() => changeImageType('WTAR')} style={{ flex: '0 0 280px' }}>
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
                                                <select onChange={handleImagePositionChange} style={{width:'300px', height:'30px', border:'1px solid #e2e6e8', marginBottom:'30px', marginTop:'10px'}}>
                                                  {imagePositionOption.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                      {option.label}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>
                                          ): null}
                                      </Descriptions.Item>
                                  </Descriptions>
                                <div style={{padding:'10px', borderTop:'1px solid #edecec', display:'flex', justifyContent: "flex-end"}}>
                                    <button className="searchBtn" style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}} onClick={() => {close();}}>취소</button>
                                    <button className="searchBtn" onClick={handleAddScript}>저장</button>
                                    <Popup open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
                                      <div style={{width:'350px', height:'220px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                                        <div style={{marginTop:'30px'}}>
                                          <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'50px'}} />
                                        </div>
                                        <div style={{marginTop:'25px', padding:'5px'}}>
                                            <span style={{fontWeight:'bold', fontSize:'18px',}}>노출 제한 IP 등록이 완료되었습니다.</span>
                                        </div>
                                        <div style={{padding:'5px', marginBottom:'15px'}}>
                                            <button onClick={() => {close();}} className="tab2PUBtn" style={{marginTop:'15px', color:'white', background:'#41b3f9', marginLeft:'10px'}}>확인</button>
                                        </div>
                                      </div>
                                    </Popup>
                                </div>
                            </div>
                        </div>
                      )}
                    </Popup>
                    <Popup trigger={<button className='default-btn' style={{marginLeft:'10px', marginBottom:'15px',}}>부정클릭 감시 이미지 다운로드</button>} modal>
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
                                  <a href="https://drive.google.com/file/d/1WUskOqIHVJx7Kq-I2KPo2YBJW0c40_t4/view" target="_blank">
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
                                <button className="btn costom-btn">확인</button>
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
          </>
    )
  }
export default CpcClick;
  