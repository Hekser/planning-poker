import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";

const HUB_URL = "http://localhost:7000/roomHub";

interface SignalRHOCMethods {
  messages: string[];
}

export interface SignalRHOCProps {
  children: (foo: SignalRHOCMethods) => ReactNode;
}

interface SignalRHOCState {
  messages: string[];
}

export class WithSignalR extends Component<SignalRHOCProps, SignalRHOCState> {
  static connection: SignalR.HubConnection;

  state: SignalRHOCState = {
    messages: []
  };

  constructor(props) {
    super(props);

    if (!WithSignalR.connection) {
      WithSignalR.connection = new SignalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .build();

      WithSignalR.connection.on("receiveMessage", (user, message) => {
        this.setState({
          messages: [...this.state.messages, `${user}: ${message}`]
        });
      });

      WithSignalR.connection.on("generateRoomName", roomName => {
        this.setState({
          messages: [...this.state.messages, `Created room ${roomName}`]
        });
      });

      WithSignalR.connection.on("memberJoined", res => {
        this.setState({ messages: [...this.state.messages, `${res}`] });
      });

      WithSignalR.connection.start();
    }
  }

  render() {
    return this.props.children({ messages: this.state.messages });
  }
}
