import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { FaPaperPlane } from "react-icons/fa";


const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(-45deg, #e0e0e0, #c0c0c0, #e0e0e0, #c0c0c0);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const ChatBox = styled.div`
  max-width: 400px;
  width: 100%;
  min-height: 600px;
  max-height: 600px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const NavBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  padding: 10px 15px;
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 10px;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  min-width: 30%;
  max-width: 60%;
  word-wrap: break-word;
  background-color: ${(props) => 
  props.sender === "user" ? "#ffff99" : "#f0f0f0"};
  align-self: ${(props) =>
  props.sender === "user" ? "flex-end" : "flex-start"};
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("/images/manager.png");
  background-color: rgba(255, 192, 203, 0.5);
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 15px;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  &:before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-top: 2px solid rgba(0, 95, 246, 0.2);
    border-right: 2px solid #0095f6;
    animation: ${spin} 1s linear infinite;
  }
`;

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); 

  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    setMessages([
      {
        text: "차에 대해 궁금한 것이 있나요? 저희가 모든 질문에 답해 드릴게요!",
        sender: "gpt",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const newMessage = { text: inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    try {
      setLoading(true); 
      const response = await axios.post("http://localhost:5000/exp/chat", {
        text: inputText,
      });
      const responseData = response.data;
      if (responseData && responseData.message) {
        const gptMessage = responseData.message;
        const gptResponse = { text: gptMessage, sender: "gpt" };
        setMessages((prevMessages) => [...prevMessages, gptResponse]);
      }
    } catch (error) {
      console.error("Error while fetching response from server:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to fetch response from server.", sender: "gpt" },
      ]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Container>
      <ChatBox>
        <NavBar>MyCarLong - with ChatGPT 4.0</NavBar>
        <MessageContainer>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display:
                  "flex",
                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              {msg.sender === "gpt" && <ProfileImage />}
              <Message sender={msg.sender}>{msg.text}</Message>
            </div>
          ))}
        </MessageContainer>
        {loading && <Loading />} 
        <div
          style={{
            padding: "10px",
            display: "flex",
            borderTop: "1px solid #ccc",
          }}
        >
          <input
            type="text"
            placeholder="텍스트를 입력하세요."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            ref={inputRef}
            style={{
              flexGrow: 1,
              marginRight: "10px",
              padding: "10px 10px 10px 20px", 
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#e8e8e8",
              fontSize: "0.9em",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 15px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
            }}
          >
            <FaPaperPlane />
          </button>
        </div>
      </ChatBox>
    </Container>
  );
}

export default ChatApp;
