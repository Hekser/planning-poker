import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper, Content } from "./styled";
import Toolbar from "./Toolbar";
import List from "./List";

interface Props {
  displayToolbar: boolean;
}

const Tasks: FunctionComponent<Props> = ({ displayToolbar }) => (
  <Wrapper>
    <Content>
      <List displayAdminButtons={displayToolbar} />
    </Content>
    {displayToolbar && <Toolbar />}
  </Wrapper>
);

export default Tasks;
