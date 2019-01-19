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
  ConnectionId: string;
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
  status: "duringPlanning",
  members: [
    { ConnectionId: "a1", Nick: "Ryszard", Role: MemberRole.Admin },
    { ConnectionId: "m1", Nick: "Mateusz", Role: MemberRole.Member },
    { ConnectionId: "m2", Nick: "Jan", Role: MemberRole.Member },
    { ConnectionId: "m3", Nick: "Adam", Role: MemberRole.Member }
  ],
  isEstimating: false,
  proposeEstimationTime: [
    { ConnectionId: "a1", estimationTimePropose: 2 },
    { ConnectionId: "m1", estimationTimePropose: 3 },
    { ConnectionId: "m2" },
    { ConnectionId: "m3" }
  ],
  tasks: [
    {
      id: 1,
      title: "abc 1",
      status: TaskStatus.notEstimated
    },
    {
      id: 2,
      title: "abc 2",
      status: TaskStatus.estimated,
      estimatedTime: 7
    },
    {
      id: 3,
      title: "abc 3",
      status: TaskStatus.estimated,
      estimatedTime: 5
    },
    {
      id: 4,
      title: "abc 4",
      status: TaskStatus.notEstimated
    },
    {
      id: 5,
      title: "abc 5",
      status: TaskStatus.notEstimated
    },
    {
      id: 6,
      title: "abc 6",
      status: TaskStatus.notEstimated
    },
    {
      id: 7,
      title: "abc 7",
      status: TaskStatus.notEstimated
    }
  ]
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
      tasks[taskIndex] = newTask;
      return { ...state, tasks };
    },
    setEstimating(state, value: boolean) {
      return { ...state, isEstimating: value };
    }
  }
});
