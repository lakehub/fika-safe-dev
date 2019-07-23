
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Login from "views/examples/Login.jsx";
import Logs from "views/examples/Tables.jsx";
import NewSacco from "components/NewSacco.jsx";
import AdminProfile from "views/examples/AdminProfile.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },

  {
    path: "/user-profile",
    name: "Sacco Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/logs",
    name: "Logs",
    icon: "ni ni-bullet-list-67 text-red",
    component: Logs,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/new",
    component: NewSacco,
    layout: "/admin"
  },
  {
    path: "/admin-profile",
    component: AdminProfile,
    layout: "/admin"
  },

];
export default routes;
