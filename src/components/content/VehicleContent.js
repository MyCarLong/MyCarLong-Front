import React from 'react';
import styled from 'styled-components';
import VehicleDetail from '../vehicles/VehicleDetail';

const StyledVehicleContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Line = styled.hr`
  width: 20%;
  border: 0;
  border-top: 1px solid #ccc;
  margin-left: 0; 
  margin-top: -10px; 
`;

const VehicleContent = ({ activeNav }) => {
  let content;
  switch (activeNav) {
    case '/vehicle':
      content = <h1>모두의차고</h1>;
      break;
    case '/vehicledetail':
      content = <h1>AI차량제원</h1>;
      break;
    default:
      content = <h1>모두의차고</h1>; 
  }

  return (
    <StyledVehicleContent>
      {content}
      <Line />
      {activeNav === '/vehicledetail' && <VehicleDetail />}
    </StyledVehicleContent>
  );
};

export default VehicleContent;
