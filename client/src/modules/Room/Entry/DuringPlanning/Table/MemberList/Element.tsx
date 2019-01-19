import React, { FunctionComponent } from "react";

import { Wrapper, MemberNick, ProposedTimeWrapper } from "./Element.styled";

interface Props {
  memberNick: string;
  isEstimated: boolean;
  estimatedTime?: number;
}

const Element: FunctionComponent<Props> = ({
  memberNick,
  isEstimated,
  estimatedTime
}) => (
  <Wrapper>
    <MemberNick isEstimated={isEstimated}>{memberNick}</MemberNick>
    {estimatedTime && (
      <ProposedTimeWrapper>{estimatedTime}</ProposedTimeWrapper>
    )}
  </Wrapper>
);

export default Element;
