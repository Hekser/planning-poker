import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { ROOM_PATH } from "../../paths";

const HUB_URL = "http://localhost:7000/roomHub";

type CreateRoomMethod = (nickname: string, roomName: string) => void;

interface SignalRHOCMethods {
  messages: string[];
  createRoom: CreateRoomMethod;
}

export interface SignalRHOCProps {
  children: (foo: SignalRHOCMethods) => ReactNode;
}

interface SignalRHOCState {
  messages: string[];
}

class WithSignalRComponent extends Component<SignalRHOCProps & RouteComponentProps, SignalRHOCState> {
  static connection: SignalR.HubConnection;

  state: SignalRHOCState = {
    messages: []
  };

  constructor(props) {
    super(props);

    const { history } = this.props;

    if (!WithSignalRComponent.connection) {
      WithSignalRComponent.connection = new SignalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .build();

      WithSignalRComponent.connection.on("receiveMessage", message => {
        this.setState({
          messages: [...this.state.messages, `${message}`]
        });
      });

      WithSignalRComponent.connection.on("generateRoomName", roomName => {
        this.setState({
          messages: [...this.state.messages, `Created room ${roomName}`]
        });
      });

      WithSignalRComponent.connection.on("memberJoined", res => {
        this.setState({ messages: [...this.state.messages, `${res}`] });
      });

      WithSignalRComponent.connection.on("createRoom", res => {
        history.push(`${ROOM_PATH}/${res}`)
      });

      WithSignalRComponent.connection.start();
    }
  }

  createRoom: CreateRoomMethod = (nickname, roomName) =>
    WithSignalRComponent.connection.invoke("createRoom", nickname, roomName);

  render() {
    return this.props.children({
      messages: this.state.messages,
      createRoom: this.createRoom
    });
  }
}

export const WithSignalR = withRouter(WithSignalRComponent)
