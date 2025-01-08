import {scriptPrompt} from '../helpers'

export const callChatGPTGenerateIntro = async (prompt: string) => {
    try {
        const fullPrompt = `${scriptPrompt} ${prompt}`;

        const response = await fetch('https://itamartati1.pythonanywhere.com/chatgpt-generate-intro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: fullPrompt }),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            const errorMessage = errorDetails.error || response.statusText;
            throw new Error(`Error: ${errorMessage}`);
        }

        const data = await response.json();
        return data.intro; 
    } catch (error: any) {
        console.error('Error calling ChatGPT generate intro:', error);
        return { error: error.message || 'Unknown error occurred' };
    }
};
