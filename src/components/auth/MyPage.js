import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 40px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1020;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
  width: 100%;
`;

const Input = styled.input`
  width: 94%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  &:read-only {
    background-color: #e6e6e6;  
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  color: white;
  background-color: rgba(192, 192, 192);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(160, 160, 160);
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '하동원',
    email: 'dd2558@naver.com',
    contact: '010-1234-5678',
    password: 'gkehddnjs10',
    confirmPassword: 'gkehddnjs10'
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [contactError, setContactError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInfo.password.length > 0 && userInfo.password.length < 8) {
      setPasswordError('패스워드는 8글자 이상 입력하세요.');
    } else {
      setPasswordError('');
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      setConfirmPasswordError('패스워드가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }

    if (userInfo.contact && !/^(\d{3})-(\d{4})-(\d{4})$/.test(userInfo.contact)) {
      setContactError('000-0000-0000 형식으로 입력하세요.');
    } else {
      setContactError('');
    }

    if (!passwordError && !confirmPasswordError && !contactError) {
      toast.success('Information updated', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Title>My Page</Title>
      <InfoForm onSubmit={handleSubmit}>
        <Label>
          Name
          <Input type="text" value={userInfo.name} readOnly />
        </Label>
        <Label>
          Email
          <Input type="email" value={userInfo.email} readOnly />
        </Label>
        <Label>
          Change Password
          <Input type="password" name="password" value={userInfo.password} onChange={handleInputChange} />
          {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        </Label>
        <Label>
          Confirm Change Password
          <Input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleInputChange} />
          {confirmPasswordError && <span style={{ color: 'red' }}>{confirmPasswordError}</span>}
        </Label>
        <Label>
          Change Contact
          <Input type="text" name="contact" value={userInfo.contact} onChange={handleInputChange} />
          {contactError && <span style={{ color: 'red' }}>{contactError}</span>}
        </Label>
        <Button type="submit">Update</Button>
      </InfoForm>
      <ToastContainer />
    </PageContainer>
  );
};

export default MyPage;
