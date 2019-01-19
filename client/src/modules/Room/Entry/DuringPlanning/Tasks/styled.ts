import styled from "styled-components";

import { PaneStyles } from "../../../../Common/styles";

export const Wrapper = styled.div`
  ${PaneStyles};
  height: 100%;
`;

export const Content = styled.div`
  height: calc(100% - 60px);
`;
