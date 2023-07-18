import { cleanup, render, waitFor } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('ReactMultiEmail onFocus TEST', async () => {
  const onFocusMockFunc = jest.fn();

  const { getByRole } = render(
    <ReactMultiEmail
      onFocus={onFocusMockFunc}
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

  const inputElement = getByRole('textbox');
  await waitFor(() => inputElement.focus());

  expect(onFocusMockFunc).toHaveBeenCalledTimes(1);
  expect(inputElement).toHaveFocus();
});

export {};
