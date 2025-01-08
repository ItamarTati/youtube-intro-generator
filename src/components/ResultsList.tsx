import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ResponseProps {
  service: string;
  responseMessage: string;
  hasError: boolean;
}

interface ResultsListProps {
  responses: ResponseProps[];
}

const ResultsList: React.FC<ResultsListProps> = ({ responses }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Text copied to clipboard!');
    });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {responses.some(response => response.hasError) && (
        <p style={{ color: 'red' }}>There was an error generating one or more intros.</p>
      )}
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Intro</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.service}</td>
              <td>
                {response.hasError ? (
                  <span style={{ color: 'red' }}>{response.responseMessage}</span>
                ) : (
                  <>
                    {response.responseMessage && response.responseMessage.length > 200 ? (
                      <>
                        {expandedIndex === index
                          ? response.responseMessage
                          : `${response.responseMessage.substring(0, 200)}...`}
                        <button className="show-more-button"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedIndex === index ? 'Show Less' : 'Show More'}
                        </button>
                      </>
                    ) : (
                      response.responseMessage
                    )}
                  </>
                )}
              </td>
              <td>
                  <button
                    onClick={() => handleCopy(response.responseMessage)}
                  >
                    Copy
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ResultsList;