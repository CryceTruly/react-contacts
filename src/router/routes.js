import { lazy } from "react";
const NotFound = lazy(() => import("../components/common/NoMatch"));
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
    title: "Register",
  },
  {
    path: "/auth/login",
    title: "Login",
    component: LoginContainer,
  },

  {
    path: "/contacts/create",
    title: "Create Contact",
    component: ContactsContainer,
    protected: true,
  },
  {
    path: "/",
    component: Home,
    title: "Contacts",
    protected: true,
    routes: [
      {
        path: "/contacts/detail",
        component: Home,
      },
    ],
  },

  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];

export default routes;
