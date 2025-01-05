import { fetchBardIntro } from '../../api/bard';

global.fetch = jest.fn();

describe('fetchBardIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Bard intro' }),
        });

        const script = 'Test script';
        const result = await fetchBardIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/chatgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Bard intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchBardIntro('Test script')).rejects.toThrow('API error');
    });
});