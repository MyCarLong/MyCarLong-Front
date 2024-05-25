import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHome, FiList, FiTool, FiSettings, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import SideNav from '../sidenav/SideNav';
import NavItem from '../sidenav/NavItem';
import ToggleButton from '../sidenav/ToggleButton';
import DashboardContent from '../content/DashboardContent';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState('/images/dashboard.jpg'); 
  const [activeNav, setActiveNav] = useState('/dashboard');

  const navItems = [
    { path: '/dashboard', image: '/images/dashboard.jpg', text: '대시보드', icon: <FiHome /> },
    { path: '/vehiclelist', image: '/images/vehicle-1.jpg', text: '내차리스트', icon: <FiList /> },
    { path: '/maintenance', image: '/images/maintenance-1.jpg', text: '정비', icon: <FiTool /> },
    { path: '/settings', image: '/images/setting-1.jpg', text: '설정', icon: <FiSettings /> }
  ];

  const handleNavClick = (path, image, event) => {
    event.preventDefault();
    setSelectedImage(image);
    setActiveNav(path);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Container>
      <SideNav isOpen={isOpen} image={selectedImage}>
        {navItems.map(item => (
          <NavItem
            key={item.path}
            to={item.path}
            className={activeNav === item.path ? 'active' : ''}
            isOpen={isOpen}
            onClick={(e) => handleNavClick(item.path, item.image, e)}
          >
            {item.icon} {isOpen && item.text}
          </NavItem>
        ))}
        <ToggleButton onClick={toggleSidebar}>
          {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
        </ToggleButton>
      </SideNav>
      <DashboardContent activeNav={activeNav} />
    </Container>
  );
};

export default Dashboard;
