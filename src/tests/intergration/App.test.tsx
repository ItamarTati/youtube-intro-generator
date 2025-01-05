import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

describe('App Integration', () => {
    it('renders Button, InputBox, and ResultsList components', () => {
        render(<App />);
        const button = screen.getByTestId('generate-button');
        expect(button).toBeInTheDocument();
        const textarea = screen.getByTestId('script-input');
        expect(textarea).toBeInTheDocument();
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
    });
});