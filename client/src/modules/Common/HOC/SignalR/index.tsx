import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import { ROOM_PATH, ENTRY_ROOM_PATH } from "../../../../config/paths";
import { RootState, Dispatch } from "../../../../config/rematch";
import { RoomStatus } from "../../../Room/model";

const HUB_URL = "http://localhost:7000/roomHub";

type CreateRoomMethod = (nickname: string, roomName: string) => void;
type JoinRoomMethod = (values: { nickname: string; roomName: string }) => void;
type RefreshRoomMethod = (values: { roomName: string }) => void;
type EmptyFunction = () => void;

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
  startPlanning: EmptyFunction;
}

interface SignalRDispatchProps {
  changeMembers: (member: Member[]) => void;
  changeConnectionId: (connectionId: string) => void;
  changeStatus: (newStatus: RoomStatus) => void;
}

export interface SignalRHOCProps {
  children?: (props: SignalRHOCMethods) => ReactNode;
}

interface SignalRHOCState {}

class WithSignalRComponent extends Component<
  SignalRHOCProps & SignalRDispatchProps & RouteComponentProps,
  SignalRHOCState
> {
  static connection: SignalR.HubConnection;

  constructor(
    props: SignalRHOCProps & SignalRDispatchProps & RouteComponentProps
  ) {
    super(props);

    const {
      history,
      changeMembers,
      changeConnectionId,
      changeStatus
    } = this.props;

    if (!WithSignalRComponent.connection) {
      WithSignalRComponent.connection = new SignalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .build();

      WithSignalRComponent.connection.on(
        "onConnected",
        (connectionId: string) => {
          changeConnectionId(connectionId);
        }
      );

      WithSignalRComponent.connection.onclose(() => changeConnectionId(null));

      WithSignalRComponent.connection.on("createRoom", res => {
        history.push(ENTRY_ROOM_PATH);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.on("joinRoom", res => {
        history.push(ENTRY_ROOM_PATH);
        this.refreshRoom({ roomName: res });
      });

      WithSignalRComponent.connection.on("refreshRoom", membersStringify => {
        const members = JSON.parse(membersStringify);
        changeMembers(members);
      });

      WithSignalRComponent.connection.on("planningStarted", () => {
        changeStatus("duringPlanning");
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

  startPlanning: EmptyFunction = () =>
    WithSignalRComponent.connection.invoke("startPlanning");

  render() {
    return this.props.children
      ? this.props.children({
          createRoom: this.createRoom,
          joinRoom: this.joinRoom,
          refreshRoom: this.refreshRoom,
          startPlanning: this.startPlanning
        })
      : null;
  }
}

const mapState = (state: RootState) => ({ members: state.room.members });

const mapDispatch = (dispatch: Dispatch) => ({
  changeMembers: dispatch.room.changeMembers as unknown,
  changeConnectionId: dispatch.user.changeConnectionId as unknown,
  changeStatus: dispatch.room.changeStatus as unknown
});

export const WithSignalR = withRouter<SignalRHOCProps & RouteComponentProps>(
  connect(
    mapState,
    mapDispatch
  )(WithSignalRComponent)
);
