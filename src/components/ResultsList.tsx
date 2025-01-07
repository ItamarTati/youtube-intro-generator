import React from 'react';

interface APIResult {
  service: string;
  intro?: string;
  error?: string;
}

interface ResultsListProps {
  intros: APIResult[];
  error?: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ intros, error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>There was an error generating one or more intros.</p>}
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Intro</th>
          </tr>
        </thead>
        <tbody>
          {intros.map((result, index) => (
            <tr key={index}>
              <td>{result.service}</td>
              <td>
                {result.error ? (
                  <span style={{ color: 'red' }}>{result.error}</span>
                ) : (
                  result.intro
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsList;