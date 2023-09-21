import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('ReactMultiEmail validateEmail function works test', async () => {
  const mockValidateEmailFunc = jest.fn();

  const { getByRole } = render(
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

  const input = getByRole('textbox') as HTMLElement;

  fireEvent.change(input, { target: { value: 'abc@gmail.com' } });
  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

  await waitFor(() => {
    expect(mockValidateEmailFunc).toHaveBeenCalled();
  });
});

it('ReactMultiEmail validateEmail pass test', async () => {
  const mockValidateEmailFunc = jest.fn().mockImplementation(email => email.endsWith('.com'));

  const { getByRole } = render(
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

  const input = getByRole('textbox') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'abc@gmail.com' } });

  await waitFor(() => {
    expect(mockValidateEmailFunc(input.value)).toBe(true);
  });
});

export {};
