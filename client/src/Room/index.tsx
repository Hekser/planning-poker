import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { Create } from "./Create";
import { Join } from "./Join";
import { Start } from "./Start";
import { CREATE_ROOM_PATH, JOIN_ROOM_PATH } from "../paths";
import { Content, Wrapper } from "./styled";

export const Room = withRouter(({ match }) => (
  <Wrapper>
    <Switch>
      <Content>
        <Route path={match.path} exact component={Start} />
        <Route path={`${CREATE_ROOM_PATH}`} component={Create} />
        <Route path={`${JOIN_ROOM_PATH}`} component={Join} />
      </Content>
      {/* <Route path={`${ROOM_PATH}/:id`} component={} /> */}
    </Switch>
  </Wrapper>
));
