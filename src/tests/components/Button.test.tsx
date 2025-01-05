import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../components/Button';

describe('Button Component', () => {
    it('renders a button', () => {
        render(<Button onClick={() => {}} />);
        const button = screen.getByTestId('generate-button');
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const mockOnClick = jest.fn();
        render(<Button onClick={mockOnClick} />);
        const button = screen.getByTestId('generate-button');

        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('disables the button when `disabled` is true', () => {
        render(<Button onClick={() => {}} disabled />);
        const button = screen.getByTestId('generate-button');
        expect(button).toBeDisabled();
    });
});