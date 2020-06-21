import React, { Suspense } from "react";
// import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./router/routes";
import { GlobalProvider } from "./context/GlobalState";
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </GlobalProvider>
  );
}

export default App;
