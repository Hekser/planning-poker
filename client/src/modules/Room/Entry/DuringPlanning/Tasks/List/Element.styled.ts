import styled from "styled-components";

import { PaneStyles } from "../../../../../Common/styles";
import { Button } from "../../../../../Common/components/Button";

export const Wrapper = styled.div`
  ${PaneStyles};
  position: relative;
  & + & {
    margin-top: 5px;
  }
`;

export const Badge = styled.div`
  position: absolute;
  padding: 2px 7px;
  opacity: 0.5;
  top: 3px;
  left: 3px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  background-color: #78ba67;
`;

export const EstimateButton = styled(Button)`
  border: none;
  position: absolute;
  padding: 2px 7px;
  opacity: 0.5;
  top: 3px;
  right: 3px;
  font-size: 10px;
`;
