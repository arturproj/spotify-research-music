import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { connect } from "react-redux";
import { userMapStateToProps, userMapDispatchToProps } from "./redux/store";
import SpamHome from "./layouts/SpamHome";
import SpamRedirect from "./layouts/SpamRedirect";
import SpamDashboard from "./layouts/SpamDashboard";
import SpamErrorPage from "./layouts/SpamErrorPage";

class RouterApp extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount() {
    this.props.userUpdate();
    console.log();
    const { isAuthenticated, isExpired } = this.props.user;
    this.setState({
      isAuthenticated: isAuthenticated === true && isExpired === false,
    });
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route
              path="/redirect"
              exact={true}
              render={(props) => {
                return isAuthenticated ? (
                  window.location.replace("/")
                ) : (
                  <SpamRedirect {...props} />
                );
              }}
            />
            <Route
              path="/"
              render={(props) => {
                return isAuthenticated ? (
                  <SpamDashboard {...props} />
                ) : (
                  <SpamHome {...props} />
                );
              }}
            />
            <Route component={SpamErrorPage} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(userMapStateToProps, userMapDispatchToProps)(RouterApp);

// export default RouterApp;
