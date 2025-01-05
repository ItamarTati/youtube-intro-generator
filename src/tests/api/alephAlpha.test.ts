import { fetchAlephAlphaIntro } from '../../api/alephAlpha';

global.fetch = jest.fn();

describe('fetchAlephAlphaIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'AlephAlpha intro' }),
        });

        const script = 'Test script';
        const result = await fetchAlephAlphaIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/chatgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('AlephAlpha intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchAlephAlphaIntro('Test script')).rejects.toThrow('API error');
    });
});