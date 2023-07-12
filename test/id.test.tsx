import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('ReactMultiEmail id TEST', () => {
  render(
    <ReactMultiEmail
      id='multiEmail'
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

  const targetElem = document.querySelector('#multiEmail');

  expect(targetElem?.id).toEqual('multiEmail');
  expect(targetElem?.tagName).toEqual('INPUT');
});
