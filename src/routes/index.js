import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import Home from '../views/Home';
import School from '../views/School';
import NotFound from '../views/NotFound';

const routes = {
  '/': Home,
  '/search': Home,
  '/school/:id': School
};

const App = () => (
  <BrowserRouter>
    <Switch>
      {
        Object.keys(routes).map(route => (
          <Route
            path={route}
            key={route}
            exact
            component={routes[route]}
          />
        ))
      }
      <Route component={NotFound} path="*" />
    </Switch>
  </BrowserRouter>
);

export default App;
