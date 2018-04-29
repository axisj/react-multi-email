import * as React from 'react';
import 'styles/globals';
import { ReactMultiEmail } from 'react-multi-email';
import {
  Container,
  Segment,
  Header,
  Grid,
  Form,
  Label,
  Icon,
} from 'semantic-ui-react';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}
class Index extends React.Component<IProps, IState> {
  state = {
    emails: [],
  };

  render() {
    const { emails } = this.state;

    return (
      <>
        <Container>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1">react-multi-email</Header>
                <Segment>
                  <Form>
                    <Form.Field>
                      <label>Email</label>

                      <ReactMultiEmail
                        emails={emails}
                        onChange={(emails: string[]) => {
                          this.setState({ emails: emails });
                        }}
                        getLabel={(
                          email: string,
                          index: number,
                          removeEmail: Function,
                        ) => {
                          return (
                            <Label key={index}>
                              {email}
                              <Icon
                                name="delete"
                                onClick={() => removeEmail(index)}
                              />
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

export default Index;
