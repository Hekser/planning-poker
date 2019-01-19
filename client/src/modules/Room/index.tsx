import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import {
  CREATE_ROOM_PATH,
  JOIN_ROOM_PATH,
  ENTRY_ROOM_PATH
} from "../../config/paths";
import { Wrapper } from "./styled";
import { Create } from "./Create";
import { Join } from "./Join";
import { Start } from "./Start";
import { RoomEntry } from "./Entry";

export const Room = withRouter(({ match }) => (
  <Wrapper>
    <Switch>
      <Route path={match.path} exact component={Start} />
      <Route path={`${CREATE_ROOM_PATH}`} component={Create} />
      <Route path={`${JOIN_ROOM_PATH}`} component={Join} />
      <Route path={`${ENTRY_ROOM_PATH}`} component={RoomEntry} />
    </Switch>
  </Wrapper>
));
