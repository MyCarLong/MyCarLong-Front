import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Axios import

const FormContainer = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f2f5;
`;

const TextInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  color: #666;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const IconContainer = styled.label`
  margin-right: 10px;
  cursor: pointer;
`;

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => setText(e.target.value);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      alert("올바른 파일 형식을 선택하세요. (jpg, png, gif)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      submitComment(text, file);
    } else {
      onAddComment(text);
    }
    setText("");
    setFile(null);
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TextInput type="text" placeholder="텍스트를 입력하세요." value={text} onChange={handleTextChange} />
      <IconContainer htmlFor="file-input">
        <FontAwesomeIcon icon={faImage} size="lg" />
        <FileInput id="file-input" type="file" onChange={handleFileChange} />
      </IconContainer>
      <SubmitButton type="submit">Post</SubmitButton>
    </FormContainer>
  );
};

const submitComment = async (text, file) => {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('file', file);

  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await axios.post( BASE_URL + '/api/comments', formData, { //http://localhost:8092
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Server Response:', response);
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
