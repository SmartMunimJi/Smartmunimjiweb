import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerProfileDropdown from './SellerProfileDropdown';
import '../styles/Dashboard.css';
import munimCharacter from '../assets/Logo1.png';

const DashboardPage = ({ userEmail, userName, profileImage, onLogout,}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('auth');
    if (!userData || !JSON.parse(userData).isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="dashboard-bg">
      <div className="top-bar">
        <div className="user-info">
          <h1 className="dashboard-title">
            Hello, {userName || 'User'} <span className="wave">👋</span>
          </h1>
        </div>
        <div className="profile-section" ref={dropdownRef}>
          <div className="profile-icon" onClick={toggleDropdown}>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} 
              />
            ) : (
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#5e1e68',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {userName?.split(' ').map((w) => w[0]).join('').toUpperCase()}
              </div>
            )}
          </div>
          {showDropdown && (
            <div style={{ 
              position: 'absolute', 
              right: 50, 
              top: '60px',
              zIndex: 1000
            }}>
              <SellerProfileDropdown
                user={{ email: userEmail, name: userName }}
                onLogout={() => {
                  onLogout();
                  setShowDropdown(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="character-and-buttons">
        <div className="dashboard-buttons-column">
          <div className="dashboard-buttons-row">
            <button
              className="dashboard-btn"
              onClick={() => navigate('/add-record')}
            >
              + Add Record
            </button>
            <button
              className="dashboard-btn"
              onClick={() => navigate('/view-records')}
            >
              👁 View Records
            </button>
          </div>
          <div className="dashboard-buttons-single" style={{ marginLeft: '180px' }}>
            <button
              className="dashboard-btn"
              onClick={() => navigate('/my-claims')}
            >
              📄 My Claims
            </button>
          </div>
        </div>
        <div className="character-image">
          <img src={munimCharacter} alt="Munim Ji" className="fixed-character" style={{height:"480px"}} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;