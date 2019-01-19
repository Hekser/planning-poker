import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styled";
import { Task, TaskStatus } from "../../../../model";
import { RootState } from "../../../../../../config/rematch";
import Element from "./Element";
import { WithSignalR } from "../../../../../Common/HOC/SignalR";
import { MemberRole } from "../../../../../Common/HOC/SignalR/interfaces";

interface Props {
  tasks: Task[];
  amIAdmin: boolean;
}

const List: FunctionComponent<Props> = ({ tasks, amIAdmin }) => (
  <Wrapper>
    <WithSignalR>
      {({ changeTaskStatus }) =>
        tasks
          .filter(t => t.status !== TaskStatus.duringEstimation)
          .sort((a, b) => a.status - b.status)
          .map(t => (
            <Element
              key={t.id}
              task={t}
              startEstimateTask={
                amIAdmin
                  ? e => changeTaskStatus(e, TaskStatus.duringEstimation)
                  : undefined
              }
            />
          ))
      }
    </WithSignalR>
  </Wrapper>
);

const mapState = (state: RootState) => {
  const roomAdmin = state.room.members.find(m => m.Role === MemberRole.Admin);
  return {
    tasks: state.room.tasks,
    amIAdmin:
      (roomAdmin && roomAdmin.ConnectionId === state.user.ConnectionId) || true
  };
};

export default connect(mapState)(List);
