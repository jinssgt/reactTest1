import React,{useCallback, useEffect, useMemo, useState} from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link,useLocation, useNavigate   } from "react-router-dom";
import { Layout, Menu, Divider,Select } from "antd";
import AdData from "../data/adData";




const { Sider } = Layout;
const sideItems =[{
  key: "0",
  icon: <UserOutlined />,
  value : "/",
  label: <Link to="/">통합대시보드</Link>,
},
{
  key: "1",
  icon: <VideoCameraOutlined />,
  value : "/temp/modules",
  label: <Link to="/temp/modules">모듈샘플</Link>,
},
{
  key: "2",
  icon: <UploadOutlined />,
  value : "/temp/apitest",
  label: <Link to="/temp/apitest">API테스트 페이지</Link>,
},
{
  key: "3",
  icon: <UploadOutlined />,
  value : "/temp/report/Exam",
  label: <Link to="/temp/report/Exam">리포트</Link>,
},
{
  key: "4",
  icon: <UploadOutlined />,
  value : "/temp/alarm",
  label: '모니터링 알람',
  children: [
    {
      key: "4-1",
      value : "/temp/alarm/setting",
      label: (
        <Link to="/temp/alarm/setting">알람 설정</Link>
        ),
      },
    {
      key: "4-2",
      value : "/temp/alarm/story",
      label: (
        <Link to="/temp/alarm/story">
          알람 실행 스토리
        </Link>
      ),
    },
  ],
},
{
  key: "5",
  icon: <UploadOutlined />,
  value : "/temp/media/export",
  label: <Link to="/temp/media/export">매체 데이터 내보내기</Link>,
},
{
  key: "6",
  icon: <UploadOutlined />,
  value :"/temp/media/download",
  label: <Link to="/temp/media/download">매체 데이터 다운로드</Link>,
},
]



const Lnb = ({ collapsed ,onValueChange}) => {
  const location = useLocation();
  
  const currentPath = location.pathname;
  const [currentPage, setCurrentPage] = useState((location.search).split('=')[1]);
  const [selectedAd,setSelectedAd] = useState();
  const [selectedSider, setSelectedSider] = useState(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key));
  const defaultData = [ { label: "전체광고주", value: 0 },...AdData.map((item) => ({ label: item.name, value: item.value }))]
//   const [selectordata, setSelectordata] = useState()
  const [selectordata, setSelectordata] = useState(defaultData)
  const [openKeys, setOpenKeys] = useState([]);
  // let selectordata;
 


  useEffect(() => {
    setSelectedSider(sideItems.filter((item)=>item.value === currentPath).map((item)=>item.key))
    setCurrentPage((location.search).split('=')[1]);
    if(currentPath === '/'){
    //   setSelectordata()
      setSelectordata(defaultData)
    }else{
      const newValue = defaultData.filter((item)=>item.value !== 0)
    //   setSelectordata()
      setSelectordata(newValue)
    }
  }, [location,currentPath])

  useEffect(() => {

    if (currentPath === "/") {
      if(currentPage >0){
        setSelectedAd(currentPage)
      }
      else{
        setSelectedAd(selectordata[0].value)
      }
    } else {
      if (currentPage >0 ) {
        setSelectedAd(currentPage);
      }else{
        setSelectedAd(selectordata[0].value);
      }
    }
  }, [selectordata])
  const Adselect = () => {

    // let selectordata;
    const navigate = useNavigate();
    
    const adSelect =(option)=>{
      setSelectedAd(option.value);
      onValueChange(option)
      handleToMove(option.value)
    }

    const handleToMove = (clientSeq) => {
      navigate({
        pathname: currentPath,
        search: `?clientSeq=${clientSeq}`,
      });
    };

    return (
      <>
            <Select
              className="lnb-side-ad-selector"
              showSearch
              style={{
                width: 200,
              }}
              options={selectordata}
              optionFilterProp="children"
              value={selectedAd}
              filterOption={(input, option) => (option?.label ?? '').includes(input)}
              onChange={(value, option) => {
                adSelect(option)
                }}
                dropdownStyle={{
                  position:"fixed",
                  top:130,
                }}
                >
              </Select>
      </>
    );
  };

  const findSelectedMenuItemAndParent = (menuItems, path) => {
    for (const item of menuItems) {
      if (item.value === path) {
        return { selected: item, parent: undefined };
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.value === path) {
            return { selected: child, parent: item };
          }
        }
      }
    }
    return { selected: undefined, parent: undefined };
  };

  useEffect(() => {
    const { selected, parent } = findSelectedMenuItemAndParent(sideItems, currentPath);
    if (selected) {
      setSelectedSider([selected.key]);
      if (parent) {
        if (!selected.children) {
          setOpenKeys([parent.key]);
        }
      } else {
        setOpenKeys([]);
      }
    } else {
      setSelectedSider([]);
      setOpenKeys([]);
    }
    //페이지 이동 시 화면 최상단으로 이동.
    window.scrollTo(0, 0);
  }, [location]);

  return (
<>
    <Sider
      trigger={null}
      collapsed={collapsed}
      style={{
        height: "100vh",
        position: 'fixed',
        top: 61,
        left: 0,
        right: 0,
        zIndex: 4,
      }}
      width= '240px'
      collapsedWidth="0"
      >
      <div className="demo-logo-vertical" />
      <div className="sider-selector">
        <span style={{fontSize:'14px', color:'white'}}>광고주 선택</span>
        <Adselect />
      </div>
      <Divider style={{ borderColor: "#273240" }} />
      <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedSider}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          items={sideItems}
        />
      </Sider>
        </>
  );
};

export default Lnb;