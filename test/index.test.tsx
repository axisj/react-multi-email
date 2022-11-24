// __tests__/index.test.jsx

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

let container;

describe('Home', () => {
  it('renders a heading', async () => {
    const { getByTestId, getByText } = await waitFor(() => render(<Home />));

    const contextMenuSampleEl = getByTestId('context-menu-sample-div');

    fireEvent.contextMenu(contextMenuSampleEl);

    expect(getByText(/Forward/i)).toBeInTheDocument();
    expect(getByText(/View Source/i)).toBeInTheDocument();
    expect(getByText(/Save/i)).toBeInTheDocument();

    fireEvent.keyDown(contextMenuSampleEl, { key: 'Escape' });

    expect(screen.queryByText(/Forward/i)).toBeNull();
  });
});
