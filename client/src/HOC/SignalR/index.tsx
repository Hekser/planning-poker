import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { ROOM_PATH } from "../../paths";

const HUB_URL = "http://localhost:7000/roomHub";

type CreateRoomMethod = (nickname: string, roomName: string) => void;
type JoinRoomMethod = (values: { nickname: string; roomName: string }) => void;
type RefreshRoomMethod = (values: { roomName: string }) => void;
type OnRoomRefreshedMethod = (values: { members: Member[] }) => void;

export interface Member {
  MemberId: string;
  Nick: string;
  Role: MemberRole;
}

export enum MemberRole {
  "Admin" = 1,
  "Member" = 2
}

interface SignalRHOCMethods {
  createRoom: CreateRoomMethod;
  joinRoom: JoinRoomMethod;
  refreshRoom: RefreshRoomMethod;
}

export interface SignalRHOCProps {
  onRoomRefreshed?: OnRoomRefreshedMethod;
  children?: (props: SignalRHOCMethods) => ReactNode;
}

interface SignalRHOCState {}

class WithSignalRComponent extends Component<
  SignalRHOCProps & RouteComponentProps,
  SignalRHOCState
> {
  static connection: SignalR.HubConnection;

  constructor(props) {
    super(props);

    const { history, onRoomRefreshed } = this.props;

    if (!WithSignalRComponent.connection) {
      WithSignalRComponent.connection = new SignalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .build();

      WithSignalRComponent.connection.on("createRoom", res => {
        history.push(`${ROOM_PATH}/${res}`);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.on("joinRoom", res => {
        history.push(`${ROOM_PATH}/${res}`);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.start();
    }

    if (onRoomRefreshed) {
      WithSignalRComponent.connection.on("refreshRoom", membersStringify => {
        const members = JSON.parse(membersStringify);
        onRoomRefreshed({ members });
      });
    }
  }

  createRoom: CreateRoomMethod = (nickname, roomName) =>
    WithSignalRComponent.connection.invoke("createRoom", nickname, roomName);

  joinRoom: JoinRoomMethod = ({ nickname, roomName }) =>
    WithSignalRComponent.connection.invoke("joinRoom", nickname, roomName);

  refreshRoom: RefreshRoomMethod = ({ roomName }) =>
    WithSignalRComponent.connection.invoke("refreshRoom", roomName);

  render() {
    return this.props.children
      ? this.props.children({
          createRoom: this.createRoom,
          joinRoom: this.joinRoom,
          refreshRoom: this.refreshRoom
        })
      : null;
  }
}

export const WithSignalR = withRouter<SignalRHOCProps & RouteComponentProps>(
  WithSignalRComponent
);
