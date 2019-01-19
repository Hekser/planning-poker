import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import { ROOM_PATH, ENTRY_ROOM_PATH } from "../../../../config/paths";
import { RootState, Dispatch } from "../../../../config/rematch";
import { RoomStatus, Task, TaskStatus } from "../../../Room/model";

const HUB_URL = "http://localhost:7000/roomHub";

type CreateRoomMethod = (nickname: string, roomName: string) => void;
type JoinRoomMethod = (values: { nickname: string; roomName: string }) => void;
type RefreshRoomMethod = (values: { roomName: string }) => void;
type EmptyFunction = () => void;
type AddTaskMethod = (title: string) => void;
type ChangeTaskStatusMethod = (id: number, status: TaskStatus) => void;
type ProposeEstimationTimeMethod = (estimationTime: number) => void;
type ConfirmEstimationTimeMethod = (estimationTime: number) => void;

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
  addTask: AddTaskMethod;
  changeTaskStatus: ChangeTaskStatusMethod;
  startEstimating: EmptyFunction;
  proposeEstimationTime: ProposeEstimationTimeMethod;
  confirmEstimationTime: ConfirmEstimationTimeMethod;
  finishPlanning: EmptyFunction;
}

interface SignalRDispatchProps {
  changeMembers: (member: Member[]) => void;
  changeConnectionId: (connectionId: string) => void;
  changeStatus: (newStatus: RoomStatus) => void;
  addTask: (task: Task) => void;
  changeTask: (task: Task) => void;
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
      changeStatus,
      addTask,
      changeTask
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

      WithSignalRComponent.connection.on(
        "taskAdded",
        (taskStringify: string) => {
          const task: Task = JSON.parse(taskStringify);
          console.log("taskAdded", taskStringify, task);
          addTask(task);
        }
      );

      WithSignalRComponent.connection.on(
        "taskChanged",
        (taskStringify: string) => {
          const task: Task = JSON.parse(taskStringify);
          console.log("taskChanged", taskStringify, task);
          changeTask(task);
        }
      );

      WithSignalRComponent.connection.on("estimatingStarted", () => {
        // TODO: set room to estimating status
        console.log("estimatingStarted");
      });

      WithSignalRComponent.connection.on(
        "estimationTimeProposed",
        (connectionId: string) => {
          // TODO: check that user with connectionId proposed estimation time
          console.log("estimationTimeProposed", connectionId);
        }
      );

      WithSignalRComponent.connection.on(
        "estimationFinished",
        (proposedEstimationTimeStringify: string) => {
          // TODO: unset room estimating status and display proposed time
          console.log("estimationFinished", proposedEstimationTimeStringify);
        }
      );

      WithSignalRComponent.connection.on("planningFinished", () => {
        // TODO: set room status to finished
        console.log("planningFinished");
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

  addTask: AddTaskMethod = title =>
    WithSignalRComponent.connection.invoke("addTask", title);

  changeTaskStatus: ChangeTaskStatusMethod = (id, status) =>
    WithSignalRComponent.connection.invoke("changeTaskStatus", id, status);

  startEstimating: EmptyFunction = () =>
    WithSignalRComponent.connection.invoke("startEstimating");

  proposeEstimationTime: ProposeEstimationTimeMethod = proposeTime =>
    WithSignalRComponent.connection.invoke("proposeEstimationTime");

  confirmEstimationTime: ConfirmEstimationTimeMethod = estimationTime =>
    WithSignalRComponent.connection.invoke(
      "confirmEstimationTime",
      estimationTime
    );

  finishPlanning: EmptyFunction = () =>
    WithSignalRComponent.connection.invoke("finishPlanning");

  render() {
    return this.props.children
      ? this.props.children({
          createRoom: this.createRoom,
          joinRoom: this.joinRoom,
          refreshRoom: this.refreshRoom,
          startPlanning: this.startPlanning,
          addTask: this.addTask,
          changeTaskStatus: this.changeTaskStatus,
          startEstimating: this.startEstimating,
          proposeEstimationTime: this.proposeEstimationTime,
          confirmEstimationTime: this.confirmEstimationTime,
          finishPlanning: this.finishPlanning
        })
      : null;
  }
}

const mapState = (state: RootState) => ({ members: state.room.members });

const mapDispatch = (dispatch: Dispatch) => ({
  changeMembers: dispatch.room.changeMembers as unknown,
  changeConnectionId: dispatch.user.changeConnectionId as unknown,
  changeStatus: dispatch.room.changeStatus as unknown,
  addTask: dispatch.room.addTask as unknown,
  changeTask: dispatch.room.changeTask as unknown
});

export const WithSignalR = withRouter<SignalRHOCProps & RouteComponentProps>(
  connect(
    mapState,
    mapDispatch
  )(WithSignalRComponent)
);
