import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleOAuthGoogle = async (code) => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            // 구글로부터 받아온 code를 서버에 전달하여 구글로 회원가입 & 로그인한다
            const response = await axios.get(BASE_URL+ `/oauth/login/google?code=${code}`);
            // 응답 데이터에서 성공 여부 확인
            if (response.status === 200) {
                sessionStorage.setItem("provider","google");
                sessionStorage.setItem("isLoggedIn","true");
                sessionStorage.setItem("userRole","ROLE_USER");
                navigate("/success");
                window.location.reload();
                alert("구글 로그인을 완료했습니다.");
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
            handleOAuthGoogle(codeTest);
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

export default GoogleRedirectPage;