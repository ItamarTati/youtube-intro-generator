// import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from '../../components/InputBox';

describe('InputBox Component', () => {
    it('renders a textarea', () => {
        render(<InputBox onInputChange={() => {}} />);
        const textarea = screen.getByTestId('script-input');
        expect(textarea).toBeInTheDocument();
    });

    it('updates the value when typing', () => {
        const mockOnInputChange = jest.fn();
        render(<InputBox onInputChange={mockOnInputChange} />);
        const textarea = screen.getByTestId('script-input');

        fireEvent.change(textarea, { target: { value: 'Test script' } });
        expect(mockOnInputChange).toHaveBeenCalledWith('Test script');
    });
});