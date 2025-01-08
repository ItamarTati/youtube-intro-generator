import { formatIntro, formatErrorMessage } from '../../helpers';

describe('formatIntro', () => {
  it('should remove markdown-like symbols', () => {
    const intro = 'Voiceover (**energetic**, slightly sarcastic tone): Ever wondered how some people manage to outsmart natural selection... spectacularly?';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe(
      'Voiceover (energetic, slightly sarcastic tone)\n: Ever wondered how some people manage to outsmart natural selection...\nspectacularly?'
    );
  });

  it('should add line breaks after parentheses', () => {
    const intro = 'Voiceover (energetic, slightly sarcastic tone): Ever wondered how some people manage to outsmart natural selection... spectacularly?';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe(
      'Voiceover (energetic, slightly sarcastic tone)\n: Ever wondered how some people manage to outsmart natural selection...\nspectacularly?'
    );
  });

  it('should add line breaks after sentences', () => {
    const intro = 'Voiceover: Ever wondered how some people manage to outsmart natural selection... spectacularly? Voiceover: This is where the survival instinct takes a holiday, and common sense goes on a permanent vacation.';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe(
      'Voiceover: Ever wondered how some people manage to outsmart natural selection...\nspectacularly?\nVoiceover: This is where the survival instinct takes a holiday, and common sense goes on a permanent vacation.'
    );
  });

  it('should handle cases where no markdown is present', () => {
    const intro = 'Voiceover: Ever wondered how some people manage to outsmart natural selection?';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe('Voiceover: Ever wondered how some people manage to outsmart natural selection?');
  });

  it('should handle edge cases like empty strings', () => {
    const intro = '';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe('');
  });

  it('should handle edge cases where there are no punctuation marks', () => {
    const intro = 'Voiceover said that he was ready';
    const formattedIntro = formatIntro(intro);
    expect(formattedIntro).toBe('Voiceover said that he was ready');
  });
});

describe('formatErrorMessage', () => {
    it('should return a quota exceeded error message for quota-related issues', () => {
        const result = formatErrorMessage('ChatGPT', 'Error: You exceeded your current quota, please check your plan.');
        expect(result).toBe('ChatGPT Error: Your API quota has been exceeded. Please check your plan and billing details.');
    });

    it('should return an insufficient credit balance error message', () => {
        const result = formatErrorMessage('Hugging Face', 'Error: Your credit balance is low.');
        expect(result).toBe(`Hugging Face Error: You don't have enough quota for this request. Please upgrade your plan.`);
    });

    it('should return an input too long error message for Hugging Face input length issue', () => {
        const result = formatErrorMessage('Hugging Face', 'Hugging Face Error: validation - Input validation error: `inputs` tokens + `max_new_tokens` must be <= 1024');
        expect(result).toBe('Hugging Face Error: The input text exceeds the maximum allowed length of 1024 characters. Please shorten it and try again.');
    });

    it('should return a generic error message for unknown errors', () => {
        const result = formatErrorMessage('ChatGPT', 'Error: Some unknown issue occurred');
        expect(result).toBe('ChatGPT Error: An unexpected issue occurred. Please contact admin.');
    });
});