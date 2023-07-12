import React, { useEffect } from "react"
// import axios from 'axios'
  import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Descriptions, Switch, Image } from 'antd';
  import { useState } from 'react';
  import CircExclm from '../img/circleExclm.png'
  import './cpc_click.css'
  import Popup from 'reactjs-popup'
  import {NAVER_BLOCKED_IP_LIST} from './cpc_click_api';

const CpcClickTab2 = () => {
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
    const [data, setData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [naverBlockedIpList, setNaverBlockedIpList] = useState([]);
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
        dataIndex: 'account_no',
        align: 'center',
        // sorter: (a, b) => a.account_no.localeCompare(b.account_no),
        },
        {
        title: '광고 노출제한 IP',
        dataIndex: 'ip',
        align: 'center',
        sorter:(a, b) => a.ip.localeCompare(b.ip),
        },
        {
        title: '설명',
        dataIndex: 'description',
        align: 'center',
        sorter:(a, b) => a.description.localeCompare(b.description),
        },
        {
        title: '등록일시',
        dataIndex: 'regDate',
        align: 'center',
        sorter:(a, b) => a.regDate.localeCompare(b.regDate),
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
                    <button type="link" onClick={() => deleteData(record.clientSeq, record.ip)} className="tab2PUBtn" style={{color:'white', background:'#dd6b55', }}>삭제</button>
                    <button onClick={() => {close();}} className="tab2PUBtn" style={{color:'white', background:'#aaaaaa', marginLeft:'10px'}}>취소</button>
                </div>
            </div>
        )}
        </Popup>,
        sorter:(a, b) => a.unban - b.unban,
        },
        ];

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
        </div>
    )
}
export default CpcClickTab2;
