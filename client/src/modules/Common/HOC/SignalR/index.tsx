import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import { ROOM_PATH } from "../../../../config/paths";
import { RootState, Dispatch } from "../../../../config/rematch";

const HUB_URL = "http://localhost:7000/roomHub";

type CreateRoomMethod = (nickname: string, roomName: string) => void;
type JoinRoomMethod = (values: { nickname: string; roomName: string }) => void;
type RefreshRoomMethod = (values: { roomName: string }) => void;

export interface Member {
  ConnectionId: string;
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
  children?: (props: SignalRHOCMethods) => ReactNode;
  changeMembers?: (member: Member[]) => void;
}

interface SignalRHOCState { }

class WithSignalRComponent extends Component<
  SignalRHOCProps & RouteComponentProps,
  SignalRHOCState
  > {
  static connection: SignalR.HubConnection;

  constructor(props: SignalRHOCProps & RouteComponentProps) {
    super(props);

    const { history, changeMembers } = this.props;

    if (!WithSignalRComponent.connection) {
      WithSignalRComponent.connection = new SignalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .build();

      WithSignalRComponent.connection.on("onConnected", (connectionId: string) => {
        console.log("onConnected", connectionId)
      });

      WithSignalRComponent.connection.on("createRoom", res => {
        history.push(`${ROOM_PATH}/${res}`);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.on("joinRoom", res => {
        history.push(`${ROOM_PATH}/${res}`);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.on("refreshRoom", membersStringify => {
        const members = JSON.parse(membersStringify)
        changeMembers(members)
      });

      WithSignalRComponent.connection.start();
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

const mapState = (state: RootState) => ({ members: state.room.members });

const mapDispatch = (dispatch: Dispatch) => ({ changeMembers: dispatch.room.changeMembers })

export const WithSignalR = withRouter<SignalRHOCProps & RouteComponentProps>(
  connect(mapState, mapDispatch)(WithSignalRComponent)
);
