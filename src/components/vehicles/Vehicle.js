import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { MdDirectionsCar, MdInfo } from 'react-icons/md';
import SideNav from '../sidenav/SideNav';
import NavItem from '../sidenav/NavItem';
import ToggleButton from '../sidenav/ToggleButton';
import VehicleContent from '../content/VehicleContent';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Vehicle = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState('/images/vehicle-2.jpg'); 
  const [activeNav, setActiveNav] = useState('/vehicle');

  const navItems = [
    { path: '/vehicle', image: '/images/vehicle-2.jpg', text: '모두의차고', icon: <MdDirectionsCar /> }, 
    { path: '/vehicledetail', image: '/images/vehicle_info.jpg', text: 'AI차량제원', icon: <MdInfo /> },
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
      <VehicleContent activeNav={activeNav} />
    </Container>
  );
};

export default Vehicle;
