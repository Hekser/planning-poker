import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { UserRow, UserRowName, MembersListWrapper } from "./styled";
import { RootState } from "../../../config/rematch";
import { MemberRole, Member } from "../../Common/HOC/SignalR/interfaces";

interface MembersListProps {
  members: Member[];
  connectionId: string;
}

const mapState = (state: RootState) => ({
  members: state.room.members,
  connectionId: state.user.ConnectionId
});

const MembersList: FunctionComponent<MembersListProps> = ({
  members,
  connectionId
}) => (
  <MembersListWrapper>
    {members.map(m => (
      <UserRow key={m.ConnectionId}>
        <UserRowName
          isAdmin={m.Role === MemberRole.Admin}
          isMe={m.ConnectionId === connectionId}
        >
          {m.Nick}
        </UserRowName>
      </UserRow>
    ))}
  </MembersListWrapper>
);

export default connect(mapState)(MembersList);
