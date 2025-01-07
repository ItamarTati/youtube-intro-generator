import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsList from '../../components/ResultsList';

describe('ResultsList Component', () => {
    it('renders a table with intros', () => {
        const intros = [
            { service: 'Gemini', intro: 'Intro 1' },
            { service: 'ChatGPT', intro: 'Intro 2' },
            { service: 'Claude', intro: 'Intro 3' },
            { service: 'Hugging Face', intro: 'Intro 4' },
        ];

        render(<ResultsList intros={intros} />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(intros.length + 1);  // +1 for the header row

        intros.forEach((intro, index) => {
            const row = rows[index + 1]; // +1 to skip the header row
            expect(row).toHaveTextContent(intro.service);
            expect(row).toHaveTextContent(intro.intro);
        });
    });

    it('displays an error message when there is an error', () => {
        const intros = [
            { service: 'Gemini', error: 'Error generating intro' },
            { service: 'ChatGPT', intro: 'Intro 2' },
        ];

        render(<ResultsList intros={intros} error />);

        const errorMessage = screen.getByText(/There was an error generating one or more intros/);
        expect(errorMessage).toBeInTheDocument();

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(intros.length + 1); 
        const errorRow = rows[1]; 
        expect(errorRow).toHaveTextContent('Gemini');
        expect(errorRow).toHaveTextContent('Error generating intro');
        expect(errorRow).toContainHTML('<span style="color: red;">Error generating intro</span>');
    });

    it('does not display an error message if no error is present', () => {
        const intros = [
            { service: 'Gemini', intro: 'Intro 1' },
            { service: 'ChatGPT', intro: 'Intro 2' },
        ];

        render(<ResultsList intros={intros} error={false} />);

        const errorMessage = screen.queryByText(/There was an error generating one or more intros/);
        expect(errorMessage).not.toBeInTheDocument();

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
    });
});