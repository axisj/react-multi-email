[![npm version](https://badge.fury.io/js/react-multi-email.svg)](https://badge.fury.io/js/react-multi-email)
[![](https://img.shields.io/npm/dm/react-multi-email.svg)](https://www.npmjs.com/package/react-multi-email)
[![](https://github.com/axisj/react-multi-email/actions/workflows/npm-test.yml/badge.svg)](https://github.com/axisj/react-multi-email/actions/workflows)

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
import 'react-multi-email/dist/style.css';

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

## Props

<table>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>string</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>emails</td>
    <td>string[]</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>(emails: string[]) => void;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enable</td>
    <td>({ emailCnt }: { emailCnt: number }) => boolean;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>onDisabled</td>
    <td>() => void;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>onChangeInput</td>
    <td>(value: string) => void;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>onFocus</td>
    <td>() => void;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>onBlur</td>
    <td>() => void;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>onKeyDown</td>
    <td>(evt: React.KeyboardEvent<HTMLInputElement>) => void;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>onKeyUp</td>
    <td>(evt: React.KeyboardEvent<HTMLInputElement>) => void;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>noClass</td>
    <td>boolean</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>validateEmail</td>
    <td>(email: string) => boolean | Promise<boolean>;</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>enableSpinner</td>
    <td>boolean</td>
    <td></td>
    <td></td>
  </tr>
  
  <tr>
    <td>style</td>
    <td>React.CSSProperties</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>getLabel</td>
    <td>
  (
    email: string,
    index: number,
    removeEmail: (index: number, isDisabled?: boolean) => void,
  ) => React.ReactNode;
    </td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>
    className</td>
    <td>string</td>
    <td>''</td>
    <td></td>
  </tr>
  <tr>
    <td>
    inputClassName</td>
    <td>string</td>
    <td>''</td>
    <td></td>
  </tr>
  <tr>
    <td>
    placeholder</td>
    <td>string</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>label</td>
    <td>string | React.ReactNode;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>
    autoFocus</td>
    <td>boolean;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>
    spinner</td>
    <td>() => React.ReactNode;</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>
    delimiter</td>
    <td>string;</td>
    <td>'[ ,;]'</td>
    <td></td>
  </tr>
  <tr>
    <td>
    autoComplete</td>
    <td>string | undefined</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>initialInputValue</td>
    <td>string | undefined</td>
    <td>''</td>
    <td></td>
  </tr>
  <tr>
    <td>
    disableOnBlurValidation</td>
    <td>boolean | undefined</td>
    <td>false</td>
    <td></td>
  </tr>  
  <tr>
    <td>inputValue</td>
    <td>string | undefined</td>
    <td>undefined</td>
    <td></td>
  </tr>
</table>

## License

[MIT](https://opensource.org/licenses/MIT)

> If you don't mind, don't forget to press "star" before leaving.
