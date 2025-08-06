import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileDropdown.css';

const SellerProfileDropdown = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="dropdown-menu show p-3 rounded-4 text-white"
      style={{
        background: 'linear-gradient(180deg, #5e1e68 0%, #d0473a 100%)',
        border: 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        width: '260px',
        height: '350px',
        marginLeft: '-200px',
      }}
    >
      <div className="mb-2">
        <small className="d-block">Logged in as</small>
        <strong>{user?.email}</strong>
      </div>
      <div className="mb-2">Hi, {user?.name}</div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

      <div
        className="dropdown-item text-white"
        style={{ cursor: 'pointer' }}
        onClick={() => handleNavigate('/add-record')}
      >
        Add Records
      </div>

      <div
        className="dropdown-item text-white"
        style={{ cursor: 'pointer' }}
        onClick={() => handleNavigate('/view-records')}
      >
        View Records
      </div>

      <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

      <div
        className="dropdown-item text-white"
        style={{ cursor: 'pointer' }}
        onClick={() => handleNavigate('/profile')}
      >
        My Profile
      </div>

      <div
        className="dropdown-item text-white"
        style={{ cursor: 'pointer' }}
        onClick={() => handleNavigate('/update-profile')}
      >
        Update Profile
      </div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      <div
        className="dropdown-item text-white"
        style={{ cursor: 'pointer' }}
        onClick={onLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default SellerProfileDropdown;