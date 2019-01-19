import React, { FunctionComponent } from "react";

import { Wrapper, Content } from "./styled";
import Toolbar from "./Toolbar";
import List from "./List";

const Tasks: FunctionComponent = () => (
  <Wrapper>
    <Content>
      <List />
    </Content>
    <Toolbar />
  </Wrapper>
);

export default Tasks;
