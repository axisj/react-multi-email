import { buildQueries, Matcher, MatcherOptions, queryHelpers } from '@testing-library/react';

export const queryAllByDataPlaceholder = queryHelpers.queryAllByAttribute.bind(null, 'data-placeholder');

export const getAllByDataPlaceholder = (container: HTMLElement, id: Matcher, options?: MatcherOptions) => {
  const els = queryAllByDataPlaceholder(container, id, options);

  if (!els.length) {
    throw queryHelpers.getElementError(`Unable to find an element by: [data-placeholder="${id}"]`, container);
  }
  return els;
};

export const getByDataPlaceholder = (container: HTMLElement, id: Matcher, options?: MatcherOptions) => {
  const els = queryAllByDataPlaceholder(container, id, options);

  if (els.length > 1) {
    throw queryHelpers.getElementError(`Found multiple elements with the [data-test-id="${id}"]`, container);
  }
  return els[0];
};

const getMultipleError = (c: unknown, dataPlaceholderValue: string) =>
  `Found multiple elements with the data-placeholder attribute of: ${dataPlaceholderValue}`;
const getMissingError = (c: unknown, dataPlaceholderValue: string) =>
  `Unable to find an element with the data-placeholder attribute of: ${dataPlaceholderValue}`;

buildQueries(queryAllByDataPlaceholder, getMultipleError, getMissingError);
