import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: rgba(192, 192, 192, 0.1);
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  height: 50px;  
  width: 150px;  
  margin: 0;

  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    background-image: url('/images/mycarlong_original.png'); 
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const NavLinks = styled.div`
  a {
    color: gray;
    margin-left: 20px;
    font-size: 16px;
    text-decoration: none;
    &:hover {
      color: rgb(191, 193, 194);
    }

    &:nth-last-child(3) {
      margin-right: 50px; 
    }
  }

  a:nth-last-child(1),
  a:nth-last-child(2) {
    color: rgb(170, 170, 170);
    &:hover {
      color: gray;
    }
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // 페이지 로드 시에만 실행되도록 변경

  const handleLogoutClick = () => {
    // 로그아웃 처리 및 로컬 스토리지 업데이트
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('provider');
    localStorage.removeItem('userRole');
    console.log('로그아웃됨');
  };

  const handleLoginClick = async () => {
    // 로그인 버튼 클릭 시 로그인 처리 후 로그인 상태 변경
    // 로그인 성공 여부는 여기에서 처리하지 않습니다.
    // 성공한 경우에만 로그인 상태를 변경하도록 handleSubmit 함수에서 처리합니다.
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    console.log('로그인됨');
  };

  const handleMyPageClick = (e) => {
    const provider = localStorage.getItem('provider');
    if (provider === 'google' || provider === 'kakao' || provider === 'naver') {
      e.preventDefault(); // 기본 동작 막기
      alert('마이페이지는 일반 로그인 회원 전용입니다.');
    } 
  };


  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link to="/" />
        </Logo>
        <NavLinks>
          <Link to="/aboutus">사이트소개</Link>
          <Link to="/chatapp">AI채팅</Link>
          <Link to="/nearby">내주변검색</Link>
          <Link to="/vehicles">모두의차고</Link>
          <Link to="/dashboard">대시보드</Link>
          {isLoggedIn ? (
            <>
              <Link to="/" onClick={handleLogoutClick}>로그아웃</Link>
              <Link to="/mypage" onClick={handleMyPageClick}>마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLoginClick}>로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;