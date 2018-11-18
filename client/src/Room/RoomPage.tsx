import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Room } from ".";

export const RoomPage = withRouter(({ match }) => (
  <Switch>
    <Route path={`${match.path}/:id`} component={Room} />
  </Switch>
));
