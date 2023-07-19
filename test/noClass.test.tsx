import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultiEmail noClass prop Test', () => {
  it('When noClass is true', () => {
    render(
      <ReactMultiEmail
        noClass={true}
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

    expect(document.querySelector('.react-multi-email')).toBeNull();
  });

  it('When noClass is false', () => {
    render(
      <ReactMultiEmail
        noClass={false}
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

    expect(document.querySelector('.react-multi-email')).not.toBeNull();
  });
});
