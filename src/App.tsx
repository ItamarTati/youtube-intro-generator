import { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import Button from './components/Button';
import ResultsList from './components/ResultsList';
import { callGeminiGenerateIntro, callChatGPTGenerateIntro, callClaudeGenerateIntro, callHuggingFaceGenerateIntro } from './api';
import beAmzedImage from './assets/beAmazed.png'
import { formatIntro, formatErrorMessage } from './helpers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LLMResponse {
  service: string;
  responseMessage: string;
  hasError: boolean;
}

function App() {
  const [script, setScript] = useState('');
  const [responses, setResponses] = useState<LLMResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) {
      toast.error('Please paste a script!');  
      return;
    }

    setLoading(true);
    setResponses([]);

    try {
      const services = [
        { name: 'Gemini', call: callGeminiGenerateIntro },
        { name: 'ChatGPT', call: callChatGPTGenerateIntro },
        { name: 'Claude', call: callClaudeGenerateIntro },
        { name: 'Hugging Face', call: callHuggingFaceGenerateIntro },
      ];

      const apiResultsTemporaryVariable: LLMResponse[] = [];

      for (const service of services) {
        const promptResponse = await service.call(script);

        if (promptResponse.intro) {
          apiResultsTemporaryVariable.push({ service: service.name, responseMessage: formatIntro(promptResponse.intro), hasError: false });
        } else {
          apiResultsTemporaryVariable.push({ service: service.name, responseMessage: formatErrorMessage(service.name, promptResponse.error), hasError: true });
        }
      }

      setResponses(apiResultsTemporaryVariable);
    } catch (error) {
      console.error('Failed to generate intros:', error);
      toast.error('Error generating intros!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <img src={beAmzedImage} alt="Logo" className="header-logo" />
        <h1>YouTube Intro Generator</h1>
      </header>
      <main id="main">
        <InputBox onInputChange={setScript} />
        <Button onClick={handleGenerate} disabled={loading} />
        {loading && (
          <div className="spinner"></div> 
        )}
        {responses.length > 0 && (
          <ResultsList responses={responses} />
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;