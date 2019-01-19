import styled from "styled-components";

import Tasks from "./Tasks";
import { PaneStyles } from "../../../Common/styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: auto 100px 150px;
  width: 96%;
  height: 96%;
  grid-gap: 1%;
`;

export const MainWindow = styled.div`
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  border: 1px dotted green;
`;

export const TasksList = styled(Tasks)`
  grid-column: 2;
  grid-row: 1;
  border: 1px dotted orange;
`;

export const MembersListWrapper = styled.div`
  ${PaneStyles};
  grid-column: 2;
  grid-row-start: 2;
  grid-row-end: 4;
`;

export const CardsPanel = styled.div`
  grid-column: 1;
  grid-row: 3;
  border: 1px dotted black;
`;