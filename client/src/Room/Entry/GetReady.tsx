import React from "react";

import { ParticipantList } from "./ParticipantList";
import { User } from "./interfaces";
import { GetReadyStartButton, GetReadyHeader, GetReadyWrapper } from "./styled";

export interface GetReadyProps {
  users: User[];
  onStart?: () => void;
}

export const GetReady = ({ users, onStart }: GetReadyProps) => (
  <GetReadyWrapper>
    <GetReadyHeader>Lista uczestników:</GetReadyHeader>
    <ParticipantList users={users} />
    <GetReadyStartButton onClick={onStart}>
      Rozpocznij planowanie
    </GetReadyStartButton>
  </GetReadyWrapper>
);
