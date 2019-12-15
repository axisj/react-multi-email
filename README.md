[![npm version](https://badge.fury.io/js/react-multi-email.svg)](https://badge.fury.io/js/react-multi-email)
[![](https://img.shields.io/npm/dm/react-multi-email.svg)](https://www.npmjs.com/package/react-multi-email)

# react-multi-email

A simple react component to format multiple email as the user types.

- Simple code
- No dependency
- Small size
- Simple customization

[See Demo](https://codesandbox.io/s/jpvjk8m5o9)

<img src="https://cdn.rawgit.com/axui/react-multi-email/c3098f94/react-multi-email.gif" />

## Installation

```shell-script
npm install react-multi-email -S
```

## Usage

```typescript jsx
import * as React from 'react';
import { IProps } from './PropsInterfaces';
import useEmail from './customHooks/useEmail'

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
```

## License

[MIT](https://opensource.org/licenses/MIT)

> If you don't mind, don't forget to press "star" before leaving.