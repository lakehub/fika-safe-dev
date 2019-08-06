import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Dashboard from 'views/examples/Dashboard.jsx'
import Logs from "views/examples/LogsPage.jsx";
import Login from "views/examples/LoginPage.jsx";
import Profile from "views/examples/ProfilePage.jsx";
import NewSacco from "views/examples/NewSacco.jsx";
import ResetPassword from "views/examples/ResetPassword.jsx";
import SaccoProfile from "views/examples/SaccoProfile.jsx";
import SaccoDashboard from "./SaccoAdmin/Pages/Dashboard.jsx"
import SaccoLogin from "./SaccoAdmin/Pages/LoginPage.jsx"
import SaccoLogs from "./SaccoAdmin/Pages/LogsPage.jsx"
import NewRider from "./SaccoAdmin/Pages/NewRider.jsx"
import RiderProfile from "./SaccoAdmin/Pages/SaccoProfile.jsx"
import SaccProfile from "./SaccoAdmin/Pages/ProfilePage.jsx"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin/home" component={Dashboard} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/logs" component={Logs} />
      <Route path="/admin/new-sacco" component={NewSacco} />
      <Route path="/admin/admin-profile" component={Profile} />
      <Route path="/admin/sacco-profile" component={SaccoProfile} />
      <Route path="/reset_password" component={ResetPassword} />

      <Route path="/sacco/home" component={SaccoDashboard} />
      <Route path="/sacco/login" component={SaccoLogin} />
     <Route path="/sacco/logs" component={SaccoLogs} />
      <Route path="/sacco/new-rider" component={NewRider} />
      <Route path="/sacco/my-profile" component={SaccProfile} />
      <Route path="/sacco/rider-profile" component={RiderProfile} />
      <Route path="/reset_password" component={ResetPassword} />
      <Redirect from="/" to="/admin/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
