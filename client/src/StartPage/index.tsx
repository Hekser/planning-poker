import React from "react";
import { withRouter } from "react-router";

import { Button } from "../Common/Button";
import { Container } from "./styled";

export const StartPage = withRouter(props => (
  <Container>
    _START_PAGE_
    <Button onClick={() => {}}>Stwórz nowy pokój</Button>
  </Container>
));
