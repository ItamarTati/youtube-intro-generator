import { callChatGPTGenerateIntro } from '../../api/chatgpt';
import fetchMock from 'jest-fetch-mock';
import { scriptPrompt } from '../../helpers'; 

fetchMock.enableMocks();

describe('callChatGPTGenerateIntro', () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });

    it('should return the generated intro text on a successful API response', async () => {
        const mockPrompt = 'Generate an intro for a video script';
        const mockResponse = {
            intro: 'This is the ChatGPT-generated intro text.',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await callChatGPTGenerateIntro(mockPrompt);

        expect(result).toBe('This is the ChatGPT-generated intro text.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://itamartati1.pythonanywhere.com/chatgpt-generate-intro',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({ prompt: `${scriptPrompt} ${mockPrompt}` }),
            })
        );
    });

    it('should return an error object when the API responds with an error', async () => {
        const mockResponse = {
            error: 'Failed to generate intro with ChatGPT',
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 500 });

        const result = await callChatGPTGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Error: Failed to generate intro with ChatGPT' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should return an error object for network errors', async () => {
        fetchMock.mockRejectOnce(new Error('Network error'));

        const result = await callChatGPTGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Network error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('should return an error object for unexpected errors', async () => {
        fetchMock.mockResponseOnce(() => {
            throw new Error('Unexpected server error');
        });

        const result = await callChatGPTGenerateIntro('Test prompt');

        expect(result).toEqual({ error: 'Unexpected server error' });
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});