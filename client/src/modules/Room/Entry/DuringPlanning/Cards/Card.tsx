import React, { FunctionComponent } from "react";

import { Wrapper, TopLeft, BottomRight } from "./Card.styled";

interface Props {
  value: number;
  onClick: () => void;
  symbol?: string;
}

const Card: FunctionComponent<Props> = ({ value, onClick }) => (
  <Wrapper onClick={onClick}>
    <TopLeft>{value}</TopLeft>
    <BottomRight>{value}</BottomRight>
  </Wrapper>
);

export default Card;
