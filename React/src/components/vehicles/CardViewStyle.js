import styled ,{ keyframes } from 'styled-components';

export const MainCont = styled.div`
    display: block;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: #f0f0f0;
  height: 80%;
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const TextDisplay = styled.div`
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
    color: #333;
    line-height: 1.5;
    font-size: 18px;
    text-align: left;
    white-space: pre-wrap;
`;

export const AlertMessage = styled(TextDisplay)`
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
  animation: fadeInOut 2s forwards;

  @keyframes fadeInOut {
    0% { opacity: 1; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const LoadingText = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #007bff;
`;

export const Table = styled.table`
  width: 80%;
  height: auto;
  border-collapse: collapse;
  margin-top: 10px;
  overflow-y: auto; 
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: 1px solid #ddd;
  text-align: center;

  &:first-child {
    width: 20%;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;

  &:first-child {
    width: 20%;
  }
`;

//FIXME: MAIN IMAGE SIZE CONTROL
export const MainImage = styled.img`
    width: 500px;
    border-radius:5px;
`;
export const ImgFrame = styled.div`
    display: flex;
    justify-content: center;
`;
export const ModelandYear = styled.p`
    font-size: 28px;
    font-weight: 600;
    text-align: left;
    padding: 15px 25px 0px;
    margin: 0;
`;

export const MyCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 550px;
    border-radius: 10px;
    background-color: #fff;
    padding: 5px;
`;
export const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    margin-right: 50px;
    margin-bottom: 5px;
`;
export const InBoxButton = styled.button`
    margin: 0px 10px 0px 10px;
    background-color: rgb(47, 53, 80);
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 14px;
`;

// export const WriteField = styled.div`
//     max-height: 0;
//     justify-content: column;
//     padding: 10px;
//     border-radius: 5px;
//     border: none;
//     background-color: #d7d7d7;
//     transition: max-height 0.5s, transform 0.5s;
//     transform: translateY(-100%);
//
//     &.active {
//         max-height: 200px; /* 이 값을 실제 필드의 높이로 설정하세요 */
//         transform: translateY(0);
//     }
// `;


export const WriteField = styled.div`
    overflow: hidden;
    justify-content: column;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #d7d7d7;
    order: 1;
    animation: ${props => props.active ? slideOut : slideIn} 2s ease-in-out forwards;
    
    
    &.slideIn {
        animation: slideIn 2s ease-in-out forwards;
    }

    &.slideOut {
        animation: slideOut 2s ease-in-out forwards;
    }

`;

const slideIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;
export const ArticleForm = styled.form`
    padding: 5px;
`;
export const TitleAndFile = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const FileInputs = styled.div`
    display: flex;
    justify-content: right;
`;
export const ContentAndInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    margin: 0px;
`;
export const ContentInput = styled.textarea`
    width: 82.5%;
    margin-top: 10px;
    resize: none;
`;
export const RegButton = styled.button`
    margin-top: 10px;
    padding: 0px 24px;
    background-color: rgb(47, 53, 80);
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 16px;
`;

export const Fileshide = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
`;

export const FileLabel = styled.label`
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    margin-left: 10px;
`;

export const InputThumb = styled.input`
    display: inline-block;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 50%;
    color: #999999;
`;



