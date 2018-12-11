import React from "react";

import { User } from "./interfaces";
import { UserRow, UserRowName, UsersList } from "./styled";

export interface ParticipantListProps {
  users: User[];
}

export const ParticipantList = ({ users }: ParticipantListProps) => {
  const mappedUsers = users.map((u, i) => (
    <UserRow key={i}>
      <UserRowName isAdmin={u.isAdmin}>{u.name}</UserRowName>
    </UserRow>
  ));
  return <UsersList>{mappedUsers}</UsersList>;
};
