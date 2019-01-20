import React, { Component } from "react";

import {
  Wrapper,
  MainWindow,
  CardsWrapper,
  MembersListWrapper,
  TasksWrapper
} from "./styled";
import MembersList from "../MembersList";
import Tasks from "./Tasks";
import Table from "./Table";
import Cards from "./Cards";

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
        <CardsWrapper>
          <Cards />
        </CardsWrapper>
        <MembersListWrapper>
          <MembersList />
        </MembersListWrapper>
      </Wrapper>
    );
  }
}
