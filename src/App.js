import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const TheLayout2 = React.lazy(() => import("./containers/TheLayout2"));
const TheLayout3 = React.lazy(() => import("./containers/TheLayout3"));
const TheLayout4 = React.lazy(() => import("./containers/TheLayout4"));
const TheLayout5 = React.lazy(() => import("./containers/TheLayout5"));

// Pages
const Login = React.lazy(() => import("./login/Login"));
const ProcessApprovedLogin = React.lazy(() =>
  import("./login/ProcessApprovedLogin")
);
const ScheduleLogin = React.lazy(() => import("./login/ScheduleLogin"));
const DistributerLogin = React.lazy(() => import("./login/DistributerLogin"));
const CustomerLogin = React.lazy(() => import("./login/CustomerLogin"));
const AdminLogin = React.lazy(() => import("./login/AdminLogin"));

class App extends Component {
  render() {
    if (
      localStorage.getItem("LoginType") === null ||
      localStorage.getItem("LoginType") === "" ||
      localStorage.getItem("LoginType") === undefined
    ) {
      localStorage.setItem("LoginType", "-1");
    }
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "Home");
                return <Login {...props} />;
              }}
            />
            <Route
              exact
              path="/ProcessApprovedLogin"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "ProcessAdmin");
                return <ProcessApprovedLogin {...props} />;
              }}
            />
            <Route
              exact
              path="/ScheduleLogin"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "ScheduleAdmin");
                return <ScheduleLogin {...props} />;
              }}
            />
            <Route
              exact
              path="/DistributerLogin"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "Distributer");
                return <DistributerLogin {...props} />;
              }}
            />
            <Route
              exact
              path="/CustomerLogin"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "Customer");
                return <CustomerLogin {...props} />;
              }}
            />
            <Route
              exact
              path="/AdminLogin"
              name="Home"
              render={(props) => {
                localStorage.setItem("LoginType", "Admin");
                return <AdminLogin {...props} />;
              }}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => {
                console.log(localStorage.getItem("LoginType"));
                if (localStorage.getItem("LoginType") === "Home") {
                  return <TheLayout {...props} />;
                } else if (
                  localStorage.getItem("LoginType") === "ProcessAdmin"
                ) {
                  return <TheLayout2 {...props} />;
                } else if (
                  localStorage.getItem("LoginType") === "Distributer"
                ) {
                  return <TheLayout4 {...props} />;
                } else if (localStorage.getItem("LoginType") === "Customer") {
                  return <TheLayout5 {...props} />;
                } else if (localStorage.getItem("LoginType") === "Admin") {
                  return <TheLayout {...props} />;
                } else {
                  return <TheLayout3 {...props} />;
                }
              }}
            />
            {/* <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout2 {...props} />}
            /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
