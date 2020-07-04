import React, { Suspense } from "react";
// import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import routes from "./router/routes";
import { GlobalProvider } from "./context/GlobalState";
function RouteWithSubRoutes(route) {
  const history = useHistory();
  document.title = route.title;
  if (route.protected && !localStorage.token) {
    history.push("/auth/login");
  }
  return (
    <Route
      path={route.path}
      exact
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} {...routes} />
      )}
    />
  );
}

function App() {
  const history = useHistory();
  return (
    <GlobalProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} history={history} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
}

export default App;
