import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultiEmail autoFocus prop Test', () => {
  it('When autoFocus is true', () => {
    const { getByRole } = render(
      <ReactMultiEmail
        autoFocus={true}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />,
    );

    const input = getByRole('textbox');
    expect(document.activeElement).toBe(input);
  });

  it('When autoFocus is false', () => {
    const { getByRole } = render(
      <ReactMultiEmail
        autoFocus={false}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />,
    );

    const input = getByRole('textbox');
    expect(document.activeElement).not.toBe(input);
  });
});
