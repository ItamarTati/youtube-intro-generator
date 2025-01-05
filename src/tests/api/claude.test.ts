import { fetchClaudeIntro } from '../../api/claude';

global.fetch = jest.fn();

describe('fetchClaudeIntro', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('sends a POST request with the correct payload', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ intro: 'Claude intro' }),
        });

        const script = 'Test script';
        const result = await fetchClaudeIntro(script);

        expect(fetch).toHaveBeenCalledWith('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ script }),
        });
        expect(result).toBe('Claude intro');
    });

    it('throws an error if the API call fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API error'));

        await expect(fetchClaudeIntro('Test script')).rejects.toThrow('API error');
    });
});