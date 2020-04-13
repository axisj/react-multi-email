import * as React from 'react';
import { ReactMultiEmail, isEmail } from 'react-multi-email';

interface IProps {}
interface IState {
  emails: string[];
}
class CustomizeStyle extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return (
      <>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder={
            <>
              <b>I</b> am <u style={{ color: '#a0f2ff' }}>placeholder</u> !
            </>
          }
          style={{ minHeight: '100px' }}
          emails={emails}
          onChange={(_emails: string[]) => {
            this.setState({ emails: _emails });
          }}
          validateEmail={email => {
            return isEmail(email);
          }}
          getLabel={(
            email: string,
            index: number,
            removeEmail: (index: number) => void,
          ) => {
            return (
              <div data-tag key={index}>
                <div data-tag-item>
                  {email}
                </div>
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

export default CustomizeStyle;
