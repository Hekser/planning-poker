import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styled";
import Card from "./Card";
import { WithSignalR } from "../../../../Common/HOC/SignalR";
import { RootState } from "../../../../../config/rematch";

interface Props {
  isEstimating: boolean;
}

const Cards: FunctionComponent<Props> = ({ isEstimating }) => (
  <Wrapper>
    <WithSignalR>
      {({ proposeEstimationTime }) =>
        [1, 2, 3, 5, 8].map(v => (
          <Card
            value={v}
            onClick={() => proposeEstimationTime(v)}
            disabled={!isEstimating}
          />
        ))
      }
    </WithSignalR>
  </Wrapper>
);

const mapState = (state: RootState) => ({
  isEstimating: state.room.isEstimating
});

export default connect(mapState)(Cards);
