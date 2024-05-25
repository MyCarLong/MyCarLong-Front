import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Pretendard 폰트를 가져옵니다. */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
  }

  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      color: #0056b3;
    }
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #333;
    font-family: 'Pretendard-Regular', sans-serif; 
    margin-top: 0;
  }

  button {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyles;
