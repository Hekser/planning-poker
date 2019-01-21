import React, { Component } from "react";

import {
  Wrapper,
  MainWindow,
  CardsWrapper,
  MembersListWrapper,
  TasksWrapper
} from "./styled";
import MembersList from "../MembersList";
import Tasks from "./Tasks";
import Table from "./Table";
import Cards from "./Cards";
import { connect } from "react-redux";
import { RootState } from "../../../../config/rematch";
import { MemberRole } from "../../../Common/HOC/SignalR/interfaces";
import { WithSignalR } from "../../../Common/HOC/SignalR";
import { Button } from "../../../Common/components/Button";

interface Props {
  amIAdmin: boolean;
}

class DuringPlanning extends Component<Props> {
  render() {
    const { amIAdmin } = this.props;
    return (
      <Wrapper>
        <MainWindow>
          <Table />
        </MainWindow>
        <TasksWrapper>
          <Tasks displayToolbar={amIAdmin} />
        </TasksWrapper>
        <CardsWrapper>
          <Cards />
        </CardsWrapper>
        <MembersListWrapper>
          {this.props.amIAdmin && (
            <WithSignalR>
              {({ finishPlanning }) => (
                <Button onClick={() => finishPlanning()}>
                  Zakończ planowanie
                </Button>
              )}
            </WithSignalR>
          )}
          <MembersList />
        </MembersListWrapper>
      </Wrapper>
    );
  }
}

const mapState = (state: RootState) => {
  const roomAdmin = state.room.members.find(m => m.Role === MemberRole.Admin);
  return {
    amIAdmin: roomAdmin && roomAdmin.ConnectionId === state.user.ConnectionId
  };
};

export default connect(mapState)(DuringPlanning);
