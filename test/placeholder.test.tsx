import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';
import { cleanup, render, screen } from './utils';

afterEach(cleanup);

describe('ReactMultiEmail placeholder TEST', () => {
  it('placeholder string TEST', () => {
    render(
      <ReactMultiEmail
        placeholder='Email'
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

    const targetElem = document.querySelector('[data-placeholder~="true"]');

    expect(screen.getByDataPlaceholder('true')).toEqual(targetElem);
    expect(targetElem?.textContent).toEqual('Email');
  });

  it('placeholder ReactNode TEST', () => {
    render(
      <ReactMultiEmail
        placeholder={<div>placeholder test</div>}
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

    const placeholderWrapperElem = document.querySelector('[data-placeholder~="true"]');
    const targetElem = document.querySelector('[data-placeholder~="true"] > div');
    expect(screen.getByDataPlaceholder('true')).toEqual(placeholderWrapperElem);
    expect(targetElem?.textContent).toEqual('placeholder test');
  });
});
