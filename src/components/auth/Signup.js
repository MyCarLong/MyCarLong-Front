import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OAuthLogin from './OAuthLogin';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: rgba(255,255,255,0.3);
  position: relative; 
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 3px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;


const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();  

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    const checkOutsideClick = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', checkOutsideClick);
    return () => {
      document.removeEventListener('mousedown', checkOutsideClick);
    };
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    const nameRegex = /^[가-힣a-zA-Z]+$/;

    if (!userDetails.name.trim() || userDetails.name.length > 10) {
      setError('이름은 한글, 영어로 10자 이내로 입력하세요.');
      return false;
    }
    if (!emailRegex.test(userDetails.email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return false;
    }
    if (userDetails.password.length < 8) {
      setError('패스워드는 8글자 이상 입력하세요.');
      return false;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setError('패스워드가 일치하지 않습니다.');
      return false;
    }  
    if (!phoneRegex.test(userDetails.contact)) {
      setError('연락처는 000-0000-0000 형식으로 입력하세요.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/signup', userDetails); // Adjust the endpoint according to your backend route
        console.log("Signup successful!", response.data);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
        // Additional logic after successful signup
      } catch (error) {
        console.error("Signup failed!", error.response.data);
        if (error.response.status === 400 && error.response.data === '중복된 이메일입니다.') {
          setError('중복된 이메일입니다.');
        } else {
          setError('중복된 이메일입니다.');
        }
      }
    }
  };

  return (
    <Container ref={formRef}>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} required />
        <Input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} required />
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={userDetails.confirmPassword} onChange={(e) => setUserDetails({...userDetails, confirmPassword: e.target.value})} required />
        <Input type="text" name="name" placeholder="Name" value={userDetails.name} onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} required />
        <Input type="text" name="contact" placeholder="Contact (000-0000-0000)" value={userDetails.contact} onChange={(e) => setUserDetails({...userDetails, contact: e.target.value})} required />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit">Sign Up</Button>
      </Form>
      <OAuthLogin />
    </Container>
  );
};

export default Signup;
