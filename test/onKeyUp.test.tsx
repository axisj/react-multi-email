import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';

afterEach(cleanup);

describe('ReactMultEmail onKeyUp TEST', () => {
  it('calls onKeyUp with the correct key when a key is released', () => {
    const onKeyUp = jest.fn<unknown, [React.KeyboardEvent]>();
    const { getByRole } = render(
      <ReactMultiEmail
        onKeyUp={onKeyUp}
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
    fireEvent.change(input, { target: { value: 'onKeyUp@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }));
    // expect(onKeyUp).toHaveBeenCalled();
  });

  it('does not call onKeyUp when other keys are released', async () => {
    const onKeyUp = jest.fn<unknown, [React.KeyboardEvent]>();
    const { getByRole } = render(
      <ReactMultiEmail
        onKeyUp={onKeyUp}
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
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab', keyCode: 9, charCode: 9 });

    expect(onKeyUp).not.toHaveBeenCalled();
  });
});
