import {Route, Switch, BrowserRouter} from 'react-router-dom';
import React from 'react';
import Home from '../views/Home';
import School from '../views/School';
import NotFound from '../views/NotFound';
import EmailSent from '../views/EmailSent';
import MakePayment from '../views/MakePayment';

const routes = {
  '/': Home,
  '/search': Home,
  '/school/:id': School,
  '/email-sent': EmailSent,
  '/payment': MakePayment,
  '/payment/:token': MakePayment
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
