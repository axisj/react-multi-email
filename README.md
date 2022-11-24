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
npm install react-multi-email
```

## Usage

```typescript jsx
import * as React from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

interface Props {}

function BasicExample(props: Props) {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [focused, setFocused] = React.useState(false);

  return (
    <form>
      <h3>Email</h3>
      <ReactMultiEmail
        placeholder='Input your email'
        emails={emails}
        onChange={(_emails: string[]) => {
          setEmails(_emails);
        }}
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
      />
      <br />
      <h4>react-multi-email value</h4>
      <h3>Focused: {focused ? 'true' : 'false'}</h3>
      <p>{emails.join(', ') || 'empty'}</p>
    </form>
  );
}

export default BasicExample;
```

## License

[MIT](https://opensource.org/licenses/MIT)

> If you don't mind, don't forget to press "star" before leaving.
