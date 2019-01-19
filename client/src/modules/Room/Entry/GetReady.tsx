import React from "react";
import { connect } from "react-redux";

import {
  GetReadyStartButton,
  GetReadyHeader,
  GetReadyWrapper,
  GetReadyDescription
} from "./styled";
import { Member, MemberRole, WithSignalR } from "../../Common/HOC/SignalR";
import { RootState, Dispatch } from "../../../config/rematch";
import MembersList from "./MembersList";
import { RoomStatus } from "../model";

export interface GetReadyProps {
  connectionId: string;
  members: Member[];
  changeStatus: (newStatus: RoomStatus) => void;
}

const mapState = (state: RootState) => ({
  members: state.room.members,
  connectionId: state.user.ConnectionId
});

const mapProps = (dispatch: Dispatch) => ({
  changeStatus: dispatch.room.changeStatus as unknown
});

export const GetReady = connect(
  mapState,
  mapProps
)(({ connectionId, members, changeStatus }: GetReadyProps) => {
  const admin = members.find(m => m.Role === MemberRole.Admin);
  const amIAdmin = admin && admin.ConnectionId === connectionId;
  return (
    <GetReadyWrapper>
      <GetReadyHeader>Lista uczestników:</GetReadyHeader>
      <MembersList />
      {amIAdmin ? (
        <WithSignalR>
          {({ startPlanning }) => (
            <GetReadyStartButton onClick={() => startPlanning()}>
              Rozpocznij planowanie
            </GetReadyStartButton>
          )}
        </WithSignalR>
      ) : (
        <GetReadyDescription>
          Poczekaj aż zbiorą się wszyscy uczestnicy i administrator rozpocznie
          planowanie
        </GetReadyDescription>
      )}
    </GetReadyWrapper>
  );
});
