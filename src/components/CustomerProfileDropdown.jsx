import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileDropdown.css';

const CustomerProfileDropdown = ({ userEmail, userName, profileImage, onLogout, onProfileUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(userName);

  useEffect(() => {
    setEditedName(userName);
  }, [userName]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!userName) return '?';
    const parts = userName.split(' ');
    return parts
      .filter(part => part.length > 0)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');
  };

  const handleSaveProfile = () => {
    onProfileUpdate({ userName: editedName });
    setEditMode(false);
  };

  return (
    <div className="dropdown position-relative" ref={dropdownRef}>
      <button 
        className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center overflow-hidden" 
        style={{ width: '40px', height: '40px' }}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {profileImage ? (
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <span className="fw-bold">{getInitials()}</span>
        )}
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-menu show position-absolute end-0 mt-2 shadow" 
          style={{ 
            minWidth: '220px', 
            zIndex: 10002,
            background: 'linear-gradient(135deg, #6a3093, #d04444)',
            border: 'none',
            borderRadius: '10px'
          }}
        >
          <div className="px-3 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            {editMode ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button 
                  className="btn btn-sm btn-success me-2"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <small className="text-white d-block">Logged in as</small>
                <strong className="text-truncate d-block text-white">{userEmail}</strong>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="text-white">Hi, {userName}</span>
                  <button 
                    className="btn btn-sm btn-outline-light"
                    onClick={() => setEditMode(true)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="py-2">
            <Link 
              className="dropdown-item d-flex align-items-center text-white" 
              to="/add-product"
              onClick={() => setIsOpen(false)}
              style={{ padding: '8px 15px' }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Product
            </Link>
            
            <Link 
              className="dropdown-item d-flex align-items-center text-white" 
              to="/view-products"
              onClick={() => setIsOpen(false)}
              style={{ padding: '8px 15px' }}
            >
              <i className="bi bi-list-check me-2"></i>
              View Products
            </Link>
            
            <div className="dropdown-divider my-1" style={{ borderColor: 'rgba(255,255,255,0.2)' }}></div>
            
            <Link 
              className="dropdown-item d-flex align-items-center text-white" 
              to="/profile"
              onClick={() => setIsOpen(false)}
              style={{ padding: '8px 15px' }}
            >
              <i className="bi bi-person-circle me-2"></i>
              My Profile
            </Link>
            
            <Link 
              className="dropdown-item d-flex align-items-center text-white" 
              to="/settings"
              onClick={() => setIsOpen(false)}
              style={{ padding: '8px 15px' }}
            >
              <i className="bi bi-gear me-2"></i>
              Settings
            </Link>
          </div>
          
          <div className="dropdown-divider my-1" style={{ borderColor: 'rgba(255,255,255,0.2)' }}></div>
          
          <button 
            className="dropdown-item d-flex align-items-center text-white" 
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            style={{ padding: '8px 15px', color: '#ffcc00 !important' }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerProfileDropdown;