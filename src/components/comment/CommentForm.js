import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faUpload  ,faCheckCircl,fa1,fa2,fa3,fa4,fa5,faX} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Axios import

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const FileFrame = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FileRemover = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 10px;
  z-index: 3;
  &:hover{
    filter: invert(14%) sepia(79%) saturate(7057%) hue-rotate(2deg) brightness(101%) contrast(119%);
  }
`;
const FileThumb = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 10px;
  transition: all 0.5s ease-in-out;
  z-index: 2;
  &:hover{
    transform: scale(1.1);
  }
`;


const ThumbnailBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

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

function getIconForFileCount(files) {
  switch (files.length) {
    case 1:
      return <FontAwesomeIcon icon={fa1} size="lg" />;
    case 2:
      return <FontAwesomeIcon icon={fa2} size="lg" />;
    case 3:
      return <FontAwesomeIcon icon={fa3} size="lg" />;
    case 4:
      return <FontAwesomeIcon icon={fa4} size="lg" />;
    case 5:
      return <FontAwesomeIcon icon={faUpload} size="lg" />;
    default:
      return <FontAwesomeIcon icon={faImage} size="lg" />; // Default to fa1 if count is out of range
  }
}

const CommentForm = ({ category, loadByCategory }) => { // onAddComment,
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  // const [fileNum , setFileNum] = useState(0);
  // const [uploadedFiles, setUploadedFiles] = useState([]);  // 추가
  const [imgBase64, setImgBase64] = useState([]);
  const [nowCategory, setNowCategory] = useState(null);

  useEffect(() => {
    setNowCategory(category);
    console.log('commentForm category 확인! : ',category);
  }, [category]);

  const handleTextChange = (e) => setText(e.target.value);

  const handleFileChange = (event) => {
    const fileObjs = Array.from(event.target.files).map(file => ({
      file,
      base64: '',
    }));

    setFiles(fileObjs);

    fileObjs.forEach((fileObj, index) => {
      let reader = new FileReader();
      reader.readAsDataURL(fileObj.file);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setFiles(prevFiles => {
            const newFiles = [...prevFiles];
            newFiles[index].base64 = base64.toString();
            return newFiles;
          });
        }
      }
    });
  };

  const FileRemove = (removeItem, index) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      submitComment(category, text, files);
    } else {
      submitComment(category, text);
    }
    setText("");
    setFiles([]);
  };

  const validateFile = (file) => {
    if (!file) return false;
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(extension);
  };


  const submitComment = async (category,text, files) => {
    const formData = new FormData();
    const username = sessionStorage.getItem('nickname');

    formData.append('title', text.substring(0,5));
    formData.append('content', text);
    formData.append('author', username);
    formData.append('category',category);
    Array.from(files).forEach(file => {
      formData.append('imgFileList', file.file);
    });

    console.log('post 전 formData확인 :',formData);
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post( BASE_URL + '/board/article', formData, { //http://localhost:8092
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server Response:', response);
      loadByCategory(category);  // 글 작성 후 loadByCategory 함수를 호출하여 최신 상태를 반영
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


// CommentForm.propTypes = {
//   onAddComment: PropTypes.func.isRequired,
// };

  return (
      <InputArea>
      <FormContainer onSubmit={handleSubmit}>
        <TextInput type="text" placeholder="텍스트를 입력하세요." value={text} onChange={handleTextChange}/>
        <IconContainer htmlFor="file-input">
          {getIconForFileCount(files)}
          <FileInput id="file-input" type="file" multiple onChange={handleFileChange}/>
        </IconContainer>
        <SubmitButton type="submit">Post</SubmitButton>
      </FormContainer>
        <ThumbnailBox>
          {files.map((fileObj, index) => {
            return (
                <FileFrame key={index}>
                  <FileThumb src={fileObj.base64} alt="Thumbnail" />
                  <FileRemover src='./images/x-solid.png' onClick={() => FileRemove(fileObj, index)} />
                </FileFrame>
            )
          })}
        </ThumbnailBox>
      </InputArea>
  );
};


export default CommentForm;