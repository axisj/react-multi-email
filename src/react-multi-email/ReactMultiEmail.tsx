import * as React from 'react';
import isEmailFn from './isEmail';
import { useState, createRef } from 'react';

interface IProps {
  emails?: string[];
  onChange?: (emails: string[]) => void;
  noClass?: boolean;
  validateEmail?: (email: string) => boolean;
  style?: object;
  getLabel: (
    email: string,
    index: number,
    removeEmail: (index: number) => void,
  ) => void;
  className?: string;
  placeholder?: string | React.ReactNode;
}

const ReactMultiEmail: React.FC<IProps> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div
      className={`${className} ${noClass ? '' : 'react-multi-email'} ${
        focused ? 'focused' : ''
      } ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`}
      style={style}
      onClick={() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }}
    >
      {placeholder ? <span data-placeholder>{placeholder}</span> : null}
      {emails.map((email: string, index: number) =>
        getLabel(email, index, removeEmail),
      )}
      <input
        ref={emailInputRef}
        type="text"
        value={inputValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        onKeyUp={handleOnKeyup}
      />
    </div>
  );
};

export default ReactMultiEmail;
