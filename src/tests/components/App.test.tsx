import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { callGeminiGenerateIntro, callChatGPTGenerateIntro, callClaudeGenerateIntro, callHuggingFaceGenerateIntro } from '../../api';

jest.mock('../../api'); 

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

    it('calls API services and updates the results list when the button is clicked', async () => {
        const mockResponse = {
            intro: 'This is a sample intro from Gemini.',
        };

        (callGeminiGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callChatGPTGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callClaudeGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callHuggingFaceGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);

        render(<App />);

        const textarea = screen.getByTestId('script-input');
        const button = screen.getByTestId('generate-button');

        fireEvent.change(textarea, { target: { value: 'Test script' } });
        fireEvent.click(button);

        await waitFor(() => screen.getByText('Gemini'));

        const resultRows = screen.getAllByRole('row');
        expect(resultRows).toHaveLength(5); // 4 intros + 1 header row

        expect(screen.getByText('Gemini')).toBeInTheDocument();
        expect(screen.getByText('ChatGPT')).toBeInTheDocument();
        expect(screen.getByText('Claude')).toBeInTheDocument();
        expect(screen.getByText('Hugging Face')).toBeInTheDocument();
        expect(screen.getByText('This is a sample intro from Gemini.')).toBeInTheDocument();
    });

    it('displays loading state when button is clicked', async () => {
        const mockResponse = {
            intro: 'This is a sample intro from Gemini.',
        };

        (callGeminiGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callChatGPTGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callClaudeGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);
        (callHuggingFaceGenerateIntro as jest.Mock).mockResolvedValue(mockResponse);

        render(<App />);

        const textarea = screen.getByTestId('script-input');
        const button = screen.getByTestId('generate-button');

        fireEvent.change(textarea, { target: { value: 'Test script' } });
        fireEvent.click(button);

        expect(screen.getByText('Loading... Generating intros from APIs...')).toBeInTheDocument();
    });

    it('displays error message when no script is provided', async () => {
        render(<App />);

        const button = screen.getByTestId('generate-button');
        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith('Please paste a script!');
    });

    it('handles API error responses gracefully', async () => {
        const errorResponse = { error: 'Failed to generate intro' };

        (callGeminiGenerateIntro as jest.Mock).mockResolvedValue(errorResponse);
        (callChatGPTGenerateIntro as jest.Mock).mockResolvedValue(errorResponse);
        (callClaudeGenerateIntro as jest.Mock).mockResolvedValue(errorResponse);
        (callHuggingFaceGenerateIntro as jest.Mock).mockResolvedValue(errorResponse);

        render(<App />);

        const textarea = screen.getByTestId('script-input');
        const button = screen.getByTestId('generate-button');

        fireEvent.change(textarea, { target: { value: 'Test script' } });
        fireEvent.click(button);

        await waitFor(() => screen.getByText('Gemini'));

        expect(screen.getByText('Failed to generate intro')).toBeInTheDocument();
    });
});