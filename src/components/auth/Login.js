import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OAuthLogin from './OAuthLogin';
import axios from 'axios';

// import CryptoJS from 'crypto-js';
// const SECRET_KEY = process.env.REACT_APP_NAME_SECRET_KEY;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 40px auto;
  padding: 40px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1010;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(192, 192, 192);  
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(160, 160, 160);  
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 사용자 로그인 여부
  const [userName, setUserName] = useState(''); // 사용자 이름

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return false;
    }
    if (password.length < 8) {
      setError('패스워드는 8글자 이상 입력하세요.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        // 일반회원으로 로그인한다
        const response = await axios.post(BASE_URL+ '/api/login', { email, password });
        console.log('Login response:', response); // 응답 확인
        if (response.status === 200) {
          console.log('Login successful!', response.data);
          setUserName(response.data.name);
          alert("반갑습니다 " + response.data.name + "님");
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('provider','BASIC_USER');
          sessionStorage.setItem('userRole','ROLE_USER');

          // let nickname = CryptoJS.AES.encrypt(response.data.name, SECRET_KEY).toString();
          let nickname = response.data.name;
          sessionStorage.setItem("nickname",nickname);
          sessionStorage.setItem("email",email);
          // 새로운 토큰을 받아와서 로컬 스토리지에 저장합니다.
          sessionStorage.setItem('token', response.data.token);
          handleClose();
          window.location.reload();
        } else {
          console.error('Login failed!', response.data);
          setError("이메일이나 비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error('Login failed!', error.response.data);
        setError("이메일이나 비밀번호가 일치하지 않습니다.");
      }
    }
  };




  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        navigate('/');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    handleSubmit();
  };


  return (
      <LoginContainer ref={loginRef}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title>Login</Title>
        <LoginForm onSubmit={handleSubmit}>
          <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" onClick={handleLoginClick}>Log In</Button>
        </LoginForm>
        <OAuthLogin />
      </LoginContainer>
  );
};

export default Login;