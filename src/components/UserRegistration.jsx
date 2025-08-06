import React, { useState } from 'react';
import {Modal , Button} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreed) {
      alert("You must agree to the Terms and Conditions to register.");
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    try {
      await authService.registerUser({
        name: form.Name,
        email: form.emailAddress,
        password: form.password,
        phone: form.phoneNumber,
        address: form.address,
        profileImage
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className='page-bg' style={{
      background: "linear-gradient(180deg, #5e1e68, #d0473a)",
      minHeight: "100vh", width: "100%"
    }}>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="p-4 rounded-4 shadow-lg text-white" 
          style={{ width: "430px", borderRadius: "20px" }}>
          <h2 className="text-center mb-4">Customer Registration</h2>
          
          {success ? (
            <div className="alert alert-success text-center">
              Registration successful! Redirecting to login...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <div className="mb-3 text-center">
                <div 
                  className="mx-auto mb-2 rounded-circle overflow-hidden" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    cursor: 'pointer',
                    background: profileImage ? 'none' : 'rgba(255,255,255,0.2)',
                    border: '2px dashed rgba(255,255,255,0.5)'
                  }}
                  onClick={() => document.getElementById('profile-upload').click()}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile Preview" 
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                      <i className="bi bi-camera fs-1"></i>
                      <small>Add Photo</small>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="d-none"
                />
              </div>
              
              <div className="mb-3">
                <input 
                  name="Name" 
                  className="form-control form-control-lg" 
                  placeholder="Name" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="email" 
                  name="emailAddress" 
                  className="form-control form-control-lg" 
                  placeholder="Email Address" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  name="password" 
                  className="form-control form-control-lg" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="password" 
                  name="confirmPassword" 
                  className="form-control form-control-lg" 
                  placeholder="Confirm Password" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <input 
                  name="phoneNumber" 
                  className="form-control form-control-lg" 
                  placeholder="Phone Number" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              <div className="mb-3">
                <input 
                  name="address" 
                  className="form-control form-control-lg" 
                  placeholder="Address" 
                  onChange={handleChange} 
                  required 
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheckbox"
                  checked={agreed}
                  onChange={() => setShowModal(true)}
                />
                <label className="form-check-label" htmlFor="termsCheckbox" style={{ cursor: "pointer" }}>
                  I agree to the Terms and Conditions
                </label>
              </div>
              <button type="submit" className="btn btn-warning btn-lg w-100">Register</button>
            </form>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please read and agree to the terms and conditions before proceeding. You must accept these to register.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setAgreed(true);
            setShowModal(false);
          }}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserRegistration;