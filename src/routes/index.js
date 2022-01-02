import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../views/About';
import Contact from '../views/Contact';
import Home from '../views/Home';
import Portfolio from '../views/Portfolio';
import Technologies from '../views/Technologies';
import Account from '../views/Account';
import Timeline from '../views/Timeline';
import ProjectDetails from '../views/ProjectDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/portfolio" component={Portfolio} />
      <Route exact path="/projects/:projectKey" component={ProjectDetails} />
      <Route exact path="/tech" component={Technologies} />
      <Route exact path="/timeline" component={Timeline} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/account" component={Account} />
    </Switch>
  );
}
