import { fetchChatGPTIntro } from '../../api/chatgpt';

global.fetch = jest.fn();

describe('fetchChatGPTIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'ChatGPT intro' }),
        });

        const script = 'Test script';
        const result = await fetchChatGPTIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/chatgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('ChatGPT intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchChatGPTIntro('Test script')).rejects.toThrow('API error');
    });
});