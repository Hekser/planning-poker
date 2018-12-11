import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./style.css";
import { Chat } from "../Chat/Chat";
import { Room } from "../Room";
import { ROOM_PATH } from "../paths";
import { AppWrapper } from "./styled";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppWrapper>
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path={ROOM_PATH} component={Room} />
            <Route path="/" component={Room} />
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
