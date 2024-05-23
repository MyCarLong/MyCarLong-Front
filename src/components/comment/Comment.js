import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const CommentContainer = styled.div`
  width: 800px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const PostDate = styled.span`
  color: #777;
`;

const ImageContainer = styled.div`
  width: 90px;
  height: 90px;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  &._image{
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.5s ease;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  vertical-align: top;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const EnlargedImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: opacity 1.5s ease; 
  opacity: ${({ enlarged }) => (enlarged ? "1" : "0")}; 
  z-index: ${({ enlarged }) => (enlarged ? "1" : "-1")}; 
`;

const EnlargedImage = styled.img`
  width: 1000px;
  max-height: 700px;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const CommentText = styled.p`
  margin-top: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  padding: 5px;
  margin-right: 10px;
`;

const PostButton = styled(Button)`
  color: #666;
`;

const ReplyContainer = styled.div`
  margin-left: 15px;
  margin-top: 10px;
`;

const InputForm = styled.form`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const TextInput = styled.input`
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Reply = ({ reply }) => (
  <ReplyContainer>
    <UserProfile>
      <Username>{reply.author}</Username>
      <PostDate>{reply.regTime}</PostDate>
    </UserProfile>
    <CommentText>{reply.content}</CommentText>
  </ReplyContainer>
);
const BASE_URL= process.env.REACT_APP_BASE_URL;


// 이미지 데이터를 로드하는 함수
async function loadImageData(imageName) {
  return axios.get(BASE_URL + `/image/${imageName}`)
      .then(response => {
        const imageUrl = response.data;
        return imageUrl;
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        return null; // 에러 발생 시 null 반환
      });
}

// 이미지를 렌더링하는 컴포넌트
function ImageComponent({ imageName, onImageClick }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    loadImageData(imageName).then(setImageUrl);
  }, [imageName]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }
  console.log(imageName);
//${process.env.REACT_APP_CDN_URL}/${imageName}
  return (
      <Image
          className="_image"
          src={imageUrl}
          alt="Loaded from API"
          onClick={() => {
            console.log('Image URL:', imageUrl);  // 로깅 추가
            onImageClick(imageUrl);
          }}
      />
  );
};



const Comment = ({ article }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [nowArticle , setNowArticle] = useState(null);

    const getLoggedInUserName = () => {
    const username = sessionStorage.getItem("nickname");
    if (username) {
      console.log('유저네임!!',username);
      setLoggedInUserName(username);
    }
  };

  useEffect(() => {
    getLoggedInUserName();
    setNowArticle(article);
    console.log('article은',article);
    console.log('nowarticle은',nowArticle);
  }, [article]);
  useEffect(() => {
    if (showReplies) {
      loadReplies();
    }
  }, [nowArticle, showReplies]);

  const toggleReplies = () => setShowReplies(!showReplies);
  const toggleCommentForm = () => setShowCommentForm(!showCommentForm);
  const handleTextChange = (e) => setReplyText(e.target.value);
  //댓글작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('author', loggedInUserName);
      formData.append('content', replyText);

      const response = await axios.post(`${BASE_URL}/board/article/${nowArticle.articleId}/reply`, formData);
      console.log("댓글이 성공적으로 전송되었습니다.");
      console.log("댓글확인.",response);
      setReplyText("");
      loadReplies();  // 댓글 작성 후 댓글 목록 다시 로드
    } catch (error) {
      console.error("댓글 전송 중 오류가 발생했습니다.", error);
    }
  };

  const enlargeImage = (imageUrl) => {
    console.log(imageUrl);
    setEnlargedImage(imageUrl);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const [replies, setReplies] = useState([]);
  //댓글 로드
  const loadReplies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/board/article/${nowArticle.articleId}/reply`);
      if (response.status === 200) {
        setReplies(response.data.replyFormDtoList);
        console.log("댓글이 성공적으로 로드되었습니다.");
      } else {
        console.error("댓글 로드 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("요청 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    if (nowArticle && nowArticle.articleId) {
      loadReplies();
    }
  }, [nowArticle]);

  const imageView= async(imageSevedName)=> {
    try{

      const response = await axios.get(`${BASE_URL}/image/${imageSevedName}`);
      if (response.data && response.status === 200) {
        return response.data
      } else {
        setError(`status: ${response.status}, info: ${response.data.msg}`);
      }
    } catch (error) {
      console.error(error);
      setError(`An error occurred: ${error.message}`);
    }
  };

  const timeCutting= (regTime)=> {
    let date = new Date(regTime);
    // 날짜를 필요한 형식으로 문자열로 변환
    let formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  return (
    <CommentContainer>
      <UserProfile>
        <Username>{article.author}</Username>
        <PostDate>{timeCutting(article.regTime)}</PostDate>
      </UserProfile>
      <ImagesWrapper>
        {article.articleImageList &&
            article.articleImageList.map((articleImage) => (
                <ImageContainer key={articleImage.id}>
                  <ImageComponent imageName={articleImage.imageSavedName} onImageClick={enlargeImage}/>
                  <ImageOverlay />
                </ImageContainer>
            ))}
      </ImagesWrapper>
      <CommentText>{article.content}</CommentText>
      <ButtonContainer>
        <Button onClick={toggleReplies}>댓글보기</Button>
        <Button onClick={toggleCommentForm}>댓글작성</Button>
      </ButtonContainer>
      {showCommentForm && (
        <InputForm onSubmit={handleSubmit} key={article.id}>
          <Username>{loggedInUserName}</Username>
          <TextInput
            placeholder="댓글을 입력하세요"
            value={replyText}
            onChange={handleTextChange}
          />
          <PostButton type="submit">Post</PostButton>
        </InputForm>
      )}
      {/*{showReplies && (*/}
      {/*  <ReplyContainer>*/}
      {/*    {article.articleReplyList &&*/}
      {/*      article.articleReplyList.map((reply, index) => <Reply key={index} reply={reply} />)}*/}
      {/*  </ReplyContainer>*/}
      {/*)}*/}
      {showReplies && (
          <ReplyContainer>
            {replies.map((reply, index) => <Reply key={index} reply={reply} />)}
          </ReplyContainer>
      )}
      <EnlargedImageContainer enlarged={enlargedImage !== null}>
        {enlargedImage && (
          <>
            <EnlargedImage src={enlargedImage} />
            <CloseButton onClick={closeEnlargedImage}>X</CloseButton>
          </>
        )}
      </EnlargedImageContainer>
    </CommentContainer>
  );
};

export default Comment;
