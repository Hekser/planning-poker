import React, { FunctionComponent } from "react";

import { Wrapper, MainPageButton } from "./styled";
import Tasks from "../DuringPlanning/Tasks";
import { Link } from "react-router-dom";

const PlanningFinished: FunctionComponent = () => (
  <Wrapper>
    <Tasks displayToolbar={false} />
    <a href="/">
      <MainPageButton>Zakończ</MainPageButton>
    </a>
  </Wrapper>
);

export default PlanningFinished;
