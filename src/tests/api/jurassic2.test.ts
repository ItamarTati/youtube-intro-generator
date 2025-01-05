import { fetchJurassic2Intro } from '../../api/jurassic2';

global.fetch = jest.fn();

describe('fetchJurassic2Intro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Jurassic 2 intro' }),
        });

        const script = 'Test script';
        const result = await fetchJurassic2Intro(script);

        expect(fetch).toHaveBeenCalledWith('/api/jurassic2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Jurassic 2 intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchJurassic2Intro('Test script')).rejects.toThrow('API error');
    });
});