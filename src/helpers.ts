export const formatIntro = (intro: string): string => {
    intro = intro.replace(/\*\*(.*?)\*\*/g, '$1');

    intro = intro.replace(/\)/g, ')\n');  
    intro = intro.replace(/(\.|\?|\!)\s/g, '$1\n'); 
    
    return intro.trim();  
};

export const formatErrorMessage = (service: string, error: string) => {
    if (error.includes('quota')) {
        return `${service} Error: Your API quota has been exceeded. Please check your plan and billing details.`;
    }

    if (error.includes('Your credit balance')) {
        return `${service} Error: You don't have enough quota for this request. Please upgrade your plan.`;
    }

    if (error.includes('must be <= 1024')) {
        return `${service} Error: The input text is too long. Please shorten it and try again.`;
    }

    return `${service} Error: An unexpected issue occurred. Please contact admin.`;
};

export const scriptPrompt = "Write a 30-second YouTube intro script which is 100 words or less focused on spoken narrative only. Exclude scene descriptions, visuals, or music cues. Respond with only the script text, without explanations or extra commentary.";