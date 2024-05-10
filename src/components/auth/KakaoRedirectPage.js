import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleOAuthKakao = async (code) => {
        try {
            // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
            const response = await axios.get(`http://localhost:8080/oauth/login/kakao?code=${code}`);
            if(response.status === 200){
                localStorage.setItem("provider","kakao")
                localStorage.setItem("isLoggedIn","true")
                localStorage.setItem("userRole","ROLE_USER");
                alert("카카오 로그인을 완료했습니다.");
                navigate("/success");
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