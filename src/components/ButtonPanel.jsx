import React from 'react';
import AccordionButton from './AccordionButton';

const ButtonPanel = () => {
  const buttons = ['+ Add Record', '📄 View Records', '📁 My Claims'];
  return (
    <div className="button-panel">
      {buttons.map((label, idx) => (
        <AccordionButton key={idx} label={label} />
      ))}
    </div>
  );
};

export default ButtonPanel;