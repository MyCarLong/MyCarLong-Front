import React from 'react';
import styled from 'styled-components';

const StyledDashboardContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const DashboardContent = ({ activeNav }) => {
  let content;
  switch (activeNav) {
    case '/dashboard':
      content = <h1>대시보드</h1>;
      break;
    case '/vehiclelist':
      content = <h1>차고</h1>;
      break;
    case '/maintenance':
      content = <h1>정비</h1>;
      break;
    case '/settings':
      content = <h1>설정</h1>;
      break;
    default:
      content = <h1>대시보드</h1>; 
  }

  return <StyledDashboardContent>{content}</StyledDashboardContent>;
};

export default DashboardContent;
