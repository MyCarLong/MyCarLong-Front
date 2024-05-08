import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OAuthLogin from './OAuthLogin';
import axios from 'axios';

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
    // 이벤트 객체 대신 직접 유효성 검사와 로그인 처리를 수행합니다.
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/login', { email, password });
        console.log('Login response:', response); // 응답 확인
        if (response.status === 200) { // 성공적인 응답 확인
          console.log('Login successful!', response.data);
          // 로그인이 성공하면 사용자 이름을 설정하고, 로그인 상태를 업데이트합니다.
          setUserName(response.data.name);
          console.log(response.data.name);
          alert("반갑습니다 " + response.data.name + "님.");
          setIsLoggedIn(true); // 로그인 성공 시 상태를 true로 변경합니다.
          localStorage.setItem('isLoggedIn', 'true'); // 로컬 스토리지에 로그인 상태 저장
          handleClose();
          handleLoginSuccess(); // 로그인 성공 후 페이지 새로고침
        } else {
          // 서버에서 다른 응답을 보낼 경우 처리
          console.error('Login failed!', response.data);
          setError("이메일이나 비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        // 서버로부터 에러 응답을 받은 경우 처리
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
    // 로그인 버튼 클릭 시 호출되는 함수
    e.preventDefault(); 
    handleSubmit(); // handleSubmit 함수 호출
  };

  const handleLoginSuccess = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <LoginContainer ref={loginRef}>
      <CloseButton onClick={handleClose}>&times;</CloseButton>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit" onClick={handleLoginClick}>Log In</Button> {/* type="submit" 추가 */}
      </LoginForm>
      <OAuthLogin />
    </LoginContainer>
  );
};

export default Login;