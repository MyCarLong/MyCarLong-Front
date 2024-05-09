import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleOAuthGoogle = async (code) => {
        try {
            const response = await axios.get(`http://localhost:8080/oauth/login/google?code=${code}`);
            // 응답 데이터에서 성공 여부 확인
            if (response.status === 200) {
                localStorage.setItem("provider","google")
                localStorage.setItem("isLoggedIn","true")
                localStorage.setItem("userRole","ROLE_USER");
                alert("구글 로그인을 완료했습니다.");
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
