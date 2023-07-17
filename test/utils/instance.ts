import { queries, render, RenderOptions, within } from '@testing-library/react';
import { ReactElement } from 'react';
import * as customQueries from './custom-queries';

const allQueries = {
  ...queries,
  ...customQueries,
};

const customScreen = within(document.body, allQueries);
const customWithin = (element: HTMLElement) => within(element, allQueries);
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { queries: allQueries, ...options });

export * from '@testing-library/react';
export { customScreen as screen, customWithin as within, customRender as render };
