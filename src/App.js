import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import routes from "./router/routes";
import { GlobalProvider } from "./context/GlobalState";
import NotFoundPage from "./components/NotFoundPage";
import { Segment, Item } from "semantic-ui-react";

const RouteWithSubRoutes = (route) => {
  const history = useHistory();
  document.title = route.title;
  if (route.protected && !localStorage.token) {
    history.push("/auth/login");
  }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} {...routes} />}
    />
  );
};

const App = () => {
  const history = useHistory();
  return (
    <GlobalProvider>
      <Router>
        <Suspense
          fallback={
            <Segment size="massive">
              <Item.Description content="Loading" />
            </Segment>
          }
        >
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} history={history} />
            ))}
            <Route path="*" exact component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
};

export default App;
