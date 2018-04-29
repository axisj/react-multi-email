# react-multi-email

A simple react component to format multiple email as the user types.

- Simple code
- No dependency
- Small size
- Simple customization

[See Demo](http://react-multi-email.axisj.com/)

<img src="https://cdn.rawgit.com/axui/react-multi-email/c3098f94/react-multi-email.gif" />


## Installation

```shell-script
npm install react-multi-email -S
```

## Usage

```jsx
import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

class Basic extends React.Component {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;
    const myStyle = {};
    
    return (
      <>
        <Segment>
          <Form>
            <Form.Field>
              <label>Email</label>

              <ReactMultiEmail
                style={myStyle}
                emails={emails}
                onChange={_emails => {
                  this.setState({ emails: _emails });
                }}
                getLabel={(
                  email,
                  index,
                  removeEmail,
                ) => {
                  return (
                    <Label key={index}>
                      {email}
                      <Icon name="delete" onClick={() => removeEmail(index)} />
                    </Label>
                  );
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>react-multi-email value</label>
              {emails.join(', ') || 'empty'}
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
```

## License

[MIT](https://opensource.org/licenses/MIT)


> If you don't mind, don't forget to press "star" before leaving.
