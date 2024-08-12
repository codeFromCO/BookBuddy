import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

jest.mock('../src/pages/home', () => () => <div>HomePage</div>);
jest.mock('../src/pages/error', () => () => <div>ErrorPage</div>);

const queryClient = new QueryClient();

const renderApp = (initialEntries = ['/']) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );

describe('App', () => {
  test('renders HomePage at root route', () => {
    renderApp(['/']);
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  test('renders ErrorPage at unknown route', () => {
    renderApp(['/unknown-route']);
    expect(screen.getByText('ErrorPage')).toBeInTheDocument();
  });
});