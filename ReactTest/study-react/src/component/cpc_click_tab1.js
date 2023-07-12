import React, { useEffect } from "react"
// import axios from 'axios'
import {
    RightCircleFilled
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Descriptions, Switch, Image } from 'antd';
  import { useState } from 'react';
  import Select from 'react-select'
  import { DatePicker, Space } from 'antd';
  import './cpc_click.css'
  import Popup from 'reactjs-popup'
  import moment from 'moment';
  import {CPC_CLICK_DETAIL_REPORT} from './cpc_click_api.js';
  import {CPC_CLICK_IP_REPORT} from './cpc_click_api';
const { RangePicker } = DatePicker;

const CpcClickTab1 = () => {
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

      const [selectionType, setSelectionType] = useState('checkbox');
      const [cpcClickIPReportData, setCpcClickIPReportData] = useState([]);
      const [selectedOption1, setSelectedOption1] = useState(measCat0[0]);
      const [selectedOption2, setSelectedOption2] = useState(measCat1[0]);
      const [selectedOption3, setSelectedOption3] = useState(measCat2[0]);
      const [selectedOption4, setSelectedOption4] = useState(measCat3[0]);
      const [selectedOption5, setSelectedOption5] = useState(measCat4[0]);
      const [selectedRange, setSelectedRange] = useState(null);
      const current = new Date();
      const year = current.getFullYear();
      const month = String(current.getMonth() + 1).padStart(2, '0');
      const prevMonth = String(current.getMonth() ).padStart(2, '0');
      const day = String(current.getDate()).padStart(2, '0');
      const date = `${year}-${month}-${day}`;
      const date2 = `${year}-${prevMonth}-${day}`;
      useEffect(() => {
        const monthBefore = moment().subtract(1, 'month');
        const today = moment();
  
        setSelectedRange([monthBefore, today])
      }, []);
  
      const handleRangeChange = (dates) => {
        setSelectedRange(dates);
        console.log('range change', dates);
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
      useEffect(() => {
        const monthBefore = moment().subtract(1, 'month');
        const today = moment();
  
        setSelectedRange([monthBefore, today])
      }, []);
      // const rangePickerDefault = [monthBefore, today];
    useEffect(() => {
        fetchADCPCClickIPReport();
      }, []);
    const [cpcClickIPDetailReport, setCpcClickIPDetailReport] = useState([]);
    const [addBlkdIPData1, setAddBlkdIPData1] = useState('');
    const [addBlkdIpData2, setAddBlkdIPData2] = useState('');
    const handleInputChanged1 = (e) => {
      setAddBlkdIPData1(e.target.value);
      console.log('add parameter 1', e.target.value);
    };

    const handleInputChanged2 = (e) => {
      setAddBlkdIPData2(e.target.value);
      console.log('add parameter 2', e.target.value);
    };
    const handleAddBlkdIP = () => {

        // const clientSeq = 106659;
        // const ip = addBlkdIPData1;
        // const memo = addBlkdIpData2;

        // POST request to /ip-filter to add data
        // axios.post('http://api.logger.co.kr/anomaly-detection/ip-filter', {clientSeq, ip, memo})
        // .then((response) => {
        //   console.log('Data added successfully:', response.data);
        //   // clear input field
        //   setAddBlkdIPData1('');
        //   setAddBlkdIPData2('');
        // })
        // .catch((error) => {
        //   console.error('Error adding data!!!!!!!!!:', error);
        // });

        const column_vals = [{"clientSeq": 106659, "ip":addBlkdIPData1, "memo":addBlkdIpData2}];
        // const keyValuePairs = column_vals.map(cv => [cv.clientSeq,cv.ip,cv.memo]);
        // const keyValuePairs = column_vals.map(cv => Object.fromEntries(Object.entries(cv)));
        // const keyValuePairs = column_vals.map(cv => Object.entries(cv));
        // const payload = {
        //     data: keyValuePairs
        // };
        // console.log(keyValuePairs);

        const payload = `{"clientSeq":${column_vals[0].clientSeq},"ip":"${column_vals[0].ip}","memo":"${column_vals[0].memo}"}`;
        // const payload = `\'{"clientSeq":${column_vals[0].clientSeq},"ip":"${column_vals[0].ip}","memo":"${column_vals[0].memo}"}\'`;

        // const payload = JSON.stringify(column_vals[0]);

        fetch('http://api.logger.co.kr/anomaly-detection/ip-filter', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        //   body: JSON.stringify({clientSeq, ip, memo}),
            // body: JSON.stringify(column_vals),
            body: payload
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error adding data');
          }
        })
        .then((responseData) => {
          console.log('Data added successfully:', responseData);
          setAddBlkdIPData1('');
          setAddBlkdIPData2('');
        })
        .catch((error) => {
          console.error('ERROR ADDING DATA', error);
        });
      };
    const fetchCpcClickIPDetailReport = async (param) => {

        let dateBegin;
        let dateEnd;
        if( selectedRange == null ) {
          dateBegin = date2;
          dateEnd =  date;
        } else if(selectedRange != null) {
          dateBegin = selectedRange[0]?.format('YYYY-MM-DD');
          dateEnd = selectedRange[1]?.format('YYYY-MM-DD');
        }
        const hasReferrer = selectedOption3.value;
        const clientSeq = 106659;
        const ip = param;
        const media = 'NAVER';
        const response = await fetch(`${CPC_CLICK_DETAIL_REPORT}?clientSeq=${clientSeq}&ip=${ip}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&hasReferrer=${hasReferrer}&media=${media}`)
        .then((response) => response.json());
  
        const dataArray = Array.isArray(response) ? response : [response];
  
        setCpcClickIPDetailReport(response.data);
      }
      useEffect(()=>{
        console.log('detailReport:', cpcClickIPDetailReport);
      }, [cpcClickIPDetailReport]);
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
        const renderButtonColumn = (rowData) => {
      
            // const addBtn = cpcClickIPReportData.some((cpcData) => !naverBlockedIpList.some((naverData) => naverData.ip === cpcData.ip));
            // const disableBtn = cpcClickIPReportData.some((cpcData) => naverBlockedIpList.some((naverData) => naverData.ip === cpcData.ip));
            // const matchingIP = cpcClickIPReportData.some((cpcData) => naverBlockedIpList.some((naverData) => naverData.ip === cpcData.ip));
            const matchIP = '';
      
        return (
            <div>
                {!matchIP && <Popup trigger={<button className='unbanBtn' style={{background:'#41b3f9'}}>노출제한 설정</button>} modal>
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
                </Popup>}
                {matchIP && <button disabled className='unbanBtn' style={{background:'gray'}}>노출제한 완료</button>}
            </div>
            // <div>
            //   {!matchIP && <button>add</button>}
            //   {matchIP && <button>dis</button>}
            // </div>
        );
        };
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
            // render: () => <Popup trigger={<button className='unbanBtn' style={{background:'#41b3f9'}}>노출제한 설정</button>} modal>
            //         {close => (
            //             <div className="popup1" style={{width:'1000px'}}>
            //                 <div style={{fontWeight:'bold', borderBottom:'1px solid #aaaaaa'}}>
            //                     <p style={{marginLeft:'20px', }}>노출 제한 설정</p>
            //                 </div>
            //                 <div style={{marginLeft:'20px', marginRight:'20px', marginBottom:'20px'}}>
            //                     <div className='cpcClickTabBq'>
            //                         <div className='cpcClickTabBqTFrame'></div>
            //                         <p className='cpcClickTabBqP'>
            //                             {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고 노출제한 등록 시 : 네이버 클릭초이스는 약 2분 후에 적용됩니다.(광고매체 사정에 따라 시간차가 있을 수 있습니다.)
            //                         </p>
            //                         <p className='cpcClickTabBqP'>
            //                         {'\u25CF'}&nbsp;&nbsp;&nbsp; 광고노출 제한 IP 등록 가능 수 네이버 클릭초이스 600개를 초과할 경우 광고노출 차단이 동작하지 않습니다.
            //                         </p>
            //                         <div className='cpcClickTabBqBFrame'></div>
            //                     </div>
            //                     <Table
            //                         style={{marginTop:'20px'}}
            //                         columns={tab4Columns}
            //                         dataSource={tab4Data}
            //                         bordered
            //                         pagination={false}
            //                     />
            //                     <div style={{display:'flex', justifyContent: "flex-end", marginTop:'20px'}}>
            //                         <button className="searchBtn" onClick={close} style={{color:'black', background:'white', border:'1px solid #edecec', borderRadius:'3px', marginRight:'10px'}}>취소</button>
            //                         <button className="searchBtn">확인</button>
            //                     </div>
            //                 </div>
            //             </div>
            //         )}
            //     </Popup>,
            render: renderButtonColumn,
            align: 'center',
        },
    ]
    const tab1Columns1 = [
        {
            title:'번호',
            dataIndex: 'num',
            align: 'center',
            render: (text, record, index) => index + 1,
        },
        {
            title:'클릭 일시',
            dataIndex: 'clickTime',
            align: 'center',
        },
        {
            title:'최초 방문일시',
            dataIndex: 'visitTime',
            align: 'center',
        },
        {
            title:'방문자 IP',
            dataIndex: 'ip',
            align: 'center',
        },
        {
            title:'CPC 광고 프로그램',
            dataIndex: 'adKeyword',
            align: 'center',
        },
        {
            title:'CPC 키워드/상품',
            dataIndex: 'cpcOption',
            align: 'center',
        },
        {
            title:'광고매체',
            dataIndex: 'searchEngine',
            align: 'center',
        },
        {
            title:'검색어',
            dataIndex: 'searchKeyword',
            align: 'center',
        },
    ]
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
    const handleNavIPAddOnExpand = (expanded, rowData) => {
        if (expanded){
          console.log('expand param', rowData);
          const selectedValue = rowData.ip;
          fetchCpcClickIPDetailReport(selectedValue);
        }
      };
      const fetchADCPCClickIPReport = async () => {

        let dateBegin;
        let dateEnd;
  
        //`${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`
  
        if( selectedRange == null ) {
          dateBegin = date2;
          dateEnd =  date;
        } else if(selectedRange != null) {
          dateBegin = selectedRange[0]?.format('YYYY-MM-DD');
          dateEnd = selectedRange[1]?.format('YYYY-MM-DD');
        }
        
        const clientSeq = 106659;
        const hasReferrer = selectedOption3.value;
        const inflowCount = selectedOption4.value;
        const clickCount = selectedOption5.value;
        const media = 'NAVER'
        console.log('inflow', selectedOption4.value);
        console.log('clickCount', selectedOption5.value);
        console.log('hasReferrer', selectedOption3.value);
        
        
        // await fetch(`https://api.logger.co.kr/anomaly-detection/cpc-click?clientSeq=${clientSeq}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&hasReferrer=${hasReferrer}&inflowCount=${inflowCount}&clickCount=${clickCount}&media=${media}`)
        // await fetch('https://api.logger.co.kr/anomaly-detection/cpc-click?clientSeq=106659&dateBegin=2023-05-01&dateEnd=2023-06-21&hasReferrer=&inflowCount=5&clickCount=5&media=NAVER')
  
        const response = await fetch(`${CPC_CLICK_IP_REPORT}?clientSeq=${clientSeq}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&hasReferrer=${hasReferrer}&inflowCount=${inflowCount}&clickCount=${clickCount}&media=${media}`)
        .then((response) => response.json());
  
        const dataArray = Array.isArray(response) ? response : [response];
  
        setCpcClickIPReportData(dataArray[0].data);
      };

      useEffect(()=>{
        console.log('CpcClickIPReportData:', cpcClickIPReportData);
      }, [cpcClickIPReportData]);

      

    return (
        <div>
            <div style={{border: '1px solid black', borderColor:'#e2e6e8'}}>
                  <div style={{marginLeft: 30, marginTop: 30, marginRight:30,  display:'flex', fontSize:'medium'}}>
                    <div className='searchCatFont'>기간 <RightCircleFilled /></div>
                    <div style={{marginLeft: 70}}><RangePicker onChange={handleRangeChange}/></div>
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
                                    <button className="searchBtn" onClick={handleAddBlkdIP} >확인</button>
                                    
                                    {/* <Popup trigger={<button className="searchBtn">확인</button>}>
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
                                    </Popup> */}
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
                                      dataSource={cpcClickIPDetailReport}
                                      bordered
                                  /> 
                              </div>
                          ),
                          onExpand: handleNavIPAddOnExpand,
                          }}
                          rowKey="ip"
                          columns={tab1Columns}
                          dataSource={cpcClickIPReportData}
                          bordered
                          expandRowByClick
                      />
                    ): (
                      <div style={{width:'100%', height:'100%', display:'flex', textAlign:'center', justifyContent:'center',alignItems:'center'}}>데이터가 없습니다.</div>
                    )
                    }
                    </div>
                </div>
        </div>
    )
};
export default CpcClickTab1;