import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

import "./style.css";
import { Chat } from "../Chat/Chat";
import { Room } from "../Room";
import { ROOM_PATH } from "../../config/paths";
import { AppWrapper } from "./styled";
import store from "../../config/rematch";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <AppWrapper>
            <Switch>
              <Route path="/chat" component={Chat} />
              <Route path={ROOM_PATH} component={Room} />
              <Route path="/" component={Room} />
            </Switch>
            <NotificationContainer />
          </AppWrapper>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
