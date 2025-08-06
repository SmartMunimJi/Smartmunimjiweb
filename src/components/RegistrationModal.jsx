import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div 
      className="modal-backdrop d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1050,
        backdropFilter: 'blur(3px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white p-4 rounded text-center"
        style={{ minWidth: '300px' }}
        onClick={e => e.stopPropagation()}
      >
        <h5 className="mb-3" style={{ color: '#5e1e68' }}>Select Registration Type</h5>
        
        <div className="d-flex flex-column">
          <button 
            className="btn btn-warning m-2 fw-bold"
            onClick={() => {
              navigate('/register-user');
              onClose();
            }}
            style={{ padding: '10px 20px' }}
          >
            Customer
          </button>
          
          <button 
            className="btn btn-warning m-2 fw-bold"
            onClick={() => {
              navigate('/register-seller');
              onClose();
            }}
            style={{ padding: '10px 20px' }}
          >
            Seller
          </button>
        </div>
        
        <button 
          className="btn btn-danger mt-3 px-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RegistrationModal;