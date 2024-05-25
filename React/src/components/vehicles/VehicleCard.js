import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import {BeatLoader} from 'react-spinners';
import * as v from './CardViewStyle';

function VehicleCard() {
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [VehicleCard, setVehicleCard] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [writeField, setWriteField] = useState(false);



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
            return;
        }else if (!koreanRegex.test(model)){
            setError('모델명은 한글만 입력하여 주세요.');
            return;
        }else if (!intRegex.test(year)){
        setError('연식은 숫자만 입력하여 주세요.');
        return;
    }

        setError('');
        setVehicleCard(null);
        setLoading(true);

        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const response = await axios.get(BASE_URL+ `/car/info?model=${model}&year=${year}`);//, {model, year});
            if (response.data && response.status === 200) {
                // console.log("타입확인 ! : ",typeof  response);
                parameterCheck(response, model,year);
                setVehicleCard(response.data);
                // console.log(response.data);
                // console.log(response);
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

    const parameterCheck(response , model , year) {
        if(response.data.parameters.model!=model){
            setError("파라미터로 입력한 모델이 응답의 모델과 일치하지 않습니다.")
            return;
        }else if(response.data.parameters.year!=year) {
            setError("파라미터로 입력한 연식이 응답의 연식과 일치하지 않습니다.")
            return;
        }
    }

    const toggleWriteField = () => {
        setWriteField(!writeField);
    };

    useEffect(() => {
        setWriteField(true);
        return () => setWriteField(false);
    }, []);
      
    

    function responsePaser(data) {
        
        return (
           
        <v.MainCont>
         <v.MyCard class="card" id="myCard">
             <v.ImgFrame>
                <v.MainImage  src={data.imgURL} alt="Image"/>
             </v.ImgFrame>
                <div class="card-content">
                    <v.ModelandYear>{data.parameters.model} {data.parameters.year}</v.ModelandYear>
                </div>
                <v.ButtonBox class="card-buttons">
                    <v.InBoxButton onClick={toggleWriteField}>글쓰기</v.InBoxButton>
                    <v.InBoxButton onClick="toggleContent()">글 목록 보기</v.InBoxButton>
                </v.ButtonBox>
         </v.MyCard>
        {writeField && (
            <v.WriteField className={`extra-content ${writeField ? 'active' : ''}`} id="extraContent">
                <v.ArticleForm onSubmit="submitAct()">
                    <v.TitleAndFile>
                        <label htmlFor="title"/>
                        <input type="text" id="title" name="title"/>
                        <v.FileInputs className="filebox">
                            <v.InputThumb className="upload-name" value="첨부파일" placeholder="첨부파일"/>
                            <v.FileLabel for ="file">파일찾기</v.FileLabel>
                            <v.Fileshide type="file" id="file"/>
                        </v.FileInputs>
                    </v.TitleAndFile>
                    <v.ContentAndInput>
                        <v.ContentInput type="text" id="title" name="title" col="10"/>
                        <v.RegButton onclick="toggleContent()">등록</v.RegButton>
                    </v.ContentAndInput>
                </v.ArticleForm>
            </v.WriteField>
        )}
        </v.MainCont>


        )
    }

    return (
        <v.Container>
            <v.Form onSubmit={handleSearch}>
                <v.Input
                    type="text"
                    placeholder="모델명"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                <v.Input
                    type="text"
                    placeholder="연식"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <v.Button type="submit">조회</v.Button>
            </v.Form>
            {loading ? (
                <v.LoadingContainer>
                    <BeatLoader color="#007bff" loading={loading}/>
                    <v.LoadingText>API가 정보를 가져오고 있어요.(3~10초)</v.LoadingText>
                </v.LoadingContainer>
            ) : (
                <>
                    {error && <v.AlertMessage>{error}</v.AlertMessage>}
                    {VehicleCard && responsePaser(VehicleCard)}
                </>
            )}
        </v.Container>
    );
}

export default VehicleCard;