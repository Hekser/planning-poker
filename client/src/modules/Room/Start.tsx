import React from "react";

import { Title, StartButtonsWrapper, CreateButton, JoinButton } from "./styled";
import { withRouter } from "react-router";
import { CREATE_ROOM_PATH, JOIN_ROOM_PATH } from "../../config/paths";

export const Start = withRouter(({ history }) => (
  <div>
    <Title>Planning poker</Title>
    <StartButtonsWrapper>
      <CreateButton onClick={() => history.push(CREATE_ROOM_PATH)}>
        Stwórz pokój
      </CreateButton>
      <JoinButton onClick={() => history.push(JOIN_ROOM_PATH)}>
        Dołącz do pokoju
      </JoinButton>
    </StartButtonsWrapper>
  </div>
));
