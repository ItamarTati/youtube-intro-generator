import { fetchCohereIntro } from '../../api/cohere';

global.fetch = jest.fn();

describe('fetchCohereIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Cohere intro' }),
        });

        const script = 'Test script';
        const result = await fetchCohereIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/cohere', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Cohere intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchCohereIntro('Test script')).rejects.toThrow('API error');
    });
});