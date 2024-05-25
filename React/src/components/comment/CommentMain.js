import React, {useEffect, useState} from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import * as v from '../vehicles/CardViewStyle'
import axios from 'axios';


function CommentMain(props) {

  const [articles, setArticles] = useState([]);
  const [nowCategory ,setNowCategory] = useState();
  const [error, setError] = useState('');
  // const initCategories =()=> {setNowCategory(category);};
  // const initArticles =()=> {setArticles(loadByCategory(nowCategory));};
  // initArticles();
  // console.log('카테고리', props.category);
  // console.log('아티클스',props.articles);
  useEffect(() => {
    setNowCategory(props.category);
    setArticles(props.articles);
  }, [props.category, props.articles]);

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError('');
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [error]);
  useEffect(() => {
    loadByCategory(props.category);
  }, [props.category]);
  
  function initArticles () {
    setNowCategory(props.category);

  };

  const loadByCategory = async(category) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    try {
      const response = await axios.get(`${BASE_URL}/board/article?category=${category}`);
      if (response.data && response.status === 200) {
        // console.log(response.data);
        setArticles(response.data.articleList);
      } else {
        setError(`status: ${response.status}, info: ${response.data.msg}`);
      }
    } catch (error) {
      console.error(error);
      setError(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    loadByCategory(nowCategory);
  }, [nowCategory]);


  const registArticle = async(event)=>{
    event.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(BASE_URL+`/board/article`);
    setError('');
    if (response.data && response.status === 200) {
      setArticles(response.data.articleList);
    }else{
      setError("status : ",response.status, "info : ", response.data.msg)
    }
  };
  //
  // const deleteArticle = async(event)=>{
  //   event.preventDefault();
  //   const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const response = await axios.delete(BASE_URL+`/board/article/${articleId}`);
  //   setError('');
  //   if (response.status === 200) {
  //     setArticles(response.data.articleList);
  //   }else{
  //     setError("status : ",response.data.code, "info : ", response.data.msg)
  //   }
  // }
  // const updateArticle = async(event)=>{
  //   event.preventDefault();
  //   const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const response = await axios.put(BASE_URL+`/board/article/${articleId}`,articleId, data);
  //   setError('');
  //   if (response.status === 200) {
  //     setArticles(response.data.articleList);
  //   }else{
  //     setError("status : ",response.data.code, "info : ", response.data.msg)
  //   }
  // }


  const handleAddArticle = (text, file) => {
    registArticle(text,file);
    const newArticle = {
      id: articles.length + 1,
      username: "newUser",
      postDate: new Date().toISOString(),
      text: text,
      replies: [],
    };
    setArticles([...articles, newArticle]);
  };
  //
  // const listGenerator = (articles) =>{
  //   if(!articles){
  //   {articles.map((article) => (
  //       <Comment key={article.id} comment={article} />
  //   )
  //   }
  // }

  return (
    <div style={{ width: "500px" }}>
      {error && <v.AlertMessage>{error}</v.AlertMessage>}
      {articles && articles.map((article) => (
          <Comment key={article.id} article={article}  />
      ))}
    </div>
  );
};

export default CommentMain;
