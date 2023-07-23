import { cleanup, render, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

describe('ReactMultEmail onChange TEST', () => {
  it('onChange is called on adding a new valid email by an "Enter" keyup event', async () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <ReactMultiEmail
        onChange={onChange}
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

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('onChange is called on adding a new valid email by typing and focusing out', async () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <ReactMultiEmail
        onChange={onChange}
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

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.focusOut(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('onChange is called on deletion of a valid email by a "Backspace" keydown event', async () => {
    const onChange = jest.fn();

    const { getByRole } = render(
      <ReactMultiEmail
        onChange={onChange}
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

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
