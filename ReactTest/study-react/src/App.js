import logo from './logo.svg';
// import './App.css';
// import Gnb from './component/cpc_click_gnb';
// import Gnbt from './component/cpc_click_gnb_test';
// import LNB from './component/cpc_click_lnb_test';
// import Applnb from './component/fromantd';
import Appbsjs from './component/cpcClickLnbGnbSample';
import cpcClickLnbGnbSample from './component/cpcClickLnbGnbSample';
import Lnb from './component/lnb';
import Gnb from './component/gnb';
import CpcClick from './component/cpc_click';
import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio } from 'antd';
const { Header, Sider, Content } = Layout;

function App() {
  return (
      <Layout hasSider>
        <Lnb/>
        <Layout>
          <Gnb/>
          <CpcClick/>
        </Layout>
      </Layout>
  );
}

export default App;
