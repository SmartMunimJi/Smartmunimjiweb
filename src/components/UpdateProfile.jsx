// src/components/UpdateProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    setUser({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    alert('Profile updated successfully!');
    navigate('/profile'); // Redirect to profile page after update
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #5e1e68, #d0473a)',
        minHeight: '100vh',
        padding: '2rem',
        color: 'black',
      }}
    >
      <div
        className="container bg-white p-4 rounded shadow-lg"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <h3 className="mb-4 text-center" style={{ color: '#5e1e68' }}>
          Profile
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              value={user.address}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: '#9b26af',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
            }}
          >
            EDIT PROFILE
          </button>
          <button
            type="button"
            className="btn w-100"
            style={{
              backgroundColor: '#9b26af',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '5px',
            }}
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;