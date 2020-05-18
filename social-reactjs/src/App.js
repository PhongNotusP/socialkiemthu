import React, { Component } from "react";
import store from "./store";
import routes from "./routes";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";
import cookieService from "./utils/cookieService";
import "./app.css";
//Route
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

if (cookieService.readCookie("jwtToken") !== null) {
  setAuthToken(cookieService.readCookie("jwtToken"));
  try {
    const decoded = jwt_decode(cookieService.readCookie("jwtToken"));
    if (decoded.exp) {
      store.dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
      }
    } else {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    }
  } catch (error) {
    console.log("Error");
  }
}
class App extends Component {
  showContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        if (route.path !== "/login" && route.path !== "/register") {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
              layout={route.layout}
            />
          );
        } else {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
              layout={route.layout}
            />
          );
        }
      });
    }
    return <Switch>{result}</Switch>;
  };
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="wrapper">
            <Header />
            {this.showContent(routes)}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
