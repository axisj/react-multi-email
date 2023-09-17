import { cleanup, render, waitFor, fireEvent } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('ReactMultiEmail onBlur Tests', () => {
  it('does not call onBlur if the input was never focused', async () => {
    const onBlurMockFunc = jest.fn();

    render(
      <ReactMultiEmail
        onBlur={onBlurMockFunc}
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

    expect(onBlurMockFunc).not.toHaveBeenCalled();
  });

  it('call the onBlur when the input area is blurred', async () => {
    const onBlurMockFunc = jest.fn();

    const { getByRole } = render(
      <ReactMultiEmail
        onBlur={onBlurMockFunc}
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

    const input: HTMLElement | null = getByRole('textbox');

    await waitFor(() => {
      fireEvent.focus(input);
      fireEvent.blur(input);
    });

    expect(onBlurMockFunc).toHaveBeenCalledTimes(1);
    expect(input).not.toHaveFocus();
  });
});
