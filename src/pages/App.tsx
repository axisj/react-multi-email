import * as React from "react";
import "styles/globals";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import * as ReactGA from "react-ga";
import { hot } from "react-hot-loader";
import { NoMatch, ErrorBoundary } from "components";

import { PROJECT_ROUTES } from "routes";
import Index from "./Samples/Index";

ReactGA.initialize("UA-26882913-1", {
  debug: process.env.NODE_ENV === "development",
  titleCase: false
});

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Index} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(App);
