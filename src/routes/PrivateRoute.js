import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  // 로컬 스토리지에서 로그인 상태와 사용자 역할을 가져옴
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');

  // 사용자가 로그인되어 있고 역할이 ROLE_USER인 경우에만 접근 허용
  const isAuthenticated = isLoggedIn === 'true' && userRole === 'ROLE_USER';

  if (!isAuthenticated) {
    // 권한이 없는 경우에 로그인요청
    alert('로그인이 필요한 서비스입니다.');
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
