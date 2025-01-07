import { callClaudeGenerateIntro } from '../../api/claude';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('callClaudeGenerateIntro', () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });

    it('should return the generated intro text on a successful API response', async () => {
        const mockPrompt = 'Generate an intro for a video script';
        const mockResponse = {
            intro: 'This is the Claude-generated intro text.',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await callClaudeGenerateIntro(mockPrompt);

        expect(result).toBe('This is the Claude-generated intro text.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://itamartati1.pythonanywhere.com/claude-generate-intro',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ prompt: 'Write a catchy YouTube intro from the following video script: Generate an intro for a video script' }),
            })
        );
    });

    it('should return an error object when the API responds with an error', async () => {
        const mockResponse = {
            error: 'Failed to generate intro with Claude',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 });

        const result = await callClaudeGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Error: Failed to generate intro with Claude' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors gracefully', async () => {
        const mockPrompt = 'Generate an intro for a video script';

        fetchMock.mockRejectOnce(new Error('Network error'));

        const result = await callClaudeGenerateIntro(mockPrompt);

        expect(result).toEqual({ error: 'Network error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle unexpected errors gracefully', async () => {
        fetchMock.mockResponseOnce(() => {
            throw new Error('Unexpected server error');
        });

        const result = await callClaudeGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Unexpected server error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});