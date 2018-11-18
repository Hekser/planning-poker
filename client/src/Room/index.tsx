import React from "react";
import { withRouter } from "react-router";

export const Room = withRouter(({ match }) => (
  <div>_ROOM:{match.params.id}_</div>
));
