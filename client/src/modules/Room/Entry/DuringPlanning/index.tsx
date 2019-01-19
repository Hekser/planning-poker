import React, { Component } from "react";

import {
  Wrapper,
  MainWindow,
  CardsPanel,
  MembersListWrapper,
  TasksWrapper
} from "./styled";
import MembersList from "../MembersList";
import Tasks from "./Tasks";
import Table from "./Table";

export class DuringPlanning extends Component {
  render() {
    return (
      <Wrapper>
        <MainWindow>
          <Table />
        </MainWindow>
        <TasksWrapper>
          <Tasks />
        </TasksWrapper>
        <CardsPanel>_CARDS_</CardsPanel>
        <MembersListWrapper>
          <MembersList />
        </MembersListWrapper>
      </Wrapper>
    );
  }
}
