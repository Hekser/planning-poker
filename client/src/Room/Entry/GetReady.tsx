import React from "react";

import { ParticipantList } from "./ParticipantList";
import { User } from "./interfaces";
import {
  GetReadyStartButton,
  GetReadyHeader,
  GetReadyWrapper,
  UserRow,
  UserRowName
} from "./styled";
import { WithSignalR, MemberRole } from "../../HOC/SignalR";

export interface GetReadyProps {
  users: User[];
  onStart?: () => void;
}

export const GetReady = ({ users, onStart }: GetReadyProps) => (
  <GetReadyWrapper>
    <GetReadyHeader>Lista uczestników:</GetReadyHeader>
    {users.map(u => (
      <UserRow>
        <UserRowName isAdmin={u.isAdmin}>{u.name}</UserRowName>
      </UserRow>
    ))}
    <GetReadyStartButton onClick={onStart}>
      Rozpocznij planowanie
    </GetReadyStartButton>
  </GetReadyWrapper>
);
