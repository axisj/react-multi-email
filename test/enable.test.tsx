import { cleanup, fireEvent, render } from '@testing-library/react';
import { ReactMultiEmail } from '../react-multi-email';
import React from 'react';

afterEach(cleanup);

it('check enable and disabled executed ', () => {
  const enableMockFunc = jest.fn().mockImplementation(({ emailCnt }: { emailCnt: number }) => emailCnt < 3);
  const disabledMockFunc = jest.fn();
  const emailList = ['test0@test.com', 'test1@test.com', 'test2@test.com'];

  const { getByRole } = render(
    <ReactMultiEmail
      enable={enableMockFunc}
      onDisabled={disabledMockFunc}
      emails={emailList}
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
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  for (let i = 0; i < 3; i++) {
    fireEvent.change(inputElement, { target: { value: `test${i}@test.com` } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  }

  expect(disabledMockFunc).toHaveBeenCalled();
});

it('check enable function is executed and disabled function is not executed', () => {
  const enableMockFunc = jest.fn().mockImplementation(({ emailCnt }: { emailCnt: number }) => emailCnt < 3);
  const disabledMockFunc = jest.fn();
  const emailList = ['test0@test.com', 'test1@test.com'];

  const { getByRole } = render(
    <ReactMultiEmail
      enable={enableMockFunc}
      onDisabled={disabledMockFunc}
      emails={emailList}
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
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  for (let i = 0; i < 2; i++) {
    fireEvent.change(inputElement, { target: { value: `test${i}@test.com` } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
  }

  expect(disabledMockFunc).toHaveBeenCalledTimes(0);
});
