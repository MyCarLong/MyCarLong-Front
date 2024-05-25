import React, { useState ,useEffect} from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button as MuiButton, Typography } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios'; // Axios 라이브러리 추가
import ReactCardFlip from 'react-card-flip';
import CommentForm from '../comment/CommentForm';
import CommentMain from '../comment/CommentMain';
import {BeatLoader} from 'react-spinners';
import * as v from './CardViewStyle';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    width: 90%;
    height: 85%;
    background: #f0f0f0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 12px; /* Y축 스크롤바의 너비 설정 */
        height: 12px; /* X축 스크롤바의 높이 설정 */
    }

    &::-webkit-scrollbar-track {
        background: rgba(240, 240, 240, 0.07); /* 스크롤바 트랙 배경색 */
        border-radius: 10px; /* 둥글게 만들기 */
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(136, 136, 136, 0.51); /* 스크롤바 핸들 색상 */
        border-radius: 10px; /* 둥글게 만들기 */
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(119, 143, 155, 0.7); /* 스크롤바 핸들 색상 (호버시) */
    }
    ///* Firefox */
    //scrollbar-width: thin; /* 스크롤바 두께 설정 */
    //scrollbar-color: #888888 #F0F0F0; /* 스크롤바 색상 설정 (핸들, 트랙) */
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

const StyledButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #78909C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.7s ease-in-out;

    &:hover {
        background-color: #B0BEC5;
    }
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const CardContainer = styled.div`
    width: 550px;
    margin-right: 30px;
`;

const CommentContainer = styled.div`
    flex: 1;
    transition: opacity 0.5s ease;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
`;

const BackTable = styled.table`
    border: 1px #a39485 solid;c
    font-size: .9em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
`;
const BackTableTh =styled.th`
    text-align: left;
    padding: 1em .5em;
    vertical-align: middle;
    text-indent: 2em;
`;
const BackTableThead =styled.thead`
    font-weight: bold;
    color: #fff;
    background: #73685d;
`;
const BackTableTd = styled.td`
    padding: 1em 2em;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #fff;
`;

const CommentEnd = styled.div`
    height: 10px;
`;

function VehicleGarage() {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [articles , setArticles] = useState([]);
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
        const koreanRegex = /^[가-힣]+$/;
        const intRegex = /^[0-9]+$/;
        if (!model || !year) {
            setError('모델명과 연식을 모두 입력하여 주세요.');
        } else if (!koreanRegex.test(model)) {
            setError('모델명은 한글만 입력하여 주세요.');
            return;
        } else if (!intRegex.test(year)) {
            setError('연식은 숫자만 입력하여 주세요.');
            return;
        }
        setError('');
        setVehicles(null);
        setLoading(true);
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const response = await axios.get(BASE_URL + `/car/info?model=${model}&year=${year}`)//, {model: model, year: year });
            // Handle response if needed
            if (response.data && response.status === 200) {
                parameterCheck(response, model, year)
                mainImageUpdate(response);
                setCategory(model+"_"+year);
                console.log(response.data);
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

    

    const parameterCheck = (response, model, year) => {
        if (response.data.parameters.model !== model) {
            setError("파라미터로 입력한 모델이 응답의 모델과 일치하지 않습니다.")
            return;
        } else if (response.data.parameters.year !== year) {
            setError("파라미터로 입력한 연식이 응답의 연식과 일치하지 않습니다.")
            return;
        }
    };
    const mainImageUpdate = (response) => {
        let imgUrl = response.data.imgURL;
        // let resModel = response.data.parameters.model;
        let resModel = response.data.information.boxCheck;
        let resYear = response.data.parameters.year;
        const backContent = response.data.information;

        // response.data
        setVehicles([{
            id: 1,
            model: resModel,
            year: resYear,
            image: imgUrl,
            info: '',
            isFlipped: false,
            backContent: backContent
        }])
    };

    const handleWrite = () => {
        setShowForm(!showForm);
    };

    const handleCardFlip = (id, event) => {
        if (event.target.tagName !== "BUTTON") {
            setVehicles(vehicles.map(vehicle => {
                if (vehicle.id === id) {
                    return { ...vehicle, isFlipped: !vehicle.isFlipped };
                } else {
                    return vehicle;
                }
            }));
        }
    };

    const toggleCommentVisibility = () => {
        setCommentVisible(!commentVisible);
        loadByCategory(category);
        console.log(category);
        console.log(articles);
    };

    const loadByCategory = async(category) => {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        try {
            const response = await axios.get(`${BASE_URL}/board/article?category=${category}`);
            if (response.data && response.status === 200) {
                // console.log(response.data);
                setArticles(response.data.articleList);
            } else {
                setError(`status: ${response.status}, info: ${response.data.msg}`);
            }
        } catch (error) {
            console.error(error);
            setError(`An error occurred: ${error.message}`);
        }
    };

    const backView = (data) => {
        return (
            <BackTable>
                <BackTableThead>
                <tr>
                    <BackTableTh>구분</BackTableTh>
                    <BackTableTh>내용</BackTableTh>
                </tr>
                </BackTableThead>
                <tbody>
                {Object.entries(data).map(([key, value]) =>
                    (
                        <tr key={key}>
                            <BackTableTd>{key==="boxCheck" ? "차종" :  key}</BackTableTd>
                            <BackTableTd>{value}</BackTableTd>
                        </tr>
                    )
                )}
                </tbody>
            </BackTable>
        )
    };
    function cardViews(vehicles) {

        return(

            <MainContent>
                <CardContainer>
                    {vehicles.map(vehicle => (
                        <ReactCardFlip key={vehicle.id} isFlipped={vehicle.isFlipped}>
                            <Card key="front" onClick={(event) => handleCardFlip(vehicle.id, event)}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={vehicle.image}
                                        alt={vehicle.model}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {vehicle.model} - {vehicle.year}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {vehicle.info}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <MuiButton size="small" color="primary" onClick={handleWrite}>
                                        글작성
                                    </MuiButton>
                                    <MuiButton size="small" color="primary" onClick={toggleCommentVisibility}>
                                        글보기
                                    </MuiButton>
                                </CardActions>
                            </Card>
                            <Card key="back" onClick={(event) => handleCardFlip(vehicle.id, event)}>
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {backView(vehicle.backContent)}
                                        {/*Back content*/}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ReactCardFlip>
                    ))}
                    {showForm && <CommentForm category={category} loadByCategory={loadByCategory}/>}
                </CardContainer>
                <CommentContainer visible={commentVisible}>
                    <CommentMain articles={articles.filter(article => article.category == category)} category={category}/>
                    <CommentEnd/>
                </CommentContainer>
            </MainContent>
        );
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
                <StyledButton type="submit">조회</StyledButton>
            </Form>
            {loading ? (
                <v.LoadingContainer>
                    <BeatLoader color="#007bff" loading={loading}/>
                    <v.LoadingText>API가 정보를 가져오고 있어요.(3~10초)</v.LoadingText>
                </v.LoadingContainer>
            ) : (
                <>
                    {error && <v.AlertMessage>{error}</v.AlertMessage>}
                    {vehicles && cardViews(vehicles)}
                </>
            )}
        </Container>
    );
}

export default VehicleGarage;