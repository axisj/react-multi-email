import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';

afterEach(cleanup);

it('calls onKeyDown when the Enter key is pressed', () => {
  const onKeyDown = jest.fn<unknown, [React.KeyboardEvent]>();
  const { getByRole } = render(
    <ReactMultiEmail
      onKeyDown={onKeyDown}
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
  fireEvent.change(input, { target: { value: 'onKeyDown@example.com' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
  expect(onKeyDown).toHaveBeenCalled();
});
