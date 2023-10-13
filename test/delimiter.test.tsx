import { cleanup, fireEvent, getByRole, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultiEmail delimiter TEST', () => {
  it('Default delimiter test', () => {
    const { getByRole } = render(
      <ReactMultiEmail
        getLabel={(email, index, removeEmail) => (
          <div data-tag key={index}>
            <div data-tag-item>{email}</div>
            <span data-tag-handle onClick={() => removeEmail(index)}>
              ×
            </span>
          </div>
        )}
      />,
    );

    const inputElem = getByRole('textbox');
    const emailsWrapper = document.querySelector('.data-labels');
    const MAX_TEST_CASE = 3;

    for (let i = 0; i < MAX_TEST_CASE; i++) {
      const testValue = i === 0 ? 'test@gmail.com' : i === 1 ? 'test@naver.com' : 'test@tt.com';
      const delimiter = i === 0 ? ' ' : i === 1 ? ',' : ';';

      fireEvent.change(inputElem, { target: { value: testValue } });
      expect(emailsWrapper?.childElementCount).toEqual(i);
      fireEvent.change(inputElem, { target: { value: `${testValue}${delimiter}` } });
      expect(emailsWrapper?.childElementCount).toEqual(i + 1);
    }
    // 중복 체크
    const duplicationValue = 'test@gmail.com';
    fireEvent.change(inputElem, { target: { value: duplicationValue } });
    expect(emailsWrapper?.childElementCount).toEqual(MAX_TEST_CASE);
    fireEvent.change(inputElem, { target: { value: `${duplicationValue};` } });
    expect(emailsWrapper?.childElementCount).toEqual(MAX_TEST_CASE);
  });

  it('Custom delimiter test', () => {
    const { getByRole } = render(
      <ReactMultiEmail
        delimiter='[&/]'
        getLabel={(email, index, removeEmail) => (
          <div data-tag key={index}>
            <div data-tag-item>{email}</div>
            <span data-tag-handle onClick={() => removeEmail(index)}>
              ×
            </span>
          </div>
        )}
      />,
    );
    const inputElem = getByRole('textbox');
    const emailsWrapper = document.querySelector('.data-labels');
    const MAX_TEST_CASE = 2;

    for (let i = 0; i < MAX_TEST_CASE; i++) {
      const testValue = i === 0 ? 'test@gmail.com' : 'test@naver.com';
      const delimiter = i === 0 ? '&' : '/';

      fireEvent.change(inputElem, { target: { value: testValue } });
      expect(emailsWrapper?.childElementCount).toEqual(i);
      fireEvent.change(inputElem, { target: { value: `${testValue}${delimiter}` } });
      expect(emailsWrapper?.childElementCount).toEqual(i + 1);
    }
    // 중복 체크
    const duplicationValue = 'test@gmail.com';
    fireEvent.change(inputElem, { target: { value: duplicationValue } });
    expect(emailsWrapper?.childElementCount).toEqual(MAX_TEST_CASE);
    fireEvent.change(inputElem, { target: { value: `${duplicationValue}/` } });
    expect(emailsWrapper?.childElementCount).toEqual(MAX_TEST_CASE);
  });
});
