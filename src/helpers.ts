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

export const scriptPrompt = "Write a captivating and engaging YouTube intro script designed to last approximately 30 seconds or more, focusing entirely on the spoken narrative. Avoid including any scene descriptions, visual elements, or music cues—just the spoken script. Respond with only the text of the intro without any explanations or additional commentary:";