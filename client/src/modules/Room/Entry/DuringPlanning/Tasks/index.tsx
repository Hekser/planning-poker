import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper, Content } from "./styled";
import Toolbar from "./Toolbar";
import List from "./List";
import { RootState } from "../../../../../config/rematch";
import { MemberRole } from "../../../../Common/HOC/SignalR/interfaces";

interface Props {
  amIAdmin: boolean;
}

const Tasks: FunctionComponent<Props> = ({ amIAdmin }) => (
  <Wrapper>
    <Content>
      <List />
    </Content>
    {amIAdmin && <Toolbar />}
  </Wrapper>
);

const mapState = (state: RootState) => {
  const roomAdmin = state.room.members.find(m => m.Role === MemberRole.Admin);
  return {
    amIAdmin: roomAdmin && roomAdmin.ConnectionId === state.user.ConnectionId
  };
};

export default connect(mapState)(Tasks);
