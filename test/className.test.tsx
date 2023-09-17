import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultEmail className TEST', () => {
  it('className is correctly assigned', async () => {
    render(
      <ReactMultiEmail
        className='ef3a7c'
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
    const el: HTMLElement | null = document.querySelector('div.react-multi-email');
    expect(el?.className.includes('ef3a7c')).toBe(true);
  });
});
