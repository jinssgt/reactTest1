import React, { useEffect, useRef, useState } from "react"
import { StarFilled } from '@ant-design/icons';
import './trk_viral_css.css'
import { DatePicker, Popover, Tabs } from 'antd';
import moment from "moment";
import TabPane from "antd/es/tabs/TabPane";
import TipsExc from '../img/trk_viral/icon_sinfo.gif';
import Btn1 from '../img/trk_viral/btn_01.png';
import Btn2 from '../img/trk_viral/btn_02.png';

const ViralRank = () => {

    const logAnSys = []

    const pubLogAn = [
        {
            title:'공공기관 웹 로그분석에 최적화된 “비즈스프링 로거(Logger...',
            url:'https://blog.bizspring.co.kr/',
            rank:'10',
            dataIndex:'1'
        },
        {
            title:'	[보도자료] 비즈스프링, APEC기후센터 웹 로그분석 솔루션...',
            rank:'11',
            url:'https://blog.bizspring.co.kr/',
            dataIndex:'2'
        },
    ]

    const logAnSol = [
        {
            title:'	[보도자료] 비즈스프링, APEC기후센터 웹 로그분석 솔루션...',
            url:'https://blog.bizspring.co.kr/',
            rank:'40',
        }
    ]

    const insight = []
    const massMail = []
    const emailMarketing = []
    const logger = []
    const bizspringKW =[
        {
            title:'[비즈스프링] 4월 생일자 축하파티 전격공개!',
            url:'https://blog.bizspring.co.kr/',
            rank:'10',
        },
        {
            title:'비즈스프링에게 2013년이란?',
            url:'https://blog.bizspring.co.kr/',
            rank:'22',
        },
        {
            title:'비즈스프링 [BizSpring BOOST™] – 특허출원',
            url:'https://blog.bizspring.co.kr/',
            rank:'35',
        },
        {
            title:'키워드로 알아보는 2016 비즈스프링',
            url:'https://blog.bizspring.co.kr/',
            rank:'45',
        },
        {
            title:'★비회원★의 고객경험 강화를 위한 전략!! – 비즈스프링 부스트',
            url:'https://blog.bizspring.co.kr/',
            rank:'47',
        },
        {
            title:'오랜만에 뭉쳤다. 비즈스프링 전체회식 날',
            url:'https://blog.bizspring.co.kr/',
            rank:'48',
        },
        {
            title:'2007년 비즈스프링 하반기 워크샵 _ 족구대회',
            url:'https://blog.bizspring.co.kr/',
            rank:'49',
        },
        {
            title:'[비즈스프링] 마케터라면 꼭 알아야 할 상식1 – 애드테크',
            url:'https://blog.bizspring.co.kr/',
            rank:'50',
        },
        {
            title:'되리] ♥ 움직이는 당신은 성공 전략가! – 비즈스프링 인사이트™',
            url:'https://blog.bizspring.co.kr/',
            rank:'51',
        },
        {
            title:'모바일에서 비즈스프링을 만나세요. 모바일 웹사이트 오픈',
            url:'https://blog.bizspring.co.kr/',
            rank:'52',
        },
    ]
    const internetTrend =[]

    const viralAn = [
        {
            title:'고객분석 : 남성 의류 쇼핑몰 [바이럴 업데이트] 실전편...',
            url:'https://blog.bizspring.co.kr/',
            rank:'97',
        }
    ]

    const [selectedBtnIndex, setSelectedBtnIndex] = useState(null);
    const [selectedKeyword, setSelectedKeyword] = useState();
    const handleButtonClick = (index) => {
        setSelectedBtnIndex(index);
        if(index === 0){
            setSelectedKeyword('logAnSys');
        }else if(index === 1){
            setSelectedKeyword('pubLogAn');
        }else if(index === 2){
            setSelectedKeyword('logAnSol');
        }else if(index === 3){
            setSelectedKeyword('insight');
        }else if(index === 4){
            setSelectedKeyword('massMail');
        }else if(index === 5){
            setSelectedKeyword('emailMarketing');
        }else if(index === 6){
            setSelectedKeyword('logger');
        }else if(index === 7){
            setSelectedKeyword('bizspringKW');
        }else if(index === 8){
            setSelectedKeyword('internetTrend');
        }else if(index === 9){
            setSelectedKeyword('viralAn');
        }
    };

    const keywordMapping = {
        logAnSys: logAnSys,
        pubLogAn: pubLogAn,
        logAnSol: logAnSol,
        insight: insight,
        massMail: massMail,
        emailMarketing: emailMarketing,
        logger: logger,
        bizspringKW: bizspringKW,
        internetTrend: internetTrend,
        viralAn: viralAn,
    }

    const favPopover = (
        <div>
            클릭하시면 즐겨찾기에 등록됩니다
        </div>
    );
    
    const keywordPopover = (
        <div>
            클릭하시면 활성화 됩니다.
        </div>
    )
    
    const defaultDate = moment();
    function callBack(key){
        console.log(key);
    };
    
    const keywordBtn = [
        {
            title:'[집행중]로그분석 시스템',
            dataIndex:'1',
        },
        {
            title:'[집행중]공공 로그분석',
            dataIndex:'2',
        },
        {
            title:'[집행중]로그분석 솔루션',
            dataIndex:'3',
        },
        {
            title:'[집행중]인사이트',
            dataIndex:'4',
        },
        {
            title:'[집행중]대량메일',
            dataIndex:'5',
        },
        {
            title:'[집행중]이메일마케팅',
            dataIndex:'6',
        },
        {
            title:'[집행중]로거',
            dataIndex:'7',
        },
        {
            title:'[집행중]비즈스프링',
            dataIndex:'8',
        },
        {
            title:'[집행중]인터넷트렌드',
            dataIndex:'9',
        },
        {
            title:'[집행중]바이럴 분석',
            dataIndex:'10',
        },
    ]

    const comparePostList = [
        {
            title:'디딤365-로그프레소, 공공·금융 클라우드 사업 확대 맞손',
            url:'blog.naver.com/didim365_',
            rank:'1',
            dataIndex:'1',
        },
        {
            title:'웹로그분석솔루션과 통합로그관리솔루션의 차이',
            url:'blog.naver.com/innerbus_co',
            rank:'2',
            dataIndex:'2',
        },
        {
            title:'Criminal IP FDS, 로그 분석 플랫폼 Splunk 통합 앱 출시',
            url:'blog.naver.com/aispera',
            rank:'4',
            dataIndex:'3',
        },
    ]

    const postListColumns = [
        {
            label:'순위',
            dataIndex:'title',
        },
        {
            label:'title/url',
            dataindex:'',
            
        }
    ]

    const keywordLength = keywordMapping[selectedKeyword] ? keywordMapping[selectedKeyword].length : 0;
    const keywordItems = keywordMapping[selectedKeyword];
    // const highestRank = keywordItems ? keywordItems.reduce((minRank, item) => Math.min(minRank, item.rank), Infinity) : 0;
    const highestRank = keywordItems ? keywordItems.reduce((maxRank, item) => Math.max(maxRank, item.rank || 0), 0) : '-';
    const [visibleItems, setVisibleItems] = useState(5);

    const handleExpand = () => {
        // Set the number of visible items to the total number of items in the list
        setVisibleItems(keywordMapping[selectedKeyword]?.length);
    };
    const handleCollapse = () => {
        // Set the number of visible items back to 5
        setVisibleItems(5);
    };

    return (
        <div>
            <div style={{width:'100%', minHeight:'70px', borderBottom:'1px solid #e5e5e5'}}>
                <div style={{padding:'10px'}}>
                    <div style={{fontSize:'20px', display:'flex'}}>
                        <Popover placement="bottom" content={favPopover} style={{backgroundColor:'gray'}}>
                            <StarFilled className="favIcon"/>
                        </Popover>
                        <div style={{marginLeft:'10px', marginTop:'-3px'}}>
                            네이버 노출순위
                        </div>
                    </div>
                    <div style={{fontSize:'12px', marginTop:'10px', marginBottom:'10px', display:'flex', justifyContent: 'space-between' }}>
                        <div>
                            등록한 키워드로 네이버에서 검색시 내 컨텐츠가 몇 위에 노출되고 있으며, 경쟁 블로그는 어떤것이 있는 알 수 있는 리포트입니다.
                        </div>
                        <div>
                            <DatePicker/>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width:'100%', minHeight:'70px', display:'flex'}}>
                <div style={{padding:'10px'}}>
                    키워드
                </div>
                {keywordBtn.map((item, index) => (
                    <Popover key={item.dataIndex} placement="bottom" content={keywordPopover} style={{backgroundColor:'gray'}}>
                        <button
                            className={`keywordBtn ${selectedBtnIndex === index ? 'selected' : ''}`}
                            onClick={() => handleButtonClick(index)}
                        >{item.title}</button>
                    </Popover>
                ))}
            </div>
            <div style={{width:'100%', minHeight:'270px', border:'1px solid #e5e5e5', padding:'0px 10px 0px 10px'}}>
                <Tabs defaultActiveKey='1' onChange={callBack}>
                    <TabPane tab='BLOG' key='1'>
                        <div style={{display:'flex', marginBottom:'4px'}}>
                            <div className="rankTabContent" style={{marginRight:'2px'}}>
                                <div className="rankTabContentTitle">확산된 내 포스트</div>
                                    <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
                                        <div style={{fontSize:'50px', height:'70px', color:'red'}}>{keywordLength}</div>
                                        <div className="blogTabPosts">posts</div>
                                    </div>
                                    <div style={{ marginBottom:'20px'}}>
                                        최고 노출 순위 : {highestRank === 0 ? '-' : highestRank} 위
                                    </div>
                                <div style={{backgroundColor:'#f5f5f5', display:'flex', height:'25px', justifyContent:'center', alignItems:'center', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                                    <div style={{width:'20%'}}>
                                        순위
                                    </div>
                                    <div style={{width:'80%'}}>
                                        title/url
                                    </div>
                                </div>
                                <div style={{minHeight:'40px',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
                                    {/* 확산된 포스트가 없습니다. */}
                                    {/* {keywordMapping[selectedKeyword] && keywordMapping[selectedKeyword].map((item, index) => ( */}
                                    {keywordMapping[selectedKeyword]?.slice(0, visibleItems).map((item, index) => (
                                        <div style={{display:'flex', width:'100%', border:'1px solid #e5e5e5', minHeight:'50px', justifyContent:'center', alignItems:'center',}}>
                                            <div style={{width:'20%'}}>
                                                <div style={{height:'100%'}}>{item.rank}</div>
                                            </div>
                                            <div style={{width:'70%', textAlign:'left'}}>
                                                <div>{item.title}</div>
                                                <div>{item.url}</div>
                                            </div>
                                            <div style={{display:'flex', paddingRight:'5px', width:'10%'}}>
                                                <img className="rankBtn" src={Btn1}/>
                                                <img className="rankBtn" src={Btn2}/>
                                            </div>
                                            <div>
                                                {item.length}
                                            </div>
                                        </div>
                                    // ))}
                                    ))}
                                </div>
                            </div>
                            <div className="rankTabContent" style={{marginLeft:'2px'}}>
                                <div className="rankTabContentTitle">비교경쟁 포스트</div>
                                <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
                                    <div style={{fontSize:'50px', height:'70px', color:'blue'}}>{comparePostList.length}</div>
                                    <div className="blogTabPosts">posts</div>
                                </div>
                                <div style={{ marginBottom:'20px'}}>
                                    최고 노출 순위 : - 위
                                </div>
                                <div style={{backgroundColor:'#f5f5f5', display:'flex', height:'25px', justifyContent:'center', alignItems:'center', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                                    <div style={{width:'20%'}}>
                                        순위
                                    </div>
                                    <div style={{width:'80%'}}>
                                        title/url
                                    </div>
                                </div>
                                <div style={{minHeight:'40px',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
                                    {/* 확산된 포스트가 없습니다. */}
                                    {comparePostList.map((item, index) => (
                                        <div style={{display:'flex', width:'100%', border:'1px solid #e5e5e5', minHeight:'50px', justifyContent:'center', alignItems:'center',}}>
                                            <div style={{width:'20%'}}>
                                                <div style={{height:'100%'}}>{item.rank}</div>
                                            </div>
                                            <div style={{width:'70%', textAlign:'left'}}>
                                                <div>{item.title}</div>
                                                <div>{item.url}</div>
                                            </div>
                                            <div style={{display:'flex', paddingRight:'5px', width:'10%'}}>
                                                <img className="rankBtn" src={Btn1}/>
                                                <img className="rankBtn" src={Btn2}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{textAlign:'center', marginBottom:'10px'}}>
                            {keywordMapping[selectedKeyword]?.length > visibleItems ? (
                                <button onClick={handleExpand} className="moreInfoBtn">
                                    더보기
                                </button>
                            ) : (
                                <button onClick={handleCollapse} className="moreInfoBtn">접기</button>
                            )}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <div style={{width:'100%', minHeight:'70px', marginTop:'20px'}}>
                <div style={{padding:'5px 10px', display:'flex', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5', backgroundColor:'#f5f5f5',}}>
                    <div><img src={TipsExc}/></div>
                    <div style={{marginLeft:'5px'}}>Tip</div>
                </div>
                <div style={{fontSize:'12px', padding:'10px', borderBottom:'1px solid #e5e5e5',}}>
                    - 본 Report는 매일 새벽에 노출순위를 체크하여 리포팅하며, 일별 조회만 가능합니다. <br />
                    - 본 Report는 "키워드" 설정이 필요하며, 새로 등록된 키워드는 다음날부터 데이터를 확인하실 수 있습니다. [리포트설정 바로가기] <br />
                    - 본 Report는 "키워드" 별 상위 100위 이내의 포스트를 기준으로 리포팅합니다.
                </div>
            </div>
            <div style={{height:'45px'}}>
            </div>
            <div style={{fontSize:'12px', padding:'10px', borderTop:'1px dotted #e5e5e5', textAlign:'center'}}>
                Copyright ⓒ 2002-2023 BizSpring Inc. All Rights Reserved. FAX: 02-6919-5599 , E-MAIL: service@logger.co.kr
            </div>
        </div>
    )
}
export default ViralRank;