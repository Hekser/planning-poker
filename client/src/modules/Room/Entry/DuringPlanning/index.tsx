import React, { Component } from "react";

import {
  Wrapper,
  MainWindow,
  TasksList,
  CardsPanel,
  MembersListWrapper
} from "./styled";
import MembersList from "../MembersList";

export class DuringPlanning extends Component {
  render() {
    return (
      <Wrapper>
        <MainWindow>_MAIN_WINDOW_</MainWindow>
        <TasksList />
        <CardsPanel>_CARDS_</CardsPanel>
        <MembersListWrapper>
          <MembersList />
        </MembersListWrapper>
      </Wrapper>
    );
  }
}
