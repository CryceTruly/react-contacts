import { lazy } from "react";

const Register = lazy(() => import("../containers/Auth/Register"));
const LoginContainer = lazy(() => import("../containers/Auth/Login"));
const ContactsContainer = lazy(() =>
  import("../containers/contacts/CreateContact")
);
const Home = lazy(() => import("../containers/contacts/List"));
const routes = [
  {
    path: "/auth/register",
    component: Register,
  },
  {
    path: "/auth/login",
    component: LoginContainer,
  },

  {
    path: "/contacts/create",
    component: ContactsContainer,
  },
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/contacts/detail",
        component: Home,
      },
    ],
  },
];

export default routes;
