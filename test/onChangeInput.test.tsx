import { cleanup, fireEvent, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('ReactMultiEmail onChangeInput TEST', () => {
  const mockhandleChangeInput = jest.fn().mockImplementation(value => value);

  const { getByRole } = render(
    <ReactMultiEmail
      onChangeInput={mockhandleChangeInput}
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

  fireEvent.change(input, { target: { value: 'kimhojin3714@naver.com' } });
  expect(input.value).toBe(mockhandleChangeInput('kimhojin3714@naver.com'));
});
