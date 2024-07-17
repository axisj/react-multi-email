import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

it('ReactMultiEmail validateEmail function works test', async () => {
  const mockValidateEmailFunc = jest.fn();

  const { getByRole } = await act(async () => {
    return render(
      <ReactMultiEmail
        validateEmail={mockValidateEmailFunc}
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
  });

  const input = getByRole('textbox') as HTMLElement;

  fireEvent.change(input, { target: { value: 'abc@gmail.com' } });
  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

  await waitFor(() => {
    expect(mockValidateEmailFunc).toHaveBeenCalled();
  });
});

it('validateEmail = true , test code ending in .com', async () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;
  const mockValidateEmailFunc = jest.fn().mockImplementation(email => regex.test(email));

  const { getByRole } = await act(async () => {
    return render(
      <ReactMultiEmail
        validateEmail={mockValidateEmailFunc}
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
  });

  const input = getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'abc@gmail.com' } });

  await waitFor(() => {
    expect(mockValidateEmailFunc(input.value)).toBe(true);
  });
});

it('validateEmail = false', async () => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/;
  const mockValidateEmailFunc = jest.fn().mockImplementation(email => regex.test(email));

  const { getByRole } = await act(async () => {
    return render(
      <ReactMultiEmail
        validateEmail={mockValidateEmailFunc}
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
  });

  const input = getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'abc@gmail.kr' } });

  await waitFor(() => {
    expect(mockValidateEmailFunc(input.value)).toBe(false);
  });
});

export {};
