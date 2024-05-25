import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: ${({ isOpen }) => isOpen ? '10px 0' : '15px 0'};
  display: flex;
  align-items: center;
  gap: ${({ isOpen }) => isOpen ? '10px' : '0'};
  justify-content: ${({ isOpen }) => isOpen ? 'start' : 'center'};
  width: 100%;
  transition: background-color 0.3s ease, color 0.5s ease;

  &:hover, &.active {
    color: gray;
    background-color: white;
    border-radius: 10px 0 0 10px;
  }
`;

export default NavItem;