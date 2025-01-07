import { formatIntro, formatErrorMessage } from '../../helpers';

describe('formatIntro', () => {
  it('should remove markdown-like symbols', () => {
    const intro = '**Voiceover (energetic, slightly sarcastic tone):** Ever wondered how some people manage to outsmart natural selection... spectacularly?';
    const formattedIntro = formatIntro(intro);

    expect(formattedIntro).toBe('Voiceover (energetic, slightly sarcastic tone): Ever wondered how some people manage to outsmart natural selection... spectacularly?');
  });

  it('should add line breaks after sentences', () => {
    const intro = '**Voiceover:** Ever wondered how some people manage to outsmart natural selection... spectacularly? **Voiceover:** This is where the survival instinct takes a holiday, and common sense goes on a permanent vacation.';
    const formattedIntro = formatIntro(intro);

    expect(formattedIntro).toBe(
      'Voiceover: Ever wondered how some people manage to outsmart natural selection... spectacularly?\n' +
      'Voiceover: This is where the survival instinct takes a holiday, and common sense goes on a permanent vacation.'
    );
  });

  it('should handle edge cases like empty strings or no markdown', () => {
    const intro = '';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe('');

    const introNoMarkdown = 'Just a simple intro sentence without any markdown.';
    const formattedNoMarkdown = formatIntro(introNoMarkdown);
    expect(formattedNoMarkdown).toBe('Just a simple intro sentence without any markdown.');
  });
});

describe('formatErrorMessage', () => {
    it('should return a quota exceeded error message for quota-related issues', () => {
        const result = formatErrorMessage('ChatGPT', 'Error: You exceeded your current quota, please check your plan.');
        expect(result).toBe('ChatGPT Error: Your API quota has been exceeded. Please check your plan and billing details.');
    });

    it('should return an insufficient credit balance error message', () => {
        const result = formatErrorMessage('Hugging Face', 'Error: Your credit balance is low.');
        expect(result).toBe('Hugging Face Error: You don\'t have enough quota for this request. Please upgrade your plan.');
    });

    it('should return an input too long error message for Hugging Face input length issue', () => {
        const result = formatErrorMessage('Hugging Face', 'Hugging Face Error: validation - Input validation error: `inputs` tokens + `max_new_tokens` must be <= 1024');
        expect(result).toBe('Hugging Face Error: The input text is too long. Please shorten it and try again.');
    });

    it('should return a generic error message for unknown errors', () => {
        const result = formatErrorMessage('ChatGPT', 'Error: Some unknown issue occurred');
        expect(result).toBe('ChatGPT Error: An unexpected issue occurred. Please contact admin.');
    });
});