import React from 'react';

interface ResultsListProps {
    intros: string[];
}

const ResultsList: React.FC<ResultsListProps> = ({ intros }) => (
    <ul data-testid="intro-list">
        {intros.map((intro, index) => (
            <li key={index} data-testid={`intro-${index}`}>
                {intro}
            </li>
        ))}
    </ul>
);

export default ResultsList;