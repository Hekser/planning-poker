import styled from "styled-components";

import { PaneStyles } from "../../../Common/styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: auto 30px 220px;
  width: 96%;
  height: 96%;
  grid-gap: 1%;
`;

export const MainWindow = styled.div`
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
`;

export const TasksWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
  overflow: hidden;
`;

export const MembersListWrapper = styled.div`
  ${PaneStyles};
  grid-column: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  overflow: hidden;
`;

export const CardsWrapper = styled.div`
  grid-column: 1;
  grid-row: 3;
  overflow: hidden;
`;
