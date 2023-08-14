import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';

afterEach(cleanup);

describe('ReactMultEmail onChange TEST', () => {
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

  it('calls onKeyDown when the Enter key is pressed', () => {
    fireEvent.change(input, { target: { value: 'onKeyDown1@example.com' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('calls onKeyDown when the Backspace key is pressed', () => {
    fireEvent.change(input, { target: { value: 'onKeyDown2@example.com' } });
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace', keyCode: 8, charCode: 8 });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalled();
  });
});
