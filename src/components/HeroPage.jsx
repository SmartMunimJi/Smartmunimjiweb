import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const auth = JSON.parse(savedAuth);
      if (auth.isLoggedIn) {
        navigate(auth.userType === 'seller' ? '/dashboard' : '/navbar');
      }
    }
  }, [navigate]);

  return (
    <div
      className="container-fluid text-white py-5"
      style={{
        background: "linear-gradient(180deg, #5e1e68, #d0473a)",
        minHeight: "100vh",
        width: "100%"
      }}
    >
      <div className="row align-items-center justify-content-between px-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold" style={{marginLeft:"120px"}}>SMART <br /> MUNIM JI</h1>
          <p className="lead mt-3" style={{ marginLeft: "2px" }}>
            Your Personal Record Keeper – Anytime, Anywhere!
          </p>
          <br />
          <button 
            className="btn btn-warning fw-bold px-4 py-2" 
            onClick={() => navigate('/login')} 
            style={{
              padding: "0px 25px",
              border: "none",
              marginLeft: "150px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Get Started
          </button>
          <br />
          <p className="mt-3" style={{ marginLeft: "140px" }}>STORE, VERIFY, TRUST</p>
        </div>

        <div className="col-md-5 position-relative text-center">
          <img
            src="Logo1.png"
            alt="Munim Ji"
            className="img-fluid"
            style={{ maxHeight: "530px" }}
          />

          <button 
            className="position-absolute btn btn-light p-3"
            style={{ top: '10%', left: '10%',width:"50px",height:"50px" }}
            type="button"
          >
            <i className="bi bi-clipboard-data fs-4 text-dark"></i>
          </button>

          <button 
            className="position-absolute btn btn-light p-3"
            style={{ top: '50%', left: '5%',width:"50px",height:"50px" }}
            type="button"
          >
            <i className="bi bi-check2-square fs-4 text-dark"></i>
          </button>

          <button 
            className="position-absolute btn btn-light p-3"
            style={{ bottom: '30%', right: '10%',width:"50px",height:"50px" }}
            type="button"
          >
            <i className="bi bi-lock-fill fs-4 text-dark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;