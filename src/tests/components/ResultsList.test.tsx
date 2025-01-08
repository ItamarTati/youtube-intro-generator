import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsList from '../../components/ResultsList';
import { toast } from 'react-toastify';

beforeAll(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn().mockResolvedValue(true),
    },
    writable: true,
  });
});

describe('ResultsList Component', () => {
  it('renders a table with intros', () => {
    const intros = [
      { service: 'Gemini', responseMessage: 'Intro 1', hasError: false },
      { service: 'ChatGPT', responseMessage: 'Intro 2', hasError: false },
      { service: 'Claude', responseMessage: 'Intro 3', hasError: false },
      { service: 'Hugging Face', responseMessage: 'Intro 4', hasError: false },
    ];

    render(<ResultsList responses={intros} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(intros.length + 1);

    intros.forEach((intro, index) => {
      const row = rows[index + 1];
      expect(row).toHaveTextContent(intro.service);
      expect(row).toHaveTextContent(intro.responseMessage);
    });
  });

  it('displays an error message when there is an error', () => {
    const intros = [
      { service: 'Gemini', responseMessage: 'Error generating intro', hasError: true },
      { service: 'ChatGPT', responseMessage: 'Intro 2', hasError: false },
    ];

    render(<ResultsList responses={intros} />);

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
      { service: 'Gemini', responseMessage: 'Intro 1', hasError: false },
      { service: 'ChatGPT', responseMessage: 'Intro 2', hasError: false },
    ];

    render(<ResultsList responses={intros} />);

    const errorMessage = screen.queryByText(/There was an error generating one or more intros/);
    expect(errorMessage).not.toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('copies the intro text to clipboard when the "Copy" button is clicked', () => {
    const intros = [
      { service: 'Gemini', responseMessage: 'Intro 1', hasError: false },
      { service: 'ChatGPT', responseMessage: 'Intro 2', hasError: false },
    ];

    render(<ResultsList responses={intros} />);

    const copyButton = screen.getAllByText('Copy')[0];
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Intro 1');
  });
});