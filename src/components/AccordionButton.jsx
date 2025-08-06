import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccordionButton = ({ label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (label.includes('+ Add Record')) navigate('/add-record');
    else if (label.includes('View Records')) navigate('/view-records');
    else if (label.includes('My Claims')) navigate('/my-claims');
  };

  return (
    <div className="button-wrapper">
      <button
        className="btn btn-gradient"
        onClick={handleClick}
        style={{ height: '70px', width: '200px', borderRadius: '15px' }}
      >
        {label}
      </button>
    </div>
  );
};

export default AccordionButton;