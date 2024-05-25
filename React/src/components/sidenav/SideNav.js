import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SideNav = styled.div`
  width: ${({ isOpen }) => isOpen ? '200px' : '50px'};
  background: ${({ image }) => `url(${image}) center center / cover no-repeat, rgba(0, 0, 0, 0.5)`};
  background-blend-mode: overlay;
  transition: width 0.3s ease-in-out, background 0.5s ease-in-out;
  color: white;
  padding: ${({ isOpen }) => isOpen ? '20px' : '20px 10px'};
  display: flex;
  flex-direction: column;
  align-items: ${({ isOpen }) => isOpen ? 'flex-start' : 'center'};
  animation: ${fadeIn} 0.5s;
`;

export default SideNav;