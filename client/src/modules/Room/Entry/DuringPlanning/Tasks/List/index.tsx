import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styled";
import { Task } from "../../../../model";
import { RootState } from "../../../../../../config/rematch";
import Element from "./Element";
import { MemberRole, WithSignalR } from "../../../../../Common/HOC/SignalR";

interface Props {
  tasks: Task[];
}

const List: FunctionComponent<Props> = ({ tasks }) => (
  <Wrapper>
    <WithSignalR>
      {({}) =>
        tasks.map(t => (
          <Element task={t} startEstimateTask={e => console.log(e)} />
        ))
      }
    </WithSignalR>
  </Wrapper>
);

const mapState = (state: RootState) => {
  const roomAdmin = state.room.members.find(m => m.Role === MemberRole.Admin);
  return {
    tasks: state.room.tasks,
    amIAdmin: roomAdmin && roomAdmin.ConnectionId === state.user.ConnectionId
  };
};

export default connect(mapState)(List);
