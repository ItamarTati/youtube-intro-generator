import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false }) => (
  <button className="generate-intro-button" onClick={onClick} disabled={disabled} data-testid="generate-button">
    {disabled ? 'Generating...' : 'Generate Intro'}
  </button>
);

export default Button;