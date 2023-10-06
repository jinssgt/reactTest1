import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, Descriptions } from "antd";
import "../css/loginModal.css";
import google from "../img/logo_google_w.png";
import naver from "../img/logo_naver.svg";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

const MyAccountModal = ({ isModalOpen, handleOk }) => {
  const [form] = Form.useForm();
  const [newPWInput1, setNewPWInput1] = useState();
  const [newPWInput2, setNewPWInput2] = useState();
  const [newPositionInput, setNewPositionInput] = useState();
  const [newPhoneInput, setNewPhoneInput] = useState();
  const [loginDisplay, setLoginDisplay] = useState("block");
  const [recoverDisplay, setRecoverDisplay] = useState("none");
  const [recoverForm, setRecoverForm] = useState("");
  const [loginError, setLoginError] = useState(false);
  // const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);

  const handleInputChanged1 = (e) => {
    setNewPWInput1(e.target.value);
    console.log('add parameter 1', e.target.value);
  }
  const handleInputChanged2 = (e) => {
    setNewPWInput2(e.target.value);
    console.log('add parameter 2', e.target.value);
  }
  const handlePositionChanged = (e) => {
    setNewPositionInput(e.target.value);
  }
  const handlePhoneChanged = (e) => {
    setNewPhoneInput(e.target.value);
  }

  const initialValue = {
    remember: "true",
  };

  const handleSigningIn = () => {
    setLoginDisplay("block");
    setRecoverDisplay("none");
    form.resetFields();
    setLoginError(false);
  };

  return (
    <Modal
      title="내 정보"
      open={isModalOpen}
      onOk={handleOk}
      afterClose={() => form.resetFields()}
      okText="Log In"
      footer={null}
      closable={false}
      width={900}
    >

        <div style={{padding:'10px', maxHeight:'700px', overflowY:'auto' }}>
            <Descriptions bordered>
                <Descriptions.Item label="프로필 사진" span={3} labelStyle={{ width: '25%', fontWeight:'bold' }}></Descriptions.Item>
                <Descriptions.Item label="이름" span={3}></Descriptions.Item>
                <Descriptions.Item label="아이디(이메일)" span={3}></Descriptions.Item>
                <Descriptions.Item label="새 비밀번호" span={3}><input placeholder="4~16자의 영문 대/소문자와 숫자 또는 특수문자를 혼합해서 사용하실 수 있습니다." style={{paddingLeft:'10px', width:'100%', height:'25px', border:'1px solid #edecec'}} value={newPWInput1} onChange={handleInputChanged1}></input></Descriptions.Item>
                <Descriptions.Item label="새 비밀번호 확인" span={3}><input placeholder="4~16자의 영문 대/소문자와 숫자 또는 특수문자를 혼합해서 사용하실 수 있습니다." style={{paddingLeft:'10px', width:'100%', height:'25px', border:'1px solid #edecec'}} value={newPWInput2} onChange={handleInputChanged2}></input></Descriptions.Item>
                <Descriptions.Item label="조직" span={3}></Descriptions.Item>
                <Descriptions.Item label="직위/직책" span={3}><input placeholder="직책을 입력하세요." style={{paddingLeft:'10px', width:'100%', height:'25px', border:'1px solid #edecec'}} value={newPositionInput} onChange={handlePositionChanged}></input></Descriptions.Item>
                <Descriptions.Item label="전화번호/핸드폰번호" span={3}><input placeholder="구분자(-)를 포함해서 입력하세요." style={{paddingLeft:'10px', width:'100%', height:'25px', border:'1px solid #edecec'}} value={newPhoneInput} onChange={handlePhoneChanged}></input></Descriptions.Item>
                <Descriptions.Item label="권한" span={3}></Descriptions.Item>
                <Descriptions.Item label="앱 접근 권한" span={3}></Descriptions.Item>
                <Descriptions.Item label="사용 상태" span={3}></Descriptions.Item>
            </Descriptions>
        </div>
        <div style={{borderTop:'1px solid #e5e5e5', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{marginTop:'10px'}}>
                <button className="default-btn" style={{marginRight:'10px'}}>
                    취소
                </button>
                <button className="custom-btn" style={{marginRight:'10px'}}>
                    저장
                </button>
            </div>
        </div>
      
    </Modal>
  );
};

export default MyAccountModal;