import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { User } from "./interfaces";
import { GetReady } from "./GetReady";
import { DuringPlanning } from "./DuringPlanning";
import { WithSignalR, MemberRole } from "../../HOC/SignalR";

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
    const users = [];
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
        return (
          <>
            <WithSignalR
              onRoomRefreshed={({ members }) => {
                console.log(members);
                this.setState({
                  users: members.map(m => ({
                    name: m.Nick,
                    isAdmin: m.Role === MemberRole.Admin
                  }))
                });
              }}
            />
            <GetReady users={this.state.users} onStart={this.onStart} />
          </>
        );
      case "duringPlanning":
        return <DuringPlanning />;
    }
  }
}

export const RoomEntry = withRouter(RoomEntryComponent);
