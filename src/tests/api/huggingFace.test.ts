import { callHuggingFaceGenerateIntro } from '../../api/huggingFace';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('callHuggingFaceGenerateIntro', () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });

    it('should return the generated intro text on a successful API response', async () => {
        const mockPrompt = 'This is a test prompt';
        const mockResponse = {
            intro: 'This is the Hugging Face-generated intro text.',
        };

        fetchMock.mockResponseOnce(
            JSON.stringify(mockResponse), 
            { status: 200 }
        );

        const result = await callHuggingFaceGenerateIntro(mockPrompt);

        expect(result).toBe('This is the Hugging Face-generated intro text.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://itamartati1.pythonanywhere.com/huggingface-generate-intro',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ prompt: `Write a catchy YouTube intro from the following video script: ${mockPrompt}` }),
            })
        );
    });

    it('should handle cases where no generated text is returned', async () => {
        const mockPrompt = 'Generate an intro for a video script';
        const mockResponse = {};

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

        const result = await callHuggingFaceGenerateIntro(mockPrompt);

        expect(result).toEqual({ error: 'Error: Cannot read property \'intro\' of undefined' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from the API gracefully', async () => {
        const mockResponse = {
            error: 'Failed to generate intro with Hugging Face',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 });

        const result = await callHuggingFaceGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Error: Failed to generate intro with Hugging Face' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors gracefully', async () => {
        const mockPrompt = 'Generate an intro for a video script';

        fetchMock.mockRejectOnce(new Error('Network error'));

        const result = await callHuggingFaceGenerateIntro(mockPrompt);

        expect(result).toEqual({ error: 'Network error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should handle unexpected errors gracefully', async () => {
        fetchMock.mockResponseOnce(() => {
            throw new Error('Unexpected server error');
        });

        const result = await callHuggingFaceGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Unexpected server error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});