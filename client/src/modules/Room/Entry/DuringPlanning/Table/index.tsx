import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper, TaskTitle } from "./styled";
import { Task, TaskStatus } from "../../../model";
import { RootState } from "../../../../../config/rematch";
import { WithSignalR } from "../../../../Common/HOC/SignalR";
import MemberList from "./MemberList";
import { MemberRole } from "../../../../Common/HOC/SignalR/interfaces";
import AdminPanel from "./AdminPanel";

interface StateProps {
  estimatingTask?: Task;
  amIAdmin: boolean;
  isEstimating: boolean;
}

type Props = StateProps;

const Table: FunctionComponent<Props> = ({
  estimatingTask,
  amIAdmin,
  isEstimating
}) => (
  <Wrapper>
    {estimatingTask && (
      <>
        <TaskTitle>{estimatingTask.title}</TaskTitle>
        {isEstimating && <MemberList />}
        {amIAdmin && <AdminPanel isEstimating={isEstimating} />}
      </>
    )}
  </Wrapper>
);

const mapState = (state: RootState) => {
  const roomAdmin = state.room.members.find(m => m.Role === MemberRole.Admin);
  return {
    estimatingTask: state.room.tasks.find(
      t => t.status === TaskStatus.duringEstimation
    ),
    amIAdmin:
      (roomAdmin && roomAdmin.ConnectionId === state.user.ConnectionId) || true,
    isEstimating: state.room.isEstimating
  };
};

export default connect(mapState)(Table);
