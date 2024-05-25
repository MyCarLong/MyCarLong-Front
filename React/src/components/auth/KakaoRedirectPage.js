import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

// import CryptoJS from 'crypto-js';
// const SECRET_KEY = process.env.REACT_APP_NAME_SECRET_KEY;


const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleOAuthKakao = async (code) => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
            const response = await axios.get(BASE_URL+ `/oauth/login/kakao?code=${code}`);
            if(response.status === 200){
                sessionStorage.setItem("provider","kakao")
                sessionStorage.setItem("isLoggedIn","true")
                sessionStorage.setItem("userRole","ROLE_USER");

                // let nickname = CryptoJS.AES.encrypt(response.data.nickname, SECRET_KEY).toString();
                let nickname = response.data.nickname;
                sessionStorage.setItem("nickname",nickname);
                navigate("/success");
                window.location.reload();
                alert("카카오 로그인을 완료했습니다.");
            } else {
                alert("로그인 실패");
                navigate("/fail");
            }
        } catch (error) {
            alert("로그인 실패");
            navigate("/fail");
        } finally {
            setLoading(false); // 로딩 상태 변경
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const codeTest = encodeURIComponent(code);
        if (codeTest) {
            setLoading(true); // 로딩 상태 변경
            handleOAuthKakao(codeTest);
        }
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default KakaoRedirectPage;