import React, { useEffect, useRef, useState } from "react"
import { StarFilled } from '@ant-design/icons';
import './trk_viral_css.css'
import { DatePicker, Popover, Tabs, Table } from 'antd';
import moment from "moment";
import TabPane from "antd/es/tabs/TabPane";
import TipsExc from '../img/trk_viral/icon_sinfo.gif';
import Btn1 from '../img/trk_viral/btn_01.png';
import Btn2 from '../img/trk_viral/btn_02.png';
import BtnFilterOff from '../img/trk_viral/btn_filterOff.gif';
import BtnFilterOn from '../img/trk_viral/btn_filterOn.gif';
import IconEqual from '../img/trk_viral/icon_=.png';
import IconVs from '../img/trk_viral/icon_vs.png';
import IconDesktop from '../img/trk_viral/icon_desktop.png';
import IconMobile from '../img/trk_viral/icon_mobile.png';
import { Link } from 'react-router-dom';

const FlashSummaryV = () => {

    const favPopover = (
        <div>
            클릭하시면 즐겨찾기에 등록됩니다
        </div>
    );

    const [filterStatus, setFilterStatus] = useState('N');
    
    const changeFilterStatus = (stat) => {
        if (stat === 'Y'){
            setFilterStatus('Y');
            console.log(filterStatus);
        } else {
            setFilterStatus('N');
            console.log(filterStatus);
        }
    }

    const boardContentList = [
        {
            title:'이메일 오픈율로 알아보는 포탈 이메일 서비스의 영양가.',
            group:'비즈메일러',
            writer:'김주형',
            PCExpo:5,
            MPExpo:1,
            comments:0,
            react:0,
        },
        {
            title:'시간은 금이다! – 체류시간에 관한 이야기',
            group:'로거',
            writer:'김주형',
            PCExpo:1,
            MPExpo:0,
            comments:0,
            react:0,
        },
    ]
    const totalPCExpo = boardContentList.reduce((total, item) => total + item.PCExpo, 0);
    const totalMPExpo = boardContentList.reduce((total, item) => total + item.MPExpo, 0);
    const totalColExpo = totalPCExpo + totalMPExpo;
    const desktopPerc = (totalPCExpo / totalColExpo * 100).toFixed(0);
    const mobilePerc = (totalMPExpo / totalColExpo * 100).toFixed(0);
    // const totalRowExpo = boardContentList.reduce((total, item) => total + item.PCExpo + item.MPExpo, 0);

    const boardColumns = [
        {
            title: '순위',
            dataIndex: 'rank',
            align:'center',
            className:'flashSummaryTable',
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: '게시물 그룹',
            dataIndex: 'group',
            align:'center',
            className:'flashSummaryTable',
        },
        {
            title: '게시물명',
            dataIndex: 'title',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.title-b.title,
        },
        {
            title: '작성자',
            dataIndex: 'writer',
            align:'center',
            className:'flashSummaryTable',
        },
        {
            title: 'Destop 노출',
            dataIndex: 'PCExpo',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.PCExpo-b.PCExpo,
        },
        {
            title: 'Mobile 노출',
            dataIndex: 'MPExpo',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.MPExpo-b.MPExpo,
        },
        {
            title: '총노출',
            dataIndex: '',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.MPExpo-b.MPExpo,
            render: (_, item) => {
                const totalExpo = item.PCExpo + item.MPExpo;
                return <div>{totalExpo}</div>;
            },
        },
        {
            title: '댓글',
            dataIndex: 'comments',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.MPExpo-b.MPExpo,
        },
        {
            title: '공감',
            dataIndex: 'react',
            align:'center',
            className:'flashSummaryTable',
            sorter: (a, b) => a.MPExpo-b.MPExpo,
        },
    ]

    return(
        <div>
            <div style={{width:'100%', minHeight:'70px', borderBottom:'1px solid #e5e5e5'}}>
                <div style={{padding:'10px'}}>
                    <div style={{fontSize:'20px', display:'flex'}}>
                        <Popover placement="bottom" content={favPopover} style={{backgroundColor:'gray'}}>
                            <StarFilled className="favIcon"/>
                        </Popover>
                        <div style={{marginLeft:'10px', marginTop:'-3px'}}>
                            게시물별 노출
                        </div>
                        {/* <Link to="/trk_flash_post">LOGGER</Link> */}
                    </div>
                    <div style={{fontSize:'12px', marginTop:'10px', marginBottom:'10px', display:'flex', justifyContent: 'space-between' }}>
                        <div>
                            게재한 컨텐츠별 노출수(PC, 모바일)를 분석한 리포트로 인기있는 게시물을 알 수 있습니다.
                        </div>
                        <div>
                            <DatePicker/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{display:'flex', marginTop:'20px'}}>
                    {filterStatus === 'N'? (
                        <img className="filterBtn" src={BtnFilterOff} onClick={() => changeFilterStatus('Y')} />
                    ) : (
                        <img className="filterBtn" src={BtnFilterOn} onClick={() => changeFilterStatus('N')} />
                    )}
                    <div>
                        [게시물 그룹] 전체,
                    </div>
                </div>
                <div style={{display:'flex', width:'100%', background:'#f5f5f5', height:'90px', marginTop:'10px'}}>
                    <div style={{width:'33%', borderBottom:'1px solid', borderRight:'1px solid', display:'flex', display:'flex', textAlign:'center', justifyContent:'center'}}>
                        <div style={{display:'flex', textAlign:'center', justifyContent:'center', flexDirection: 'column'}}>
                            <img style={{ width: '73px', height: '58px', marginRight:'5px'  }} src={IconDesktop} />
                        </div>
                        <div style={{display:'flex', textAlign:'center', justifyContent:'center', flexDirection: 'column'}}>
                            <div style={{fontSize:'11px'}}>
                                Desktop 노출
                            </div>
                            <div style={{fontSize:'30px', fontWeight:'bolder', marginTop:'-10px', marginBottom:'-10px'}}>
                                {totalPCExpo}
                            </div>
                            <div>
                                ( {desktopPerc} %)
                            </div>
                        </div>
                    </div>
                    <img
                        src={IconVs}
                        alt="Image"
                        style={{ width: '40px', height: '40px', position: 'absolute', top: '282px', left: '42.2%', transform: 'translateX(-50%)' }}
                    />
                    <div style={{width:'33%', borderBottom:'1px solid', display:'flex', textAlign:'center', justifyContent:'center'}}>
                        <div style={{display:'flex', textAlign:'center', justifyContent:'center', flexDirection: 'column'}}>
                            <img style={{ width: '73px', height: '58px', marginRight:'5px' }} src={IconMobile} />
                        </div>
                        <div style={{display:'flex', textAlign:'center', justifyContent:'center', flexDirection: 'column'}}>
                            <div style={{fontSize:'11px'}}>
                                Mobile 노출
                            </div>
                            <div style={{fontSize:'30px', fontWeight:'bolder', marginTop:'-10px', marginBottom:'-10px'}}>
                                {totalMPExpo}
                            </div>
                            <div>
                                ( {mobilePerc} %)
                            </div>
                        </div>
                    </div>
                    <img
                        src={IconEqual}
                        alt="Image"
                        style={{ width: '40px', height: '40px', position: 'absolute', top: '282px', left: '69.4%', transform: 'translateX(-50%)' }}
                    />
                    <div style={{width:'34%', border:'1px solid', display:'flex', textAlign:'center', justifyContent:'center', flexDirection: 'column'}}>
                        <div style={{fontSize:'11px'}}>총 노출</div>
                        <div style={{fontSize:'30px', fontWeight:'bolder', marginTop:'-10px', marginBottom:'-10px'}}>{totalColExpo}</div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom:'10px', marginTop:'10px'}}>
                    <input style={{marginRight:'5px'}}></input>
                    <button style={{marginRight:'15px'}}>검색</button>
                    <select>
                        <option>20개씩 보기</option>
                        <option>50개씩 보기</option>
                    </select>
                </div>
                <Table
                    columns={boardColumns}
                    dataSource={boardContentList}
                    bordered
                  />
            </div>
            <div>
            <div style={{width:'100%', minHeight:'70px', marginTop:'20px'}}>
                <div style={{padding:'5px 10px', display:'flex', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5', backgroundColor:'#f5f5f5',}}>
                    <div><img src={TipsExc}/></div>
                    <div style={{marginLeft:'5px'}}>Tip</div>
                </div>
                <div style={{fontSize:'12px', padding:'10px', borderBottom:'1px solid #e5e5e5',}}>
                    - 본 Report는 빠른 조회를 위하여 금일 1시간 이전 데이터를 조회합니다. <br />
                    - 본 Report는 게시물 내 "노출코드" 삽입으로 측정됩니다. [리포트설정 바로가기] <br />
                    - 본 Report는 "노출코드" 삽입 시점부터 "노출" 데이터를 수집하기에 게시물 등록 시점에 함께 진행해 주셔야 데이터 오차가 없습니다.
                </div>
            </div>
            <div style={{height:'45px'}}>
            </div>
            <div style={{fontSize:'12px', padding:'10px', borderTop:'1px dotted #e5e5e5', textAlign:'center'}}>
                Copyright ⓒ 2002-2023 BizSpring Inc. All Rights Reserved. FAX: 02-6919-5599 , E-MAIL: service@logger.co.kr
            </div>
            </div>
        </div>
    )
}
export default FlashSummaryV;