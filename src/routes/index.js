import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Account from '../views/Account';
import ProjectDetails from '../views/ProjectDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/projects/:projectKey" component={ProjectDetails} />
      <Route exact path="/account" component={Account} />
    </Switch>
  );
}
