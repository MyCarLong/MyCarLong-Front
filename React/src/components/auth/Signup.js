import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OAuthLogin from './OAuthLogin';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });
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

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    const nameRegex = /^[가-힣a-zA-Z]+$/;

    switch (name) {
      case 'name':
        if (!value.trim() || value.length > 10) {
          return '이름은 한글, 영어로 10자 이내로 입력하세요.';
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          if (!value.includes('@')) {
            return "이메일 주소에 '@'를 포함해 주세요.";
          }
          return '유효한 이메일 주소를 입력하세요.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          return '패스워드는 8글자 이상 입력하세요.';
        }
        break;
      case 'confirmPassword':
        if (value !== userDetails.password) {
          return '패스워드가 일치하지 않습니다.';
        }
        break;
      case 'contact':
        if (!phoneRegex.test(value)) {
          return '연락처는 000-0000-0000 형식으로 입력하세요.';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    Object.keys(userDetails).forEach(key => {
      const error = validateField(key, userDetails[key]);
      if (error) {
        valid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (valid) {
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.post(BASE_URL + '/api/signup', userDetails);
        console.log("Signup successful!", response.data);

        localStorage.setItem('token', response.data.token);
        
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      } catch (error) {
        console.error("Signup failed!", error.response.data);
        if (error.response.status === 400 && error.response.data === '중복된 이메일입니다.') {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: '중복된 이메일입니다.'
          }));
        } else {
          alert('회원가입에 실패했습니다.');
        }
      }
    }
  };

  return (
    <Container ref={formRef}>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={userDetails.email} 
          onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} 
          onBlur={handleBlur}
          required 
        />
        {errors.email && (
          <ErrorMsg>
            <ErrorIcon icon={faExclamationCircle} />
            {errors.email}
          </ErrorMsg>
        )}
        <Input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={userDetails.password} 
          onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} 
          onBlur={handleBlur}
          required 
        />
        {errors.password && (
          <ErrorMsg>
            <ErrorIcon icon={faExclamationCircle} />
            {errors.password}
          </ErrorMsg>
        )}
        <Input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={userDetails.confirmPassword} 
          onChange={(e) => setUserDetails({...userDetails, confirmPassword: e.target.value})} 
          onBlur={handleBlur}
          required 
        />
        {errors.confirmPassword && (
          <ErrorMsg>
            <ErrorIcon icon={faExclamationCircle} />
            {errors.confirmPassword}
          </ErrorMsg>
        )}
        <Input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={userDetails.name} 
          onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} 
          onBlur={handleBlur}
          required 
        />
        {errors.name && (
          <ErrorMsg>
            <ErrorIcon icon={faExclamationCircle} />
            {errors.name}
          </ErrorMsg>
        )}
        <Input 
          type="text" 
          name="contact" 
          placeholder="Contact (000-0000-0000)" 
          value={userDetails.contact} 
          onChange={(e) => setUserDetails({...userDetails, contact: e.target.value})} 
          onBlur={handleBlur}
          required 
        />
        {errors.contact && (
          <ErrorMsg>
            <ErrorIcon icon={faExclamationCircle} />
            {errors.contact}
          </ErrorMsg>
        )}
        <Button type="submit">Sign Up</Button>
      </Form>
      <OAuthLogin />
    </Container>
  );
};

export default Signup;
