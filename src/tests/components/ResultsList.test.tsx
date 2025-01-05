import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsList from '../../components/ResultsList';

describe('ResultsList Component', () => {
    it('renders a table with intros', () => {
        const intros = ['Intro 1', 'Intro 2', 'Intro 3', 'Intro 4', 'Intro 5', 'Intro 6', 'Intro 7', 'Intro 8'];
        render(<ResultsList intros={intros} />);
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(intros.length + 1);
        intros.forEach((intro, index) => {
            expect(rows[index + 1]).toHaveTextContent(intro);
        });
    });
});