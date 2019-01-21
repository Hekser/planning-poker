import React, { FunctionComponent } from "react";

import { Wrapper, TopLeft, BottomRight } from "./Card.styled";

interface Props {
  value: number;
  onClick: () => void;
  symbol?: string;
  disabled: boolean;
}

const Card: FunctionComponent<Props> = ({ value, onClick, disabled }) => (
  <Wrapper onClick={onClick} disabled={disabled}>
    <TopLeft>{value}</TopLeft>
    <BottomRight>{value}</BottomRight>
  </Wrapper>
);

export default Card;
