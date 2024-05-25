import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import {BeatLoader} from 'react-spinners';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: #f0f0f0;
  height: 80%;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 10px;
    margin-right: 10px;
    border: 2px solid #78909C;
    border-radius: 5px;
    color: #78909C;
    font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #78909C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
      background-color: #B0BEC5;
  }
`;

const TextDisplay = styled.div`
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 50%;
    max-width: 500px;
    color: #333;
    line-height: 1.5;
    font-size: 18px;
    text-align: center;
    white-space: pre-wrap;
`;

const AlertMessage = styled(TextDisplay)`
    background-color: #78909C;
    color: white;
    border-color: #f5c6cb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const fadeInTable = keyframes`
    from {
        visibility: hidden;
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
`;

const Table = styled.table`
  width: 80%;
  height: auto;
  border-collapse: collapse;
  margin-top: 10px;
    overflow-y: auto;
    animation: ${fadeInTable} 1.5s ease-out forwards;
    visibility: hidden;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #78909C;
  color: white;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: 300;
  &:first-child {
    width: 20%;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
    color: #78909C;
    font-weight: 100;
  &:first-child {
    width: 20%;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const LoadingText = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #607D8B;
`;

function VehicleDetail() {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [error]);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!model || !year) {
            setError('모델명과 연식을 모두 입력하여 주세요.');
            return;
        }
        const currentYear = new Date().getFullYear();
        if (year < 2000 || year > currentYear) {
            return;
        }

        setError('');
        setVehicleDetails(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/exp/vehicle', {model, year});
            if (response.data && response.status === 200) {
                setVehicleDetails(response.data.vehicleSpecs);
            } else {
                setError('차량 정보를 찾을 수 없습니다. 입력 정보를 확인해 주세요.');
            }
        } catch (err) {
            console.error('차량 데이터 조회 오류:', err);
            setError('데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };


    function responsePaser(jsonString) {
        // // 필요한 키
        // var keys = ["차량설명", "가격", "연료", "연비", "제조사", "차종" , "안전 등급",
        //     "엔진", "변속기", "변속기", "토크" , "전장" , "전폭" ,"전고", "축거", "공차중량" ,"승차인원"
        //     ,"트렁크 용량", "서스펜션" , "브레이크", "타이어" , "주요 편의사양", "주요 안전사양"];
        // jsonString = JSON.stringify(jsonString);
        // // 정규식 패턴 (": " 뒤에 오는 값 추출)
        // const pattern = /: "(.*?)"/g;
        // // 추출된 값을 저장할 객체
        // const extractedValues = {};
        // // JSON 문자열 반복 처리
        // for (const key of keys) {
        //     const match = jsonString.match(pattern);
        //     console.log(match);
        //     if (match && match[1]) {
        //         extractedValues[key] = match[1];
        //     }
        // }
        // console.log(extractedValues);


        return (
            <Table>
                <thead>
                <tr>
                    <TableHeader>구분</TableHeader>
                    <TableHeader>내용</TableHeader>
                </tr>
                </thead>
                <tbody>
                {Object.entries(jsonString).map(([key, value]) =>
                    (
                        <tr key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{value}</TableCell>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        )
    }

    return (
        <Container>
            <Form onSubmit={handleSearch}>
                <Input
                    type="text"
                    placeholder="모델명"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="연식"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <Button type="submit">조회</Button>
            </Form>
            {loading ? (
                <LoadingContainer>
                    <BeatLoader color="#007bff" loading={loading}/>
                    <LoadingText>AI가 정보를 가져오고 있어요.(3~10초)</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    {error && <AlertMessage>{error}</AlertMessage>}
                    {vehicleDetails && responsePaser(vehicleDetails)}
                </>
            )}
        </Container>
    );
}

export default VehicleDetail;