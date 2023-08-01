import React, { useEffect } from "react"
// import axios from 'axios'
  import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Descriptions, Switch, Image } from 'antd';
  import { useState } from 'react';
  import { writeFile, utils } from 'xlsx';
  import * as XLSX from 'xlsx';
  import CircExclm from '../img/circleExclm.png'
  import './cpc_click.css'
  import Popup from 'reactjs-popup'
  import {NAVER_BLOCKED_IP_LIST, CPC_CLICK_DETAIL_REPORT} from './cpc_click_api';
  import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';

const CpcClickTab2 = () => {
    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: (record) => ({
    //       disabled: record.name === 'Disabled User',
    //       // Column configuration not to be checked
    //       name: record.name,
    //     }),
    //   };
    const [data, setData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [naverBlockedIpList, setNaverBlockedIpList] = useState([]);
    const [filteredData, setFilteredData] = useState(naverBlockedIpList);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    
    const rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
        disabled: record.disabled, // Add a 'disabled' property to each record if needed
        }),
    };
    const handleKeyPress1 = (event) => {
        if (event.key === 'Enter') {
            console.log('search init');
            fetchDataAndSearch(event.target.value);
        }
    };

    const handleKeyPress = async (event) => {
        await fetchNaverBlockedIpList();
        handleKeyPress1(event);
    }

    const handleSearch = (searchQuery) => {
        const filteredData = naverBlockedIpList.filter((item) => {
            return (
                item.advIdx && item.advIdx.toLowerCase().includes(searchQuery.toLowerCase()) || 
                String(item.account_no).includes(searchQuery.toLowerCase()) || 
                item.ip && item.ip.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.regDate && item.regDate.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        setNaverBlockedIpList(filteredData);
        console.log('search Param set', naverBlockedIpList);
    };

    const fetchDataAndSearch = async (searchQuery) => {
        
        // await fetchNaverBlockedIpList();
        handleSearch(searchQuery);
    };

    const handleDownloadExcel = () => {
        // Get the table data source
        const dataSource = naverBlockedIpList;
    
        // Convert column headers to an array of strings
        const headerRow = tab2Columns.map((column) => column.title);
    
        // Convert the table data to an array of arrays
        const dataRows = dataSource.map((record) => tab2Columns.map((column) => record[column.dataIndex]));
    
        // Combine header row with data rows
        const excelData = [headerRow, ...dataRows];
    
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        const sheetName = 'Sheet1';
    
        // Convert the array of arrays (excelData) to a worksheet using 'XLSX.utils.aoa_to_sheet'
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
        // Generate the XLSX file and download it
        XLSX.writeFile(workbook, '네이버_광고노출_차단_이력_및_관리.xlsx');
    };

    const [cpcClickIPDetailReport, setCpcClickIPDetailReport] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const prevMonth = String(current.getMonth() ).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const date2 = `${year}-${prevMonth}-${day}`;
    const handleDownloadCSVBtn = (rowData) => {
        console.log('prep param', rowData);
        const selectedValue = rowData.ip;
        fetchCpcClickIPDetailReport(selectedValue);
        const dataForExcel = cpcClickIPDetailReport.map((item) => ({
            ClickTime: item.clickTime,
            VisitTime: item.visitTime,
            IP: item.ip,
            AdKeyWork: item.adKeyword,
            CPCOption: item.cpcOption,
            SearchEngine: item.searchEngine,
            SearchKeyword: item.searchKeyword
        }));
    }
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
        const clientSeq = 106659;
        const ip = param;
        const media = 'NAVER';
        const response = await fetch(`${CPC_CLICK_DETAIL_REPORT}?clientSeq=${clientSeq}&ip=${ip}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&media=${media}`)
        .then((response) => response.json());
  
        const dataArray = Array.isArray(response) ? response : [response];
  
        setCpcClickIPDetailReport(response.data);
      }

    const tab2Columns = [
        {
        title: '광고 매체',
        dataIndex: 'advIdx',
        align: 'center',
        render:() => <div><span>네이버</span></div>,
        // sorter: (a, b) => a.advIdx.localeCompare(b.advIdx),
        },
        {
        title: '광고계정 / 아이디',
        dataIndex: 'fid',
        align: 'center',
        // sorter: (a, b) => a.account_no.localeCompare(b.account_no),
        },
        {
        title: '광고 노출제한 IP',
        dataIndex: 'ip',
        align: 'center',
        sorter:(a, b) => {
            if (a.ip === null && b.ip === null) return 0;
            if (a.ip === null) return -1;
            if (b.ip === null) return 1;
            a.ip.localeCompare(b.ip);}
        },
        {
        title: '설명',
        dataIndex: 'description',
        align: 'center',
        sorter:(a, b) => {
            if (a.description === null && b.description === null) return 0;
            if (a.description === null) return -1;
            if (b.description === null) return 1;
            a.description.localeCompare(b.description);}
        },
        {
        title: '등록일시',
        dataIndex: 'regDate',
        align: 'center',
        sorter:(a, b) => {
            if (a.regDate === null && b.regDate === null) return 0;
            if (a.regDate === null) return -1;
            if (b.regDate === null) return 1;
            a.regDate.localeCompare(b.regDate);}
        },
        {
        title: '네이버 CSV',
        align: 'center',
        render: (text, record) => 
        <button onClick={() => handleDownloadCSVBtn(record)} className='default-btn'>다운로드</button>
        },
        {
        title: '차단관리',
        dataIndex: 'unban',
        align: 'center',
        render: (text, record) => 
        <button onClick={() => deleteData(record.clientSeq, record.fid)} className='unban-btn'>차단 해제</button>
        ,
        sorter:(a, b) => a.unban - b.unban,
        },
        ];

        const deleteData1 = (clientSeq, fid) => {
            // const {id, ip} = record;
            clientSeq = 106659;
            console.log('delete param!!!!!!!!', fid);
          
            fetch(`http://api.logger.co.kr/anomaly-detection/ip-filter?clientSeq=${clientSeq}&fid=${fid}`, {
              method: 'DELETE',
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                setShowSuccessPopup(true);
                // setNaverBlockedIpList((prevData) => prevData.filter((item) => item.fid !== fid));
                // fetchNaverBlockedIpList();
            })
            .catch((error) => {
            console.error('ERROR!!!!!!!!:', error);
            alert('삭제 실패', error);
            });
        };

        const deleteData = (clientSeq, fid) => {
            clientSeq = 106659;
            fetch(`http://api.logger.co.kr/anomaly-detection/ip-filter?clientSeq=${clientSeq}&fid=${fid}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    setShowSuccessPopup(true);
                    fetchNaverBlockedIpList();
                    return response.json();
                } else {
                    throw new Error('ErroR');
                }
            })
            .catch((error) => {
                console.error('ERROR');
            });
        };

        const deleteSelectedData = (clientSeq, fids) => {
            clientSeq = 106659;
            console.log('delete param!!!!!!!!', fids);
        
            Promise.all(
                fids.map((fid) =>
                    fetch(
                    `http://api.logger.co.kr/anomaly-detection/ip-filter?clientSeq=${clientSeq}&fid=${fid}`,
                    {
                        method: 'DELETE',
                    }
                    ).then((response) => {
                        response.json();
                    })
                )
            )
            .then((responsesData) => {
                console.log(responsesData);
                // setNaverBlockedIpList((prevData) =>
                //     prevData.filter((item) => !fids.includes(item.fid))
                // ); // Update the data using setNaverBlockedIpList
                fetchNaverBlockedIpList();
                setShowSuccessPopup(true);
            })
            .catch((error) => {
                console.error('ERROR!!!!!!!!:', error);
                alert('삭제 실패', error);
            });
        };

        useEffect(() => {
            fetchNaverBlockedIpList();
          }, []);

        const fetchNaverBlockedIpList = async () => {

        const response = await fetch(`${NAVER_BLOCKED_IP_LIST}?clientSeq=106659`)
        .then((response) => response.json());
        
        const dataArray = Array.isArray(response) ? response : [response];
    
        // setNaverBlockedIpList(dataArray[0].data);
        setNaverBlockedIpList(response.data);
        };

        useEffect(()=>{
            console.log("naverBlockedIpList data :", naverBlockedIpList);
          },[naverBlockedIpList]);

    return (
        <div>
            <div className='cpcClickTabBq'>
            <div className='cpcClickTabBqTFrame'></div>
            <p className='cpcClickTabBqP'>
                {'\u25CF'}&nbsp;&nbsp;&nbsp; 차단 IP 해제 시 : 네이버 클릭초이스는 약 2분 후에 적용됩니다. (광고매체 사정에 따라 시간차가 있을 수 있습니다.)
            </p>
            <div className='cpcClickTabBqBFrame'></div>
            </div>
            <div className='tabTableDiv'>
            <div>
            <p style={{fontSize:'16px', fontWeight:600}}>IP 차단 이력 및 관리</p>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'-7px'}}>
                <div style={{display:'flex'}}>
                    <button onClick={() => {deleteSelectedData(106659, selectedRows);}} className='default-btn'>선택 차단 해제</button>
                    {/* <Popup trigger={<button className='unbanBtnGray'>선택 차단 해제</button>} modal>
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
                                    <button onClick={() => {deleteSelectedData(106659, selectedRows);}} className="tab2PUBtn" style={{color:'white', background:'#dd6b55', }}>삭제</button>
                                    <button onClick={() => {close();}} className="tab2PUBtn" style={{color:'white', background:'#aaaaaa', marginLeft:'10px'}}>취소</button>
                                </div>
                            </div>
                        )}
                    </Popup> */}
                    <p style={{fontWeight:'bold', fontSize:'13px', marginLeft:'10px'}}>노출제한 관리 목록: 클릭초이스({naverBlockedIpList.length})</p>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <input type="text" placeholder="Search" onKeyUp={handleKeyPress}/>
                    <Button style={{ marginLeft: '10px' }} onClick={handleDownloadExcel}>Excel</Button>
                </div>
            </div>
            <Table
            // rowSelection={{
            //     type: selectionType,
            //     ...rowSelection,
            // }}
            columns={tab2Columns}
            dataSource={naverBlockedIpList}
            bordered
            rowSelection={rowSelection}
            rowKey="fid"
            />
            </div>
            <Popup open={showSuccessPopup}>
                <div style={{width:'350px', height:'220px', border:'1px solid #e2e6e8', textAlign:'center', background:'white', borderRadius:'3px'}}>
                    <div style={{marginTop:'30px'}}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'50px'}} />
                    </div>
                    <div style={{marginTop:'25px', padding:'5px'}}>
                        <span style={{fontWeight:'bold', fontSize:'18px',}}>노출 제한 IP 해제가 완료되었습니다.</span>
                    </div>
                    <div style={{padding:'5px', marginBottom:'15px'}}>
                        <button onClick={() => {setShowSuccessPopup(false)}} className="tab2PUBtn" style={{marginTop:'15px', color:'white', background:'#41b3f9', marginLeft:'10px'}}>확인</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
export default CpcClickTab2;
