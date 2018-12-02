import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Chat } from "../Chat/Chat";
import { StartPage } from "../StartPage";
import { RoomPage } from "../Room/RoomPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/room" component={RoomPage} />
          <Route path="/" component={StartPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
