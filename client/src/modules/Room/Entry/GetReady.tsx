import React from "react";
import { connect } from "react-redux";

import {
  GetReadyStartButton,
  GetReadyHeader,
  GetReadyWrapper,
  UserRow,
  UserRowName,
  GetReadyDescription
} from "./styled";
import { Member, MemberRole } from "../../Common/HOC/SignalR";
import { RootState } from "../../../config/rematch";

export interface GetReadyProps {
  connectionId: string;
  members: Member[];
  onStart?: () => void;
}

const mapState = (state: RootState) => ({
  members: state.room.members,
  connectionId: state.user.ConnectionId
});

export const GetReady = connect(mapState)(
  ({ connectionId, members, onStart }: GetReadyProps) => {
    const admin = members.find(m => m.Role === MemberRole.Admin);
    const amIAdmin = admin && admin.ConnectionId === connectionId;
    return (
      <GetReadyWrapper>
        <GetReadyHeader>Lista uczestników:</GetReadyHeader>
        {members.map(m => (
          <UserRow>
            <UserRowName
              isAdmin={m.Role === MemberRole.Admin}
              isMe={m.ConnectionId === connectionId}
            >
              {m.Nick}
            </UserRowName>
          </UserRow>
        ))}
        {amIAdmin ? (
          <GetReadyStartButton onClick={onStart}>
            Rozpocznij planowanie
          </GetReadyStartButton>
        ) : (
          <GetReadyDescription>
            Poczekaj aż zbiorą się wszyscy uczestnicy i administrator rozpocznie
            planowanie
          </GetReadyDescription>
        )}
      </GetReadyWrapper>
    );
  }
);
