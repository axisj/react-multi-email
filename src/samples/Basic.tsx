import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';

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
        <form>
          <h3>Email</h3>
          <ReactMultiEmail
            placeholder="Input your email"
            emails={emails}
            onChange={(_emails: string[]) => {
              this.setState({ emails: _emails });
            }}
            autoFocus={true}
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
        </form>
      </>
    );
  }
}

export default Basic;
