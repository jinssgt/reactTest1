import React from "react"
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
  import { Button, Layout, Menu, theme, Tabs, Table, Divider, Radio, Descriptions } from 'antd';
  import { useState } from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
  import Select from 'react-select'
  import Logo from '../img/admin-logo.png'
  import LogoText from '../img/admin-text.png'
  import CircExclm from '../img/circleExclm.png'
  import TabPane from 'antd/es/tabs/TabPane';
  import { DatePicker, Space } from 'antd';
  import './cpc_click.css'
  import Popup from 'reactjs-popup'
  import Lnb from './lnb';
  import dayjs from 'dayjs';
  const { RangePicker } = DatePicker;
  const { Header, Sider, Content } = Layout;

  const GPTable = () => {
    
  }