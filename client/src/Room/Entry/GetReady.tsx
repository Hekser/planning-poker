import React from "react";

import { ParticipantList } from "./ParticipantList";
import { User } from "./interfaces";
import { GetReadyStartButton, GetReadyHeader, GetReadyWrapper } from "./styled";
import { WithSignalR, MemberRole } from "../../HOC/SignalR";

export interface GetReadyProps {
  users: User[];
  onStart?: () => void;
}

export const GetReady = ({ users, onStart }: GetReadyProps) => (
  <GetReadyWrapper>
    <GetReadyHeader>Lista uczestników:</GetReadyHeader>
    <WithSignalR>
      {({ members }) => <ParticipantList users={members.map(m => ({ name: m.Nick, isAdmin: m.Role === MemberRole.Admin }))} />}
    </WithSignalR>
    <GetReadyStartButton onClick={onStart}>
      Rozpocznij planowanie
    </GetReadyStartButton>
  </GetReadyWrapper>
);
