import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header-container text-center py-3">
      <img
        src="/src/assets/Logo1.png"
        alt="Smart Munim Ji"
        className="munimji-img mb-2"
      />
      <h1 className="smart-heading">SmartMunimJi</h1>
    </div>
  );
};

export default Header;