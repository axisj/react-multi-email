import * as React from 'react';
import 'styles/globals';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { NoMatch, ErrorBoundary } from 'components';
import 'styles/globals';
import Samples from './samples';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Samples} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
