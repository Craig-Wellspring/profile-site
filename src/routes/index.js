import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import ProjectDetails from '../views/ProjectDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/projects/:projectKey" component={ProjectDetails} />
    </Switch>
  );
}
