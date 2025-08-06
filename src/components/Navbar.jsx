import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferSlider from './OfferSlider';
import CustomerProfileDropdown from './CustomerProfileDropdown';

const Navbar = ({ userEmail, userName, profileImage, onLogout, onProfileUpdate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{
      background: "linear-gradient(180deg, #5e1e68, #d0473a)",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      paddingTop: "20px"
    }}>
      <nav 
        className="navbar navbar-expand-lg navbar-dark" 
        style={{ 
          position: 'relative',
          zIndex: 10001
        }}
      >
        <div className="container">
          <Link className="navbar-brand fw-light" to="/">
            SMARTMUNIM JI
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/homepage">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/techupdate">Tech Update</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/offerslider">OfferSlider</Link>
              </li>
            </ul>
            
            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex align-items-center me-3">
                <span className="text-white d-none d-md-block">
                  Hi, {userName}
                </span>
              </li>
              <li className="nav-item">
                <CustomerProfileDropdown 
                  userEmail={userEmail} 
                  userName={userName} 
                  profileImage={profileImage}
                  onLogout={onLogout} 
                  onProfileUpdate={onProfileUpdate}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ 
        position: 'relative',
        top: '15px',
        width: '100%',
        zIndex: 10000
      }}>
        <OfferSlider />
      </div>
    </div>
  );
};

export default Navbar;