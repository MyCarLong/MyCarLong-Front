import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../../App.css'; 

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  background: #f0f0f0;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background: white;
`;

const InputSection = styled.div`
  flex: 1;  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableSection = styled.div`
  flex: 3;  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px; 
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  margin-bottom: 10px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);

  &:hover, &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.2), 0 0 8px rgba(0,123,255,0.6);
  }
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 12px 20px;
  font-size: 18px;
  color: white;
  background-color: #007bff; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease;  // 부드러운 전환 효과 적용

  &:hover {
    background-color: #003885; 
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.1);  
  }
`;

const Table = styled.table`
  width: 100%;  
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Thead = styled.thead`
  background-color: #007bff;
  color: #ffffff;
`;

const Tbody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-top: 1px solid #dee2e6;
`;

function VehicleDetail() {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
<<<<<<< HEAD
<<<<<<< HEAD
      event.preventDefault();
      setError('');
      try {
          const response = await axios.post('http://localhost:5000/api/vehicle', { model, year });
          setVehicle(response.data);
      } catch (error) {
          console.error('차량 데이터를 불러오는 중 오류 발생:', error);
          setError('데이터를 불러오는데 실패했습니다. 다시 시도해 주세요.');
      }
    };
  
=======
=======
>>>>>>> e425f9f (save)
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/api/vehicle', { model, year });
            setVehicle(response.data);
        } catch (error) {
            console.error('Error fetching vehicle data:', error);
            setError('Failed to fetch data. Please try again.');
        }
    };

<<<<<<< HEAD
>>>>>>> e425f9f (save)
=======
>>>>>>> e425f9f (save)
    return (
        <Container>
            <ContentArea>
                <form onSubmit={handleSearch}> 
                    <InputSection>
                        <Input type="text" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
                        <Input type="text" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
<<<<<<< HEAD
<<<<<<< HEAD
                        <Button type="submit">조회</Button> 
=======
                        <Button type="submit">Search</Button> 
>>>>>>> e425f9f (save)
=======
                        <Button type="submit">Search</Button> 
>>>>>>> e425f9f (save)
                        {error && <p>{error}</p>}
                    </InputSection>
                </form>
                <TableSection>
                    <TransitionGroup component={null}>
                        {vehicle ? (
                            <CSSTransition key={vehicle.id} timeout={500} classNames="fade">
                                <Table>
                                    <Thead>
                                        <tr>
                                            <Th>모델명</Th>
                                            <Th>가격</Th>
                                            <Th>엔진</Th>
                                            <Th>변속기</Th>
                                            <Th>연비</Th>
                                        </tr>
                                    </Thead>
                                    <Tbody>
                                        <tr>
                                            <Td>{vehicle.model}</Td>
                                            <Td>{vehicle.price}</Td>
                                            <Td>{vehicle.engine}</Td>
                                            <Td>{vehicle.transmission}</Td>
                                            <Td>{vehicle.mpg}</Td>
                                        </tr>
                                    </Tbody>
                                </Table>
                            </CSSTransition>
                        ) : (
                            <CSSTransition timeout={500} classNames="fade">
                                <p>Loading vehicle data...</p>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </TableSection>
            </ContentArea>
        </Container>
    );
}

export default VehicleDetail;
