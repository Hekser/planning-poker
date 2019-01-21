import React, { Component, ReactNode } from "react";
import * as SignalR from "@aspnet/signalr";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

import { ROOM_PATH, ENTRY_ROOM_PATH } from "../../../../config/paths";
import { RootState, Dispatch } from "../../../../config/rematch";
import {
  RoomStatus,
  Task,
  TaskStatus,
  ProposeEstimationTime
} from "../../../Room/model";
import { Member } from "./interfaces";
import { HUB_URL } from "../../../../config/const";

type CreateRoomMethod = (nickname: string, roomName: string) => void;
type JoinRoomMethod = (values: { nickname: string; roomName: string }) => void;
type RefreshRoomMethod = (values: { roomName: string }) => void;
type EmptyFunction = () => void;
type AddTaskMethod = (title: string) => void;
type ChangeTaskStatusMethod = (id: number, status: TaskStatus) => void;
type ProposeEstimationTimeMethod = (estimationTime: number) => void;
type ConfirmEstimationTimeMethod = (estimationTime: number) => void;

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
  setEstimating: (value: boolean) => void;
  proposeEstimationTime: (memberPropose: ProposeEstimationTime) => void;
  clearProposeEstimationTimeList: () => void;
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
      changeTask,
      setEstimating,
      proposeEstimationTime,
      clearProposeEstimationTimeList
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

      WithSignalRComponent.connection.on("taskAdded", (task: Task) => {
        addTask(task);
      });

      WithSignalRComponent.connection.on("taskChanged", (task: Task) => {
        changeTask(task);
      });

      WithSignalRComponent.connection.on("estimatingStarted", () => {
        clearProposeEstimationTimeList();
        setEstimating(true);
      });

      WithSignalRComponent.connection.on(
        "estimationTimeProposed",
        (connectionId: string) => {
          proposeEstimationTime({ connectionId });
        }
      );

      WithSignalRComponent.connection.on(
        "estimationFinished",
        (proposedEstimationTime: ProposeEstimationTime[]) => {
          setEstimating(false);
          proposedEstimationTime.map(it => proposeEstimationTime(it));
        }
      );

      WithSignalRComponent.connection.on("planningFinished", () => {
        // TODO: set room status to finished
        console.log("planningFinished");
      });

      WithSignalRComponent.connection.on("errorOccured", (errorMsg: string) => {
        // TODO: set room status to finished
        NotificationManager.error("Wystąpił błąd", errorMsg);
      });

      WithSignalRComponent.connection.start();
    }
  }

  invoke = (methodName: string, ...args: any[]) => {
    WithSignalRComponent.connection &&
      WithSignalRComponent.connection.invoke(methodName, ...args);
  };

  createRoom: CreateRoomMethod = (nickname, roomName) =>
    this.invoke("createRoom", nickname, roomName);

  joinRoom: JoinRoomMethod = ({ nickname, roomName }) =>
    this.invoke("joinRoom", nickname, roomName);

  refreshRoom: RefreshRoomMethod = ({ roomName }) =>
    this.invoke("refreshRoom", roomName);

  startPlanning: EmptyFunction = () => this.invoke("startPlanning");

  addTask: AddTaskMethod = title => {
    this.invoke("addTask", title);

    // TEMP (only for tests)
    // this.props.addTask({
    //   id: new Date().getTime(),
    //   title,
    //   status: TaskStatus.notEstimated
    // });
  };

  changeTaskStatus: ChangeTaskStatusMethod = (id, status) => {
    this.invoke("changeTaskStatus", id, status);

    // TEMP (only for tests)
    // console.log("changeTaskStatus");
    // this.props.changeTask({ id, status, title: "testnow" });
  };

  startEstimating: EmptyFunction = () => {
    this.invoke("startEstimating");

    // TEMP (only for tests)
    // this.props.setEstimating(true);
  };

  proposeEstimationTime: ProposeEstimationTimeMethod = proposeTime =>
    this.invoke("proposeEstimationTime", proposeTime);

  confirmEstimationTime: ConfirmEstimationTimeMethod = estimationTime =>
    this.invoke("confirmEstimationTime", estimationTime);

  finishPlanning: EmptyFunction = () => this.invoke("finishPlanning");

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
  changeTask: dispatch.room.changeTask as unknown,
  setEstimating: dispatch.room.setEstimating as unknown,
  proposeEstimationTime: dispatch.room.proposeEstimationTime as unknown,
  clearProposeEstimationTimeList: dispatch.room
    .clearProposeEstimationTimeList as unknown
});

export const WithSignalR = withRouter<SignalRHOCProps & RouteComponentProps>(
  connect(
    mapState,
    mapDispatch
  )(WithSignalRComponent)
);
