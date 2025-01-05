import React from 'react';

interface InputBoxProps {
    onInputChange: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onInputChange }) => (
    <textarea
        placeholder="Paste your video script here..."
        onChange={(e) => onInputChange(e.target.value)}
        data-testid="script-input"
    />
);

export default InputBox;