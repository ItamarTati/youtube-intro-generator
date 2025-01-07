import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import Button from './components/Button';
import ResultsList from './components/ResultsList';
import { callGeminiGenerateIntro, callChatGPTGenerateIntro, callClaudeGenerateIntro, callHuggingFaceGenerateIntro } from './api';
import { formatIntro, formatErrorMessage } from './helpers';  

interface APIResult {
  service: string;
  intro?: string;  
  error?: string; 
}

function App() {
  const [script, setScript] = useState('');
  const [intros, setIntros] = useState<APIResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) return alert('Please paste a script!');

    setLoading(true);
    setIntros([]);

    try {
      const services = [
        { name: 'Gemini', call: callGeminiGenerateIntro },
        { name: 'ChatGPT', call: callChatGPTGenerateIntro },
        { name: 'Claude', call: callClaudeGenerateIntro },
        { name: 'Hugging Face', call: callHuggingFaceGenerateIntro },
      ];

      const results: APIResult[] = [];

      for (const service of services) {
        const promptResponse = await service.call(script);

        console.log(promptResponse)

        if (promptResponse.intro) {
          results.push({
            service: service.name,
            intro: formatIntro(promptResponse.intro),
          });
        } else {
          results.push({
            service: service.name,
            error: formatErrorMessage(service.name, promptResponse.error), 
          });
        }
      }

      console.log(results)

      setIntros(results);
    } catch (error) {
      console.error('Failed to generate intros:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Intro Generator</h1>
      <InputBox onInputChange={setScript} />
      <Button onClick={handleGenerate} disabled={loading} />
      {loading && <p>Loading... Generating intros from APIs...</p>}
      {intros.length > 0 && (
        <ResultsList 
          intros={intros} 
          error={intros.some(result => result.error)} 
        />
      )}
    </div>
  );
}

export default App;