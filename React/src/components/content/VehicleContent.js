import React from 'react';
import styled from 'styled-components';
import VehicleDetail from '../vehicles/VehicleDetail';
import VehicleGarage from '../vehicles/VehicleGarage';

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
    let content = <VehicleGarage />;
    let title = '모두의차고';

    if (activeNav === '/vehicledetail') {
        content = <VehicleDetail />;
        title = 'AI차량제원';
    }
    // let content;
    // switch (activeNav) {
    //     case '/vehicle':
    //         content = <h1>모두의차고</h1>;
    //         break;
    //     case '/vehicledetail':
    //         content = <h1>AI차량제원</h1>;
    //         break;
    //     mycarlong.conf:
    //         content = <h1>모두의차고</h1>;
    // }

    return (
        <StyledVehicleContent>
            <h1>{title}</h1>
            <Line />
            {content}
        </StyledVehicleContent>
    );
};

export default VehicleContent;