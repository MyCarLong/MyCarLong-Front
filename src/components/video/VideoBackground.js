import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0;
  animation: fadeIn 2s ease-out forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const VideoBackground = ({ triggerUri }) => {
    const videoRef = useRef(null);
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const handleVideoEnd = () => {
            setIsEnded(true);
        };

        video.addEventListener('ended', handleVideoEnd);

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    useEffect(() => {
        if (isEnded) {
            // 비디오가 반복 재생된 후에 일시 중지되도록 설정
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
            }, 30000); // 일시 중지를 적용할 시간 (밀리초 단위)
        }
    }, [isEnded]);

    useEffect(() => {
        if (triggerUri === '/') {
            // 홈 화면이 시작 화면인 경우, 비디오를 다시 재생
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        }
    }, [triggerUri]);

    return (
        <VideoContainer>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src="/videos/main_video-4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </VideoContainer>
    );
};

export default VideoBackground;
