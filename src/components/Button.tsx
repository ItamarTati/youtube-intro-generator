import React from 'react';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        data-testid="generate-button"
    >
        Generate Intro
    </button>
);

export default Button;