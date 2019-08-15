import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "components/Pages/Dashboard.jsx";
import SaccoLogin from "components/Pages/LoginPage.jsx";
import SaccoLogs from "components/Pages/LogsPage.jsx";
import NewRider from "components/Pages/NewRider.jsx";
import RiderProfile from "components/Pages/RiderProfile.jsx";
import SaccProfile from "components/Pages/ProfilePage.jsx";



import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env);
// import Dashboard from "views/examples/Dashboard.jsx";

// import ResetPassword from "views/examples/ResetPassword.jsx";
// import SaccoProfile from "views/examples/SaccoProfile.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/sacco/login" component={SaccoLogin} />
      <Route path="/sacco/home/:email" component={Dashboard} />
      <Route path="/sacco/logs" component={SaccoLogs} />
      <Route path="/sacco/riders/new-rider/:email" component={NewRider} />
      <Route path="/sacco/my-profile" component={SaccProfile} />
      <Route path="/sacco/riders/rider-profile/:id" component={RiderProfile} />
      {/* <Route path="/reset_password" component={ResetPassword} /> */}
      {/* <Redirect from="/" to="/sacco/login" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
