import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { CREATE_ROOM_PATH, JOIN_ROOM_PATH, ROOM_PATH } from "../paths";
import { Wrapper } from "./styled";
import { Create } from "./Create";
import { Join } from "./Join";
import { Start } from "./Start";
import { RoomEntry } from "./Entry";
import { WithSignalR } from "../HOC/SignalR";

export const Room = withRouter(({ match }) => (
  <Wrapper>
    <Switch>
      <Route path={match.path} exact component={Start} />
      <Route path={`${CREATE_ROOM_PATH}`} component={Create} />
      <Route path={`${JOIN_ROOM_PATH}`} component={Join} />
      <Route path={`${ROOM_PATH}/:roomId`} component={RoomEntry} />
    </Switch>
  </Wrapper>
));
