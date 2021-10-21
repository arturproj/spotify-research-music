import React from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { connect } from "react-redux";
import { userMapStateToProps, userMapDispatchToProps } from "./redux/store";
import SpamHome from "./layouts/SpamHome";
import SpamRedirect from "./layouts/SpamRedirect";
import SpamDashboard from "./layouts/SpamDashboard";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      Page not found. Go to <a href="/">Home Page</a>
    </React.Fragment>
  );
};

class RouterApp extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount() {
    this.props.userUpdate();

    const { user } = this.props;
    const { isAuthenticated, isExpired } = user;
    this.setState({
      isAuthenticated: isAuthenticated === true && isExpired === false,
    });
  }

  componentDidUpdate() {
    // console.log(this.props);
    // console.log(this.state);
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
                return <SpamRedirect {...props} />;
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
            <Route component={NotFoundPage} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(userMapStateToProps, userMapDispatchToProps)(RouterApp);

// export default RouterApp;
