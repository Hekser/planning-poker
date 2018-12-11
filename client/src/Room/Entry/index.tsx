import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { User } from "./interfaces";
import { GetReady } from "./GetReady";

export interface RoomEntryState {
  roomStatus: "beforeStart" | "duringPlanning" | "planningFinished";
  users: User[];
}

export interface RoomEntryProps
  extends RouteComponentProps<{ roomId: string }> {}

class RoomEntryComponent extends Component<RoomEntryProps, RoomEntryState> {
  state: RoomEntryState = {
    roomStatus: "beforeStart",
    users: []
  };
  componentDidMount() {
    const {
      match: {
        params: { roomId }
      }
    } = this.props;
    // TODO: connect with room by id
    // MOCK
    const users = [
      { name: "Andrzej", isAdmin: true },
      { name: "Janusz" },
      { name: "Kazik" },
      { name: "Gosia" }
    ];
    this.setState({
      users
    });
  }

  onStart = () => {
    console.log("<Start planning button clicked>");
    // TODO: Send to api start planning action
    this.setState({ roomStatus: "duringPlanning" });
  };

  render() {
    switch (this.state.roomStatus) {
      case "beforeStart":
        return <GetReady users={this.state.users} onStart={this.onStart} />;
      case "duringPlanning":
        return "_PLANNING_";
    }
  }
}

export const RoomEntry = withRouter(RoomEntryComponent);
