import React from 'react';
import styled from 'styled-components';

const StyledNearbyContent = styled.div`
  flex-grow: 0;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  color: #555;
  margin-bottom: 20px;
`;

const Line = styled.hr`
  width: 20%;
  border: 0;
  border-top: 1px solid #ccc;
  margin-left: 0; 
  margin-top: -10px; 
`;

const NearbyContent = () => {
  return (
    <StyledNearbyContent>
      <Title>내주변검색</Title>
      <Line />
    </StyledNearbyContent>
  );
};

export default NearbyContent;
