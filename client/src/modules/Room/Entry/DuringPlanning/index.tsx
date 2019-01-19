import React, { Component } from "react";

import {
  Wrapper,
  MainWindow,
  MembersList,
  TasksList,
  CardsPanel
} from "./styled";

export class DuringPlanning extends Component {
  render() {
    return (
      <Wrapper>
        <MainWindow>_MAIN_WINDOW_</MainWindow>
        <TasksList>_TASKS_</TasksList>
        <CardsPanel>_CARDS_</CardsPanel>
        <MembersList />
      </Wrapper>
    );
  }
}
