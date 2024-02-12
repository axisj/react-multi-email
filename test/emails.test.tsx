import { cleanup, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultEmail emails TEST', () => {
  it('Emails validation children node count', () => {
    render(
      <ReactMultiEmail
        emails={['test', 'tt', 'test@gmail.com']}
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

    const emailsWrapper = document.querySelector('.data-labels');
    expect(emailsWrapper?.childElementCount).toEqual(1);
  });

  it('Emails empty', () => {
    render(
      <ReactMultiEmail
        emails={[]}
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

    const emptyElement = document.querySelector('.empty');
    const emailsWrapper = document.querySelector('.data-labels');

    expect(emailsWrapper?.childElementCount).toEqual(0);
    expect(emptyElement).toBeTruthy();
  });

  it('Emails with invalid text', () => {
    render(
      <ReactMultiEmail
        emails={['test', 'email']}
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

    const emptyElement = document.querySelector('.empty');
    const emailsWrapper = document.querySelector('.data-labels');

    expect(emailsWrapper?.childElementCount).toEqual(0);
    expect(emptyElement).toBeTruthy();
  });
});


it('Emails with custom validation', async () => {
  
  const emails = ['abc@gmail','abc','def', 'abc@def.com']
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]/;
  
  const mockValidateEmailFunc = jest.fn().mockImplementation((email) => regex.test(email));
  
  render(
    <ReactMultiEmail
      validateEmail={(mockValidateEmailFunc)}
      emails={emails}
      getLabel={(email, index) => {
        return (
          <div data-tag key={index}>
            <div data-tag-item>{email}</div>
          </div>
        );
      }}
    />,
  );

  const emailsWrapper = document.querySelector('.data-labels');
  // 4 emails are passed to the component, but only 2 are valid based on the custom validation.
  expect(emailsWrapper?.childElementCount).toEqual(2);
});