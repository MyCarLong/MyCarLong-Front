import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  color: rgb(191, 193, 194);
  text-align: center;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: -1;
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 MyCarLong Project All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
