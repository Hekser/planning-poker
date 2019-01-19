import styled from "styled-components";

import { PaneStyles } from "../../../../Common/styles";

export const Wrapper = styled.div`
  ${PaneStyles};
  display: flex;
  flex-flow: column nowrap;
`;

export const Content = styled.div`
  flex: 1;
  border: 1px dotted red;
`;
