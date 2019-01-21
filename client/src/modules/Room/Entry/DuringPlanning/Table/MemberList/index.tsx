import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styled";
import { RootState } from "../../../../../../config/rematch";
import { Member } from "../../../../../Common/HOC/SignalR/interfaces";
import { ProposeEstimationTime } from "../../../../model";
import Element from "./Element";

interface StateProps {
  members: Member[];
  proposeEstimationTime: ProposeEstimationTime[];
}

type Props = StateProps;

const MemberList: FunctionComponent<Props> = ({
  members,
  proposeEstimationTime
}) => (
  <Wrapper>
    {members.map(m => {
      const proposed = proposeEstimationTime.find(
        p => m.ConnectionId === p.connectionId
      );
      return (
        <Element
          key={m.ConnectionId}
          memberNick={m.Nick}
          isEstimated={!!proposed}
          estimatedTime={proposed && proposed.estimationTimePropose}
        />
      );
    })}
  </Wrapper>
);

const mapState = (state: RootState) => ({
  members: state.room.members,
  proposeEstimationTime: state.room.proposeEstimationTime
});

export default connect(mapState)(MemberList);
