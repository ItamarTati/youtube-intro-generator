export const callGeminiGenerateIntro = async (prompt: string) => {
    try {
        const fullPrompt = `Write a catchy YouTube intro from the following video script: ${prompt}`;

        const response = await fetch('https://itamartati1.pythonanywhere.com/gemini-generate-intro', {
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
        return data; 
    } catch (error: any) {
        console.error('Error calling Gemini generate intro:', error);
        return { error: error.message || 'Unknown error occurred' };
    }
};
