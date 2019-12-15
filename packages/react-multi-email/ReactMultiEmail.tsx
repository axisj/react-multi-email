import * as React from 'react';
import { IProps } from './PropsInterfaces';
import useEmail from './customHooks/useEmail';

const ReactMultiEmail: React.FC<IProps> = props => {
  const {
    style,
    getLabel,
    className = '',
    noClass,
    placeholder,
    onChange,
    validateEmail,
  } = props;
  const {
    emails,
    focused,
    inputValue,
    emailInputRef,
    handleOnBlur,
    handleOnChange,
    handleOnFocus,
    handleOnKeydown,
    handleOnKeyup,
    removeEmail,
  } = useEmail({
    onChange,
    validateEmail,
  });

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
