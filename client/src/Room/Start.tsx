import React from "react";

import { Title, StartButtonsWrapper, CreateButton, JoinButton } from "./styled";
import { withRouter } from "react-router";
import { CREATE_ROOM_PATH, JOIN_ROOM_PATH } from "../paths";

export const Start = withRouter(({ history }) => (
  <div>
    <Title>Planning poker</Title>
    <StartButtonsWrapper>
      <CreateButton onClick={() => history.push(CREATE_ROOM_PATH)}>
        Create
      </CreateButton>
      <JoinButton onClick={() => history.push(JOIN_ROOM_PATH)}>Join</JoinButton>
    </StartButtonsWrapper>
  </div>
));
