import React, { useEffect } from "react"
import axios from 'axios'
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
  import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
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
import { render } from "@testing-library/react";
  const { RangePicker } = DatePicker;
  const { Header, Sider, Content } = Layout;

  

  const CpcClick = () => {
    const tab1Columns = [
      {
          title: '기간내 중복방문 IP',
          dataIndex: 'ip',
          key:'ip',
          align: 'center',
      },
      {
          title: '상세조회',
          dataIndex: 'descInq',
          //key:'descInq',
          render: () => <button className='unbanBtn' style={{background:'#41b3f9'}}>IP 상세조회</button>,
          align: 'center',
      },
      {
          title: '클릭수',
          dataIndex: 'clicks',
          //key:'clicks',
          align: 'center',
      },
      {
          title: '유효한 클릭수',
          dataIndex: 'validClicks',
          //key:'validClicks',
          align: 'center',
      },
      {
          title: '중복된 클릭수',
          dataIndex: 'anomalyClicks',
          //key:'anormalClicks',
          align: 'center',
      },
      {
          title: '광고노출 차단 관리',
          dataIndex: 'isBlocked',
          //key:'isBlocked',
          // 탭1 > 테이블 > '노출제한 설정' 버튼 클릭시 팝업
          render: () => <Popup trigger={<button className='unbanBtn' style={{background:'#41b3f9'}}>노출제한 설정</button>} modal>
                  {close => (
                      <div className="popup1" style={{width:'1000px'}}>
                          <div style={{fontWeight:'bold', borderBottom:'1px solid #aaaaaa'}}>
                              <p style={{marginLeft:'20px', }}>노출 제한 설정</p>
                          </div>
                          <div style={{marginLeft:'20px', marginRight:'20px', marginBottom:'20px'}}>
                              <div className='cpcClickTabBq'>
                                  <div className='cpcClickTabBqTFrame'></div>
                                  <p className='cpcClickTabBqP'>
                                      {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고 노출제한 등록 시 : 네이버 클릭초이스는 약 2분 후에 적용됩니다.(광고매체 사정에 따라 시간차가 있을 수 있습니다.)
                                  </p>
                                  <p className='cpcClickTabBqP'>
                                  {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고노출 제한 IP 등록 가능 수 네이버 클릭초이스 600개를 초과할 경우 광고노출 차단이 동작하지 않습니다.
                                  </p>
                                  <div className='cpcClickTabBqBFrame'></div>
                              </div>
                              <Table
                                  style={{marginTop:'20px'}}
                                  columns={tab4Columns}
                                  dataSource={tab4Data}
                                  bordered
                                  pagination={false}
                              />
                              <div style={{display:'flex', justifyContent: "flex-end", marginTop:'20px'}}>
                                  <button className="searchBtn" onClick={close} style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}}>취소</button>
                                  <button className="searchBtn">확인</button>
                              </div>
                          </div>
                      </div>
                  )}
              </Popup>,
          align: 'center',
      },
    ]
  
    const tab1Columns1 = [
      {
          title:'번호',
          dataIndex: 'num',
          align: 'center',
      },
      {
          title:'클릭 일시',
          dataIndex: 'clkDate',
          align: 'center',
      },
      {
          title:'최초 방문일시',
          dataIndex: 'firVisDate',
          align: 'center',
      },
      {
          title:'방문자 IP',
          dataIndex: 'visIp',
          align: 'center',
      },
      {
          title:'CPC 광고 프로그램',
          dataIndex: 'advPrgm',
          align: 'center',
      },
      {
          title:'CPC 키워드/상품',
          dataIndex: 'prd',
          align: 'center',
      },
      {
          title:'광고매체',
          dataIndex: 'advMed',
          align: 'center',
      },
      {
          title:'검색어',
          dataIndex: 'srchWd',
          align: 'center',
      },
    ]
  
    const tab1Data1 = [
      {
          key: '1',
          num: '1',
          clkDate : '2022-06-02 07:13:25',
          firVisDate: '2022-06-02 07:13:25',
          visIp: '122.99.192.187',
          advPrgm: '	네이버 사이트 검색광고',
          prd: 'DB마케팅 / 네이버 통합검색 광고더보기 57위',
          advMed: 'NAVER(네이버)',
          srchWd: 'db마케팅,'
      },
      {
          key: '2',
          num: '2',
          clkDate : '2022-06-02 07:13:25',
          firVisDate: '2022-06-02 07:13:25',
          visIp: '122.99.192.187',
          advPrgm: '	네이버 사이트 검색광고',
          prd: 'DB마케팅 / 네이버 통합검색 광고더보기 57위',
          advMed: 'NAVER(네이버)',
          srchWd: 'db마케팅,'
      },
    ]
  
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
        dataIndex: 'account_no',
        align: 'center',
        sorter: (a, b) => a.account_no - b.account_no,
      },
      {
        title: '광고 노출제한 IP',
        dataIndex: 'ip',
        align: 'center',
        sorter:(a, b) => a.ip - b.ip,
      },
      {
        title: '설명',
        dataIndex: 'description',
        align: 'center',
        sorter:(a, b) => a.description - b.description,
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
        render: (text, record) => <Popup trigger={<button className='unbanBtn'>선택 차단 해제</button>} modal>
        {close => (
            <div style={{width:'300px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                <div style={{marginTop:'20px'}}>
                    <img src={CircExclm} alt='CircExclm'/>
                </div>
                <div style={{padding:'5px'}}>
                    <span style={{fontWeight:'bold', fontSize:'18px',}}>정말 삭제하시겠습니까?</span>
                </div>
                <div style={{padding:'5px'}}>
                    <span style={{fontSize:'11px'}}>삭제 버튼을 클릭하면 영구적으로 삭제됩니다.</span>
                </div>
                <div style={{padding:'5px', marginBottom:'15px'}}>
                    <button type="link" onClick={() => deleteData(record.id, record.ip)} className="tab2PUBtn" style={{color:'white', background:'#dd6b55', }}>삭제</button>
                    <button onClick={() => {close();}} className="tab2PUBtn" style={{color:'white', background:'#aaaaaa', marginLeft:'10px'}}>취소</button>
                </div>
            </div>
        )}
    </Popup>,
        sorter:(a, b) => a.unban - b.unban,
      },
    ];

    const [data, setData] = useState([]);

    const deleteData = (ip, id) => {
      // const {id, ip} = record;

      fetch(`/ip-filter?id=${id}&ip=${ip}`, {
        method: 'DELETE',
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setData(data.filter(item => item.id !== id || item.ip !== ip));
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
      {
        title: '영역',
        dataIndex: 'imageAlign',
        align: 'center',
      },
      {
        title: '스크립트',
        dataIndex: 'script',
        align: 'center',
        width:'50%',
        render: () => <div style={{height: '40px'}}><input value={anomalyDetectionScriptList[0].script} style={{border: '1px solid #e2e6e8', width:'100%', height:'100%'}} disabled/></div>
      },
    ];
  
    const tab4Columns = [
      {
          title:'광고매체',
          dataIndex:'advMed',
          align:'center',
          width:'20%',
          render: () => <div><input style={{paddingLeft:'10px', border: '1px solid #e2e6e8', height: '40px'}} defaultValue={'네이버 클릭초이스'}>{tab4Data[1]}</input></div>
      },
      {
          title:'광고계정/아이디',
          dataIndex:'advId',
          align:'center',
          width:'20%',
          render: () => <div><input style={{paddingLeft:'10px', border: '1px solid #e2e6e8', height: '40px'}}>{tab4Data[1]}</input></div>
      },
      {
          title:'광고노출 제한 IP',
          dataIndex:'advRstIp',
          align:'center',
          width:'20%',
      },
      {
          title:'설명',
          dataIndex:'desc',
          align:'center',
          width:'20%',
      },
      {
          title:'등록일시',
          dataIndex:'regDate',
          align:'center',
          width:'20%',
      },
    ]
  
    const tab4Data = [
      {
          key:'1',
          advMed: '네이버 클릭초이스',
          advId: 'bizspring',
          advRstIp: '106.249.33.10',
          desc: '부정클릭',
          regDate: '2023-04-27 10:00:00'
      }
    ]
    
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
        textAlign: 'center',
        minHeight:'20px',
        height:'30px',
        justifyContent: 'center',
        display:'flex',
        alignItems:'center'
      }),
      valueContainer: (provided, state) => ({
          ...provided,
          height: '30px',
          padding: '0 6px'
      }),
      indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '30px',
      }),
      input: (provided, state) => ({
          ...provided,
          margin: '0px',
      }),
      indicatorSeparator: state => ({
      display: 'none',
      }),
        
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
  
    const measCat0 = [
      {
        label: '광고계정',
        value: ''
      }
    ]
    
    const measCat1 = [
      {
        label: 'CPC 광고 매체 전체',
        value: ''
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
        value: ''
      },
      {
        label: '레퍼러 있음',
        value: 'Y'
      },
      {
        label: '레퍼러 없음',
        value: 'N'
      },
    ]
    
    const measCat3 = [
      {
        label: '전체 유입횟수',
        value: ''
      },
      {
        label: '전체 유입횟수 5회 이상',
        value: 5
      },
      {
        label: '전체 유입횟수 10회 이상',
        value: 10
      },
      {
        label: '전체 유입횟수 20회 이상',
        value: 20
      },
      {
        label: '전체 유입횟수 30회 이상',
        value: 30
      },
      {
        label: '전체 유입횟수 40회 이상',
        value: 40
      },
      {
        label: '전체 유입횟수 50회 이상',
        value: 50
      },
      {
        label: '전체 유입횟수 60회 이상',
        value: 60
      },
      {
        label: '전체 유입횟수 70회 이상',
        value: 70
      },
      {
        label: '전체 유입횟수 80회 이상',
        value: 80
      },
      {
        label: '전체 유입횟수 90회 이상',
        value: 90
      },
      {
        label: '전체 유입횟수 100회 이상',
        value: 100
      },
    ]
    
    const measCat4 = [
      {
        label: '전체 클릭수',
        value: ''
      },
      {
        label: '전체 클릭수 5회 이상',
        value: 5
      },
      {
        label: '전체 클릭수 10회 이상',
        value: 10
      },
      {
        label: '전체 클릭수 20회 이상',
        value: 20
      },
      {
        label: '전체 클릭수 30회 이상',
        value: 30
      },
      {
        label: '전체 클릭수 40회 이상',
        value: 40
      },
      {
        label: '전체 클릭수 50회 이상',
        value: 50
      },
      {
        label: '전체 클릭수 60회 이상',
        value: 60
      },
      {
        label: '전체 클릭수 70회 이상',
        value: 70
      },
      {
        label: '전체 클릭수 80회 이상',
        value: 80
      },
      {
        label: '전체 클릭수 90회 이상',
        value: 90
      },
      {
        label: '전체 클릭수 100회 이상',
        value: 100
      },
    ]

    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [selectedOption4, setSelectedOption4] = useState(null);
    const [selectedOption5, setSelectedOption5] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);

    const handleRangeChange = (value) => {
      setSelectedRange(value);
      console.log('range change', value);
    };

    const handleSelectChange1 = (value) => {
      setSelectedOption1(value);
      console.log('selected', value);
    };
    const handleSelectChange2 = (value) => {
      setSelectedOption2(value);
      console.log('selected', value);
    };
    const handleSelectChange3 = (value) => {
      setSelectedOption3(value);
      console.log('selected', value);
    };
    const handleSelectChange4 = (value) => {
      setSelectedOption4(value);
      console.log('selected', value);
    };
    const handleSelectChange5 = (value) => {
      setSelectedOption5(value);
      console.log('selected', value);
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
    const [cpcClickIPReportData, setCpcClickIPReportData] = useState([]);
    const [naverBlockedIpList, setNaverBlockedIpList] = useState([]);
    const [anomalyDetectionScriptList, setAnomalyDetectionScriptList] = useState([]);

    const [addBlkdIPData1, setAddBlkdIPData1] = useState('');
    const [addBlkdIpData2, setAddBlkdIPData2] = useState('');
    const handleInputChanged1 = (e) => {
      setAddBlkdIPData1(e.target.value);
    };

    const handleInputChanged2 = (e) => {
      setAddBlkdIPData2(e.target.value);
    };

    const handleAddBlkdIP = () => {
      // POST request to /block-ip to add data
      axios.post('/ip-filter', {data:addBlkdIPData1, addBlkdIpData2})
      .then((response) => {
        console.log('Data added successfully:', response.data);
        // clear input field
        setAddBlkdIPData1('');
        setAddBlkdIPData2('');
      })
      .catch((error) => {
        console.error('Error adding data!!!!!!!!!:', error);
      });
    };

    useEffect(() => {
      fetchADCPCClickIPReport();
      fetchNaverBlockedIpList();
      fetchAnomalyDetectionScriptList();
    }, []);

    const fetchNaverBlockedIpList = async () => {

      const response = await fetch('https://api.logger.co.kr/anomaly-detection/ip-filter?clientSeq=106659')
      .then((response) => response.json());
      
      const dataArray = Array.isArray(response) ? response : [response];

      // setNaverBlockedIpList(dataArray[0].data);
      setNaverBlockedIpList(response.data);
    };

    useEffect(()=>{
      console.log("naverBlockedIpList data :", naverBlockedIpList);
    },[naverBlockedIpList]);

    const fetchADCPCClickIPReport = async () => {

      if(!selectedRange==null){
        const dateBegin = selectedRange[0]?.format('YYYY-MM-DD');
        const dateEnd = selectedRange[1]?.format('YYYY-MM-DD');
      };
      const clientSeq = 106659;
      const hasReferrer = selectedOption3;
      const inflowCount = selectedOption4;
      const clickCount = selectedOption5;
      const media = 'NAVER'
      
      
      // await fetch(`http://api.logger.co.kr/anomaly-detection/cpc-click?clientSeq=${clientSeq}&dateBegin=2023-05-01&dateEnd=2023-06-21&hasReferrer=${hasReferrer}&inflowCount=${inflowCount}&clickCount=${clickCount}&media=${media}`)

      const response = await fetch('http://api.logger.co.kr/anomaly-detection/cpc-click?clientSeq=106659&dateBegin=2023-05-01&dateEnd=2023-06-21&hasReferrer=&inflowCount=5&clickCount=5&media=NAVER')
      .then((response) => response.json());

      const dataArray = Array.isArray(response) ? response : [response];

      setCpcClickIPReportData(dataArray[0].data);
    };

    useEffect(() => {
      console.log('cpcClickIPReportData', cpcClickIPReportData);
    }, [cpcClickIPReportData]);

    const fetchAnomalyDetectionScriptList = async () => {

      const response = await fetch('https://api.logger.co.kr/anomaly-detection/script?clientSeq=106659')
      .then((response) => response.json());

      const dataArray = Array.isArray(response) ? response : [response];

      setAnomalyDetectionScriptList(dataArray[0].data);
    };

    useEffect(() => {
      console.log('anomalyDetectionScriptList', anomalyDetectionScriptList);
    }, [anomalyDetectionScriptList]);

    const [scriptExecuted, setScriptExecuted] = React.useState(false);

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
            {/* <button onClick={handleButtonClick}>track</button> */}
            <h1 style={{fontSize:'large'}}><FontAwesomeIcon icon={faUserSlash} /> CPC 광고 중복 클릭 IP (네이버)</h1>
          </div>
          <div>
            <Tabs defaultActiveKey='1' onChange={callBack}>{typeof window._trk_flashEnvView != 'undefined' && window._trk_flashEnvView("_TRK_PI=TEST")}
            {/* trackerward */}
              <TabPane tab='CPC 광고 중복 클릭 IP' key="1">
                <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30,  display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>기간 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker onChange={handleRangeChange} defaultValue={[dayjs('2023-05-01'), dayjs('2023-06-21')]}/></div>
                  </div>
                  <div style={{marginLeft: 30, marginRight: 30, marginBottom: 30, marginTop: 15, display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>측정항목 <RightCircleFilled/></div>
                    <div style={{marginLeft: 38, display:'flex', width:'80%'}}>
                      <div style={{width:'25%'}}>
                        <Select
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat0[0]}
                        onChange={handleSelectChange1}
                        value={selectedOption1}
                        styles={customSelectStyles}
                        options={measCat0}
                        />
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        // indicatorSeparator = little vertical divider shown in the select box
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat1[0]}
                        onChange={handleSelectChange2}
                        value={selectedOption2}
                        styles={customSelectStyles}
                        options={measCat1}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat2[0]}
                        onChange={handleSelectChange3}
                        value={selectedOption3}
                        styles={customSelectStyles}
                        options={measCat2}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat3[0]}
                        onChange={handleSelectChange4}
                        value={selectedOption4}
                        styles={customSelectStyles}
                        options={measCat3}/>
                      </div>
                      <div style={{width:'25%', marginLeft:20}}>
                        <Select 
                        className="single-select"
                        classNamePrefix="react-select"
                        defaultValue={measCat4[0]}
                        onChange={handleSelectChange5}
                        value={selectedOption5}
                        styles={customSelectStyles}
                        options={measCat4}/>
                      </div>
                      <div style={{width:'200px', marginLeft:20}}>
                        <button className='searchBtn' onClick={fetchADCPCClickIPReport} >확인</button>
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
                    <div>
                        <p>중복 클릭 IP 목록</p>
                        <div style={{display:'flex'}}>
                        <Popup trigger={<button className='searchBtn' style={{marginBottom:'15px', width:'120px', height:'30px', borderRadius:'3px'}}>노출 제한 IP 등록</button>} modal>
                        {close => (
                            <div className="popup1">
                                <div style={{display:'flex', height:'60px'}}>
                                    <div className='popUp1H'>
                                    노출 제한 IP 등록
                                    </div>
                                    <button className='popup1cls' onClick={close}>&times;</button>
                                </div>
                                <div style={{borderTop:'1px solid #edecec'}}>
                                    <div style={{marginLeft:'10px', marginBottom:'10px', marginTop:'-20px', marginRight:'10px',}}>
                                        <div className='cpcClickTabBq'>
                                            <div className='cpcClickTabBqTFrame'></div>
                                            <p className='cpcClickTabBqP'>
                                                {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고 노출제한 등록 시 : 네이버 클릭초이스는 약 2분 후에 적용됩니다.(광고매체 사정에 따라 시간차가 있을 수 있습니다.)
                                            </p>
                                            <p className='cpcClickTabBqP'>
                                                {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고노출 제한 IP 등록 가능 수 네이버 클릭초이스 600개를 초과할 경우 광고노출 차단이 동작하지 않습니다.
                                            </p>
                                            <div className='cpcClickTabBqBFrame'></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{padding:'10px'}}>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="광고 노출제한 IP" span={3}><input placeholder="IP를 입력하세요" style={{width:'100%', height:'40px', border:'1px solid #edecec'}} value={addBlkdIPData1} onChange={handleInputChanged1}></input></Descriptions.Item>
                                        <Descriptions.Item label="광고 노출제한 IP 등록 설명"><input placeholder="설명을 입력하세요" style={{width:'100%', height:'40px', border:'1px solid #edecec'}} value={addBlkdIpData2} onChange={handleInputChanged2}></input></Descriptions.Item>
                                    </Descriptions>
                                </div>
                                <div style={{padding:'10px', borderTop:'1px solid #edecec', display:'flex', justifyContent: "flex-end"}}>
                                    <button className="searchBtn" style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}} onClick={() => {close();}}>취소</button>
                                    
                                    <Popup trigger={<button className="searchBtn">확인</button>}>
                                        {close => (
                                        <div style={{width:'300px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                                            <div style={{marginTop:'20px'}}>
                                                <img src={CircExclm} alt='CircExclm'/>
                                            </div>
                                            <div style={{padding:'5px'}}>
                                                <span style={{fontWeight:'bold', fontSize:'18px',}}>등록하시겠습니까?</span>
                                            </div>
                                            <div style={{padding:'5px', marginBottom:'15px'}}>
                                                <button onClick={handleAddBlkdIP} className="tab2PUBtn" style={{color:'white', background:'#00b82b', }}>등록</button>
                                                <button onClick={() => {close();}} className="tab2PUBtn" style={{color:'white', background:'#aaaaaa', marginLeft:'10px'}}>취소</button>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                </div>
                            </div>
                        )}
                        </Popup>
                            <button className='searchBtn' style={{marginLeft:'10px', border:'1px solid #edecec' ,marginBottom:'15px', width:'120px', height:'30px', borderRadius:'3px', background:'white', color:'black'}}>선택 노출제한</button>
                        </div>
                    </div>
                    <div>
                    {cpcClickIPReportData.length > 0 ? (
                      <Table
                          rowSelection={{
                              type: selectionType,
                              ...rowSelection,
                          }}
                          expandable={{expandedRowRender: record => (
                              <div>
                                 <Table
                                      columns={tab1Columns1}
                                      dataSource={tab1Data1}
                                      bordered
                                  /> 
                              </div>
                          )}}
                          rowKey="ip"
                          columns={tab1Columns}
                          dataSource={cpcClickIPReportData}
                          bordered
                          expandRowByClick
                      />
                    ): (
                      <div>Loading...</div>
                    )
                    }
                    </div>
                </div>
              </TabPane>
              <TabPane tab='네이버 광고노출 차단 이력 및 관리' key="2">
                <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30, marginBottom: 30, display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>필터 항목 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker defaultValue={[dayjs('2015/01/01'), dayjs('2015/01/01')]}/></div>
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
                    <Popup trigger={<button className='unbanBtnGray'>선택 차단 해제</button>} modal>
                        {close => (
                            <div style={{width:'300px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                                <div style={{marginTop:'20px'}}>
                                    <img src={CircExclm} alt='CircExclm'/>
                                </div>
                                <div style={{padding:'5px'}}>
                                    <span style={{fontWeight:'bold', fontSize:'18px',}}>정말 삭제하시겠습니까?</span>
                                </div>
                                <div style={{padding:'5px'}}>
                                    <span style={{fontSize:'11px'}}>삭제 버튼을 클릭하면 영구적으로 삭제됩니다.</span>
                                </div>
                                <div style={{padding:'5px', marginBottom:'15px'}}>
                                    <button className="tab2PUBtn" style={{color:'white', background:'#dd6b55', }}>삭제</button>
                                    <button onClick={() => {close();}} className="tab2PUBtn" style={{color:'white', background:'#aaaaaa', marginLeft:'10px'}}>취소</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <p style={{fontWeight:'bold', fontSize:'13px', marginLeft:'10px'}}>노출제한 관리 목록: 클릭초이스()</p>
                  </div>
                  <Table
                    rowSelection={{
                      type: selectionType,
                      ...rowSelection,
                    }}
                    columns={tab2Columns}
                    dataSource={naverBlockedIpList}
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
                            <div style={{display:'flex', height:'60px', borderBottom:'1px solid #e2e6e8'}}>
                                <div className='popUp1H'>
                                스크립트 설정
                                </div>
                                <button className='popup1cls' onClick={close}>&times;</button>
                            </div>
                            <div style={{}}>
                                <div style={{margin:'10px',}}>
                                    <span style={{fontWeight:'bold',}}>부정클릭 의심 IP 자동 차단 설정</span>
                                    <div className='cpcClickTabBq'>
                                        <div className='cpcClickTabBqTFrame'></div>
                                        <p className='cpcClickTabBqP'>
                                            {'\u25CF'}&nbsp;&nbsp;&nbsp; 아래 설정한 조건에 따라 부정클릭 의심 IP로 판단하여 자동 차단 처리합니다.
                                        </p>
                                        <div className='cpcClickTabBqBFrame'></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{padding:'10px'}}>
                                <Descriptions bordered>
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
                                    <Descriptions.Item label="자동 IP 차단">
                                        <Switch checked={autoIpBanChk} onChange={setAutoIpBanChk} />
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div style={{margin:'10px',}}>
                                <span style={{fontWeight:'bold'}}>부정클릭 의심 IP 자동 차단 설정</span>
                            </div>
                            <div style={{margin:'10px',}}>
                                <Tabs>
                                    <TabPane tab='자동 노출' key='1'>
                                        <div className='cpcClickTabBq' style={{marginTop:'-0px'}}>
                                            <div className='cpcClickTabBqTFrame'></div>
                                            <p className='cpcClickTabBqP'>
                                                {'\u25CF'}&nbsp;&nbsp;&nbsp;  이미지 유형과 노출 위치를 선택해주세요.
                                            </p>
                                            <div className='cpcClickTabBqBFrame'></div>
                                        </div>
                                        <div>
                                            <p style={{fontWeight:'bold', fontSize:'13px'}}>노출 이미지를 선택하세요.</p>
                                        </div>
                                        <ul style={{listStyleType:'none', display:'flex', flexDirection:'row', marginLeft:'-30px'}}>
                                            <li>
                                                <label>
                                                    <img className="logoExpImg" style={{width:'100px', marginRight:'10px'}} src={LoggerTAL} alt="LoggerTAL"></img>
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <img className="logoExpImg" style={{width:'100px', marginRight:'10px'}} src={LoggerTAC} alt="LoggerTAC"></img>
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <img className="logoExpImg" style={{width:'100px', marginRight:'10px'}} src={LoggerTAR} alt="LoggerTAR"></img>
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <img className="logoExpImg" style={{width:'200px', marginRight:'10px'}} src={LoggerWTAL} alt="LoggerTAR"></img>
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <img className="logoExpImg" style={{width:'200px'}} src={LoggerWTAR} alt="LoggerWTAR"></img>
                                                </label>
                                            </li>
                                        </ul>
                                        <div>
                                            <span style={{fontWeight:'bold', fontSize:'13px'}}>PC에서 노출 위치를 선택하세요</span><br />
                                            <select style={{width:'400px', height:'30px', border:'1px solid #e2e6e8', marginBottom:'30px'}}>
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
                                    </TabPane>
                                    <TabPane tab='직접 노출(수동)' key='2'>
                                        <div className='cpcClickTabBq' style={{marginTop:'-0px'}}>
                                            <div className='cpcClickTabBqTFrame'></div>
                                            <p className='cpcClickTabBqP'>
                                                {'\u25CF'}&nbsp;&nbsp;&nbsp; 홈페이지에 노출할 이미지를 아래에서 직접 다운로드하여 사용하세요.
                                            </p>
                                            <p className='cpcClickTabBqP'>
                                                {'\u25CF'}&nbsp;&nbsp;&nbsp; 이미지 활용은 권장 가이드를 확인해주세요.
                                            </p>
                                            <div className='cpcClickTabBqBFrame'></div>
                                        </div>
                                        <div style={{display:'flex', marginTop:'10px'}}>
                                            <span style={{fontWeight:'bold', fontSize:'13px', marginRight:'10px'}}>이미지 다운로드</span>
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
                                    </TabPane>
                                </Tabs>
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
  