import { createModel } from "@rematch/core";
import { Member, MemberRole } from "../Common/HOC/SignalR/interfaces";

export type RoomStatus = "beforeStart" | "duringPlanning" | "planningFinished";

export enum TaskStatus {
  notEstimated = 1,
  duringEstimation = 2,
  estimated = 3
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  estimatedTime?: number;
}

export interface ProposeEstimationTime {
  connectionId: string;
  estimationTimePropose?: number;
}

export interface RoomModelState {
  status: RoomStatus;
  members: Member[];
  tasks: Task[];
  isEstimating: boolean;
  proposeEstimationTime: ProposeEstimationTime[];
}

const initState: RoomModelState = {
  status: "beforeStart",
  members: [],
  isEstimating: false,
  proposeEstimationTime: [],
  tasks: []
};

export const RoomModel = createModel({
  name: "room",
  state: initState,
  reducers: {
    changeMembers(state, members: Member[]) {
      return { ...state, members };
    },
    changeStatus(state, status: RoomStatus) {
      return { ...state, status };
    },
    addTask(state, task: Task) {
      return { ...state, tasks: [...state.tasks, task] };
    },
    changeTask(state, newTask: Task) {
      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex(t => t.id === newTask.id);
      if (taskIndex > -1) {
        tasks[taskIndex] = newTask;
      }
      return { ...state, tasks, proposeEstimationTime: [] };
    },
    setEstimating(state, value: boolean) {
      return { ...state, isEstimating: value };
    },
    proposeEstimationTime(
      state,
      proposedEstimationTime: ProposeEstimationTime
    ) {
      const proposeEstimationTime = [...state.proposeEstimationTime];
      const elementIndex = proposeEstimationTime.findIndex(
        p => p.connectionId === proposedEstimationTime.connectionId
      );
      if (elementIndex > -1) {
        proposeEstimationTime[elementIndex] = proposedEstimationTime;
      } else {
        proposeEstimationTime.push(proposedEstimationTime);
      }
      return {
        ...state,
        proposeEstimationTime
      };
    },
    clearProposeEstimationTimeList(state) {
      return {
        ...state,
        proposeEstimationTime: []
      };
    }
  }
});
