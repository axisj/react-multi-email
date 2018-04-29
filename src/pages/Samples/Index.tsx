import * as React from 'react';
import 'styles/globals';
import { Basic, CustomizeStyle } from './Examples';
import { Container, Header, Grid } from 'semantic-ui-react';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {}
class Index extends React.Component<IProps, IState> {
  render() {
    return (
      <>
        <Container>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1">react-multi-email</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">basic</Header>
                <Basic />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3">customize style</Header>
                <CustomizeStyle />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

export default Index;
