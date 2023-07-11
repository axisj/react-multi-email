import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('ReactMultiEmail Style TEST', () => {
  render(
    <ReactMultiEmail
      style={{ background: 'red', marginLeft: '1em', display: 'block' }}
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
  expect(el?.style.background).toEqual('red');
  expect(el?.style.marginLeft).toEqual('1em');
  expect(el?.style.display).toEqual('block');
});

export {};
