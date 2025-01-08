import { callGeminiGenerateIntro } from '../../api/gemini';
import fetchMock from 'jest-fetch-mock';
import { scriptPrompt } from '../../helpers'; 

fetchMock.enableMocks();

describe('callGeminiGenerateIntro', () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });

    it('should return the generated intro text on a successful API response', async () => {
        const mockPrompt = 'Generate an intro for a video script';
        const mockResponse = {
            intro: 'This is the generated intro text.',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await callGeminiGenerateIntro(mockPrompt);

        expect(result.intro).toBe('This is the generated intro text.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://itamartati1.pythonanywhere.com/gemini-generate-intro',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ prompt: `${scriptPrompt} ${mockPrompt}` }),
            })
        );
    });

    it('should handle errors from the API gracefully', async () => {
        const mockResponse = {
            error: 'Failed to generate intro with Gemini',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 });

        const result = await callGeminiGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Error: Failed to generate intro with Gemini' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors gracefully', async () => {
        const mockPrompt = 'Generate an intro for a video script';

        fetchMock.mockRejectOnce(new Error('Network error'));

        const result = await callGeminiGenerateIntro(mockPrompt);

        expect(result).toEqual({ error: 'Network error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle unexpected errors gracefully', async () => {
        fetchMock.mockResponseOnce(() => {
            throw new Error('Unexpected server error');
        });

        const result = await callGeminiGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Unexpected server error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});