import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './assets/styles/GlobalStyles';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import VideoBackground from './components/video/VideoBackground';
import Slogan from './components/slogan/Slogan';
import ChatApp from "./components/chatgpt/ChatApp";
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './routes/PrivateRoute';
import MyPage from './components/auth/MyPage';
import PasswordEntry from './components/auth/PasswordEntry';
import Nearby from './components/nearby/Nearby';
import Aboutus from './components/aboutus/Aboutus';
import Start from './components/start/Start'; 
import Vehicle from './components/vehicles/Vehicle'; 
import KakaoRedirectPage from "./components/auth/KakaoRedirectPage";
import NaverRedirectPage from "./components/auth/NaverRedirectPage";

function App() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []); 

  const isAuthenticated = true; 

  return (
    <Router>
      <GlobalStyles />
      <Header />
      {loading && <Start />} 
      {!loading && ( 
        <>
          <VideoBackground />
          <Slogan />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path= "/oauth/redirected/kakao" element={<KakaoRedirectPage />}/>
            <Route path= "/oauth/redirected/naver" element={<NaverRedirectPage />}/>
            <Route path="/chatapp" element={<PrivateRoute element={<ChatApp />} isAuthenticated={isAuthenticated} />} />
            <Route path="/vehicles" element={<PrivateRoute element={<Vehicle />} isAuthenticated={isAuthenticated} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
            <Route path="/mypage" element={<PrivateRoute element={<PasswordEntry />} isAuthenticated={isAuthenticated} />} />
            <Route path="/userinfo" element={<PrivateRoute element={<MyPage />} isAuthenticated={isAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;