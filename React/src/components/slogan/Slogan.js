import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeInSlogan = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SloganContainer = styled.div`
  position: absolute;
  top: 50%;  
  left: 5%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 50px;
  font-weight: bold;
  z-index: -1; 
  transform: translateY(-50%);
`;

const MyCarLongText = styled.span`
  color: gray;
  font-size: 100px; 
`;

const SloganText = styled.span`
  display: block;
  ${({ animate }) => animate && css`
    animation: ${fadeInSlogan} 5s ease-in-out;
  `}
`;

const Slogan = () => {
  const slogans = useMemo(() => [
    "Expert Care, Exceptional Repair.",
    "Quality Service, Whenever you want.",
    "Convenient Inquiry, For you."
  ], []); 

  const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate(false); 
      const nextIndex = (index + 1) % slogans.length;
      setTimeout(() => {
        setCurrentSlogan(slogans[nextIndex]); 
        setIndex(nextIndex);
        setAnimate(true); 
      }, 10);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [index, slogans]); 

  return (
    <SloganContainer>
      <MyCarLongText>MyCarLong</MyCarLongText>
      <SloganText animate={animate}>{currentSlogan}</SloganText>
    </SloganContainer>
  );
};

export default Slogan;
