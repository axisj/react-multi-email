import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultEmail getLabel TEST', () => {
  it('getLabel is called on entering new valid email', async () => {
    const getLabel = jest.fn();

    const { getByRole } = render(<ReactMultiEmail getLabel={getLabel} />);
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(getLabel).toHaveBeenCalledTimes(1);
  });
  it('the elements returned by getLabel have the right index and email', async () => {
    const { getByRole } = render(
      <ReactMultiEmail
        getLabel={(email, index, removeEmail) => {
          return (
            <div id={`index${index}`} data-index={index} key={index}>
              <div id={`email${index}`} data-email={email}>
                {email}
              </div>
              <span onClick={() => removeEmail(index)}>×</span>
            </div>
          );
        }}
      />,
    );
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test1@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'test2@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    const indexElement0: HTMLDivElement | null = document.querySelector('#index0');
    const indexElement1: HTMLDivElement | null = document.querySelector('#index1');
    const emailElement0: HTMLDivElement | null = document.querySelector('#email0');
    const emailElement1: HTMLDivElement | null = document.querySelector('#email1');
    expect(indexElement0?.dataset.index).toEqual('0');
    expect(indexElement1?.dataset.index).toEqual('1');
    expect(emailElement0?.dataset.email).toEqual('test1@example.com');
    expect(emailElement1?.dataset.email).toEqual('test2@example.com');
  });
  it('removeEmail is called on clicking element', async () => {
    const { getByRole } = render(
      <ReactMultiEmail
        getLabel={(email, index, removeEmail) => {
          return (
            <div className='data-label' data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span id={`removeEmail${index}`} data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />,
    );
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test1@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'test2@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    fireEvent.change(input, { target: { value: 'test3@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    const removeEmail0: HTMLSpanElement | null = document.querySelector('#removeEmail0');
    if (removeEmail0) {
      fireEvent.click(removeEmail0);
    }
    expect(document.querySelectorAll('.data-label')?.length).toEqual(2);

    const removeEmail1: HTMLSpanElement | null = document.querySelector('#removeEmail0');
    if (removeEmail1) {
      fireEvent.click(removeEmail1);
    }
    expect(document.querySelectorAll('.data-label')?.length).toEqual(1);
  });
});
