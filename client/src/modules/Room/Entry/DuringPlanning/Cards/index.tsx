import React, { FunctionComponent } from "react";

import { Wrapper } from "./styled";
import Card from "./Card";
import { WithSignalR } from "../../../../Common/HOC/SignalR";

const Cards: FunctionComponent = () => (
  <Wrapper>
    <WithSignalR>
      {({ proposeEstimationTime }) =>
        [1, 2, 3, 5, 8].map(v => (
          <Card value={v} onClick={() => proposeEstimationTime(v)} />
        ))
      }
    </WithSignalR>
    {}
  </Wrapper>
);

export default Cards;
