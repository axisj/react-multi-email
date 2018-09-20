# react-multi-email

A simple react component to format multiple email as the user types.

* Simple code
* No dependency
* Small size
* Simple customization

[See Demo](https://codesandbox.io/s/jpvjk8m5o9)

<img src="https://cdn.rawgit.com/axui/react-multi-email/c3098f94/react-multi-email.gif" />

## Installation

```shell-script
npm install react-multi-email -S
```

## Usage

```typescript jsx
import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}
class Basic extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return (
      <>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder='placeholder'
          emails={emails}
          onChange={(_emails: string[]) => {
            this.setState({ emails: _emails });
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void,
          ) => {
            return (
              <div data-tag key={index}>
                {email}
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
        />
        <br />
        <h4>react-multi-email value</h4>
        <p>{emails.join(', ') || 'empty'}</p>
      </>
    );
  }
}

export default Basic;
```

## License

[MIT](https://opensource.org/licenses/MIT)

> If you don't mind, don't forget to press "star" before leaving.
