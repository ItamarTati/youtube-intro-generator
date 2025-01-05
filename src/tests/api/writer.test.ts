import { fetchWriterIntro } from '../../api/writer';

global.fetch = jest.fn();

describe('fetchWriterIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Writer intro' }),
        });

        const script = 'Test script';
        const result = await fetchWriterIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/writer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Writer intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchWriterIntro('Test script')).rejects.toThrow('API error');
    });
});