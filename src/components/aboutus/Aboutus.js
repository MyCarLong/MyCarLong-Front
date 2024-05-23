import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
`;

const scrollMove = keyframes`
    0% { background-position-y: 0; }
    100% { background-position-y: calc(100% - ${props => props.imageHeight}px); }
`;

const IntroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 140vh;
    margin: auto;
    overflow: hidden;
`;

const TitleBackground = styled.div`
    background-image: linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
    ),
    url('./images/manager.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
    padding-right: 20%;
    animation: ${scrollMove} 2s forwards;
`;

const filteredProps = ['animate', 'delay'];

const TitleStyled = styled(({ animate, delay, ...rest }) => <span {...rest} />).withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !filteredProps.includes(prop) && defaultValidatorFn(prop),
})`
    display: inline-block;
    margin: 0 2px;
    animation: ${bounceAnimation} 0.5s forwards;
    animation-delay: ${props => props.delay}s;
    animation-iteration-count: 1;
    font-size: 48px;
    color: #fff;
`;

const Title = ({ text, delay }) => {
    const letters = text.split('');
    return (
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>
            {letters.map((letter, index) => (
                <TitleStyled key={index} style={{ animationDelay: `${delay + index * 0.1}s` }}>
                    {letter}
                </TitleStyled>
            ))}
        </h1>
    );
};

const SubTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin-top: 40px;
    text-align: center;
`;

const Paragraph = styled.p`
    font-size: 18px;
    color: #666;
    line-height: 1.6;
    max-width: 800px;
    text-align: center;
    margin-bottom: 20px;
`;

const Aboutus = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <IntroContainer>
            <TitleBackground>
                <Title text="About Us" delay={0} />
            </TitleBackground>
            <SubTitle>마카롱에 오신 것을 환영합니다.</SubTitle>
            <Paragraph>
                마카롱은 자동차 소유자와 구매 예정자를 위한 AI 기반의 편리한 서비스를 제공합니다.
                사용자는 마카롱을 이용해 <br/>현재 위치에서 1km 이내의 주유소, 서비스 센터, 주차장, 세차장 등
                자동차 관련 시설을 손쉽게 찾을 수 있습니다. <br/>AI 챗봇을 활용해 자동차 관련 질문에 신속하고
                정확한 답변을 받으며, 다양한 차량의 제원과 성능을 조회하여 <br/>정보 기반 구매 결정을 지원합니다.
                또한, 사용자들이 경험과 정보를 공유할 수 있는 커뮤니티 기능도 제공됩니다.
            </Paragraph>
            <SubTitle>주변 시설 검색</SubTitle>
            <Paragraph>
                마카롱을 통해 사용자들은 현재 위치 반경 1km 이내의 주유소, 서비스 센터, 주차장, 세차장 등과 같은 <br/>자동차 관련 시설을 손쉽게 찾아볼 수 있습니다.
                이를 통해 긴 여정을 떠날 때나 긴급한 상황에서 <br/>필요한 시설을 빠르게 찾을 수 있습니다.
            </Paragraph>
            <SubTitle>AI 챗봇 기능</SubTitle>
            <Paragraph>
                마카롱에는 AI 챗봇 기능이 탑재되어 있습니다. 사용자들은 어떠한 자동차 관련 질문이든지 AI 챗봇에게 물어볼 수 있습니다.
                챗봇은 신속하고 정확한 답변을 제공하여 사용자들의 궁금증을 해소해 줍니다.
            </Paragraph>
            <SubTitle>자동차 커뮤니티</SubTitle>
            <Paragraph>
                마카롱의 커뮤니티 기능은 사용자들이 자동차 관련 경험과 정보를 서로 공유할 수 있는 공간을 제공합니다. <br/>
                커뮤니티 공간인 모두의차고에서는 차량 유지관리 팁, 추천 서비스 센터, 주행 경험 등 다양한 주제로 <br/>활발한 토론이 이루어집니다.
            </Paragraph>
            <SubTitle>자동차 제원 조회</SubTitle>
            <Paragraph>
                자동차 구매를 고려하는 사용자들은 마카롱을 활용하여 다양한 차량의 상세 제원을 쉽게 확인할 수 있습니다. <br/>
                AI가 제공하는 정밀한 성능 정보를 통해, 사용자는 보다 깊이 있는 선택을 할 수 있습니다.
            </Paragraph>
        </IntroContainer>
    );
};

export default Aboutus;
