import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultiEmail autoComplete prop Test', () => {
  it('autoComplete avaliable value', () => {
    render(
      <ReactMultiEmail
        id='inputTarget'
        autoComplete='on'
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

    const inputTarget = document.getElementById('inputTarget');
    expect(!!inputTarget?.getAttribute('autoComplete')).toBe(true);
  });

  it('autoComplete undefined', () => {
    render(
      <ReactMultiEmail
        id='inputTarget'
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

    const inputTarget = document.getElementById('inputTarget');
    expect(!!inputTarget?.getAttribute('autoComplete')).toBe(false);
  });

  it('autoComplete falsy string', () => {
    render(
      <ReactMultiEmail
        id='inputTarget'
        autoComplete=''
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

    const inputTarget = document.getElementById('inputTarget');
    expect(!!inputTarget?.getAttribute('autoComplete')).toBe(false);
  });
});
