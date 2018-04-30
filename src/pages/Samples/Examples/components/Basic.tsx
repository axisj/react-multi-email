import * as React from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import { Segment, Form, Label, Icon } from 'semantic-ui-react';

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
        <Segment>
          <Form>
            <Form.Field>
              <label>Email</label>

              <ReactMultiEmail
                emails={emails}
                onChange={(_emails: string[]) => {
                  this.setState({ emails: _emails });
                }}
                getLabel={(
                  email: string,
                  index: number,
                  removeEmail: Function,
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

export default Basic;
