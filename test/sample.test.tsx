import { cleanup, render, screen } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('ReactMultiEmail Sample TEST', () => {
  render(
    <ReactMultiEmail
      placeholder='Input your email'
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

  const el = screen.getByText('Input your email');
  expect(el.tagName).toBe('SPAN');
  expect(el.parentElement?.className).toContain('react-multi-email');
});

export {};
