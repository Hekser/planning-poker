import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styled";
import { Task, TaskStatus } from "../../../../model";
import { RootState } from "../../../../../../config/rematch";
import Element from "./Element";
import { WithSignalR } from "../../../../../Common/HOC/SignalR";

interface Props {
  tasks: Task[];
  displayAdminButtons: boolean;
}

const List: FunctionComponent<Props> = ({ tasks, displayAdminButtons }) => (
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
                displayAdminButtons
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
  return {
    tasks: state.room.tasks
  };
};

export default connect(mapState)(List);
