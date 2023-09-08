import logo from './logo.svg';
import { useState } from "react";
import Appbsjs from './component/cpcClickLnbGnbSample';
import cpcClickLnbGnbSample from './component/cpcClickLnbGnbSample';
import Lnb from './component/lnb';
import Gnb from './component/gnb';
// import Gnb from './component/header';
// import Lnb from './component/sider';
import CpcClick from './component/cpc_click';
import ViralRank from './logger_component/trk_viral_rank';
import FlashSummaryV from './logger_component/trk_flash_summary_v';
import FlashPost from './logger_component/trk_flash_post';
import FlashTrend from './logger_component/trk_flash_trend_v';
import AudienceDetailModal from './component/Audience_detail_modal';
import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapse, setCollapse] = useState();
  const [selectedAd, setSelectedAd] = useState();
  const [clientData, setClientData] = useState();
  const [lnbMenu, setLnbMenu] = useState();
  const updateClientData = (data) => {
    setClientData(data);
  }
  const updateLnbMenu = (data) => {
    setLnbMenu(data);
  }
  const colChange = (value) => {
    setCollapse(value);
  };
  const selectAd =(value)=>{
    setSelectedAd(value)
  }
  return (
      <Router>
      <Layout>
        {/* <Lnb/> */}
        <Lnb clientData={clientData} lnbMenu={lnbMenu} collapsed={collapse} onValueChange={selectAd}/>
        <Layout>
          {/* <Gnb/> */}
          <Gnb updateClientData={updateClientData} updateLnbMenu={updateLnbMenu} onValueChange={colChange} style={{paddingTop: '60px'}}/>
          <Layout>
            <Content
            style={{
              margin: '24px 26px',
              padding: 24,
              minHeight: 860,
              background: colorBgContainer,
              marginLeft: collapse ? '0' : '264px',
              marginTop:'60px',
            }}
            >
              <Routes>
                <Route exact path='/' Component={AudienceDetailModal}/>
                <Route exact path="/5510" Component={CpcClick}/>
                <Route path="/trk_viral_rank" Component={ViralRank}/>
                <Route path="/trk_flash_summary_v" Component={FlashSummaryV}/>
                <Route path="/trk_flash_post" Component={FlashPost}/>
                <Route path="/trk_flash_trend_v" Component={FlashTrend}/>
              </Routes>
              {/* <CpcClick /> */}
              {/* <ViralRank /> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      </Router>
  );
}

export default App;
