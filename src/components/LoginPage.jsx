import React, { useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationModal from './RegistrationModal';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const profilesKey = userType === 'seller' ? 'sellerProfiles' : 'customerProfiles';
    const allProfiles = JSON.parse(localStorage.getItem(profilesKey)) || [];
    
    const userExists = allProfiles.some(
      profile => profile.email?.toLowerCase() === email.toLowerCase()
    );

    if (!userExists) {
      setError(`This email is not registered as a ${userType}. Please register first.`);
      return;
    }

    const userProfile = allProfiles.find(
      profile => profile.email?.toLowerCase() === email.toLowerCase()
    );
    
    if (userProfile.password !== password) {
      setError('Incorrect password.');
      return;
    }

    onLogin(email, userType, rememberMe, userProfile?.profileImage);
  };

  return (
    <div className="page-bg d-flex justify-content-center align-items-center" style={{
      background: "linear-gradient(180deg, #5e1e68, #d0473a)",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="login-card p-4 rounded-4 shadow-lg text-white text-center" 
        style={{ 
          width: "430px", 
          maxWidth: "90%", 
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
        <h2 className="fw-bold mb-4">SmartMunimJi</h2>
        
        <div className="d-flex justify-content-center mb-3">
          <button 
            className={`btn ${userType === 'customer' ? 'btn-warning' : 'btn-outline-warning'} me-2`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button 
            className={`btn ${userType === 'seller' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setUserType('seller')}
          >
            Seller
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={userType === 'seller' ? "Seller Email" : "Email"}
            className="form-control form-control-lg mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control form-control-lg mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="form-check mb-3 text-start">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold">
            {userType === 'seller' ? "SELLER LOGIN" : "CUSTOMER LOGIN"}
          </button>
        </form>

        <p className="mt-3 text-white">
          Don't have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'yellow' }}
            onClick={() => setShowModal(true)}
          >
            Register Here
          </span>
        </p>
      </div>

      <RegistrationModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        userType={userType}
      />
    </div>
  );
};

export default LoginPage;