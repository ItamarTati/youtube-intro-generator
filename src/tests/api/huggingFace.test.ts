import { fetchHuggingFaceIntro } from '../../api/huggingFace';

global.fetch = jest.fn();

describe('fetchHuggingFaceIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Hugging Face intro' }),
        });

        const script = 'Test script';
        const result = await fetchHuggingFaceIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/huggingFace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Hugging Face intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchHuggingFaceIntro('Test script')).rejects.toThrow('API error');
    });
});