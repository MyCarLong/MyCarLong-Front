import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: auto;
  padding: 0;
  margin-top: 15px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  &:hover {
    opacity: 0.85;
  }
`;

const ImageButton = styled(Button)`
  img {
    display: block;
    max-width: 100%;
    height: 40px;
    object-fit: contain;
  }
`;

const KakaoButton = styled(ImageButton)`
  img {
    width: 188px;
    height: 40px; 
    object-fit: cover; 
    border-radius: 3px;
  }
`;

const NaverButton = styled(ImageButton)`
  img {
    width: 188px;
    height: 40px; 
    object-fit: cover; 
    border-radius: 3px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 20px 0;
  color: white;
  font-size: 12px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OAuthLogin = () => {
  const handleLogin = (provider) => {
    if(provider=='kakao'){
      window.location.href = `http://localhost:8080/oauth/kakao`;
    } else if(provider=='google'){
<<<<<<< HEAD
<<<<<<< HEAD
      window.location.href = `http://localhost:8080/oauth/google`; 
=======
      window.location.href = ``; 
>>>>>>> e425f9f (save)
=======
      window.location.href = `http://localhost:8080/oauth/google`; 
>>>>>>> 00a0ef2 (Google Login test)
    } else if(provider=='naver'){
      window.location.href = `http://localhost:8080/oauth/naver`;
    }
    
  };

  return (
    <Container>
      <Divider>OR</Divider>
      <ImageButton onClick={() => handleLogin('google')}>
        <img src="/images/web_light_sq_ctn@4x.png" alt="Google login" />
      </ImageButton>
      <KakaoButton onClick={() => handleLogin('kakao')}>
        <img src="/images/kakao_login_large_narrow.png" alt="Kakao login" />
      </KakaoButton>
      <NaverButton onClick={() => handleLogin('naver')}>
        <img src="/images/btnW_official.png" alt="Naver login" />
      </NaverButton>
    </Container>
  );
};

export default OAuthLogin;

