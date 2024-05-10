import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TextDisplay = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  width: 80%;
  max-width: 800px;
  color: #333;
  line-height: 1.5;
  font-size: 18px;
  text-align: left;
  white-space: pre-wrap; 
`;

const AlertMessage = styled(TextDisplay)`
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
  animation: fadeInOut 2s forwards;

  @keyframes fadeInOut {
    0% { opacity: 1; }
    50% { opacity: 1; }
    100% { opacity: 0; }
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
  color: #007bff;
`;

const Table = styled.table`
  width: 80%;
  height: auto;
  border-collapse: collapse;
  margin-top: 10px;
  overflow-y: auto; 
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: 1px solid #ddd;
  text-align: center;

  &:first-child {
    width: 20%;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;

  &:first-child {
    width: 20%;
  }
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

    setError('');
    setVehicleDetails(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/vehicle', { model, year });
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
          <BeatLoader color="#007bff" loading={loading} />
          <LoadingText>AI가 정보를 가져오고 있어요.(3~10초)</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          {error && <AlertMessage>{error}</AlertMessage>}
          {vehicleDetails && (
            <Table>
              <thead>
                <tr>
                  <TableHeader>구분</TableHeader>
                  <TableHeader>내용</TableHeader>
                </tr>
              </thead>
              <tbody>
                {Object.entries(vehicleDetails).map(([key, value]) => (
                  <tr key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
}

export default VehicleDetail;