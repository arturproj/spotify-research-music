import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import RouterApp from "./RoutesApp";
// import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <Provider store={store}>
    <RouterApp />
  </Provider>,
  document.getElementById("root")
);
