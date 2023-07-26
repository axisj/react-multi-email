import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('calls onDisabled when the email limit is reached', async () => {
  const onDisabled = jest.fn();

  const { getByRole } = render(
    <ReactMultiEmail
      enable={({ emailCnt }) => emailCnt < 5}
      onDisabled={onDisabled}
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
  const input = getByRole('textbox');

  for (let i = 0; i < 5; i++) {
    fireEvent.change(input, { target: { value: `test${i}@example.com` } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
  }
  fireEvent.change(input, { target: { value: 'onDisabled@example.com' } });
  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
  expect(onDisabled).toHaveBeenCalled();
});
