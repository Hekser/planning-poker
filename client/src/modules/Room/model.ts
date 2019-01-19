import { createModel } from "@rematch/core";

import { Member } from "../Common/HOC/SignalR";

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

export interface RoomModelState {
  status: RoomStatus;
  members: Member[];
  tasks: Task[];
}

const initState: RoomModelState = {
  status: "duringPlanning",
  members: [],
  tasks: [
    // {
    //   id: 1,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated
    // },
    // {
    //   id: 2,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated,
    //   estimatedTime: 7
    // },
    // {
    //   id: 3,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated,
    //   estimatedTime: 5
    // },
    // {
    //   id: 4,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated
    // },
    // {
    //   id: 5,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated
    // },
    // {
    //   id: 6,
    //   title:
    //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    //   status: TaskStatus.notEstimated
    // },
    // // {
    // //   id: 7,
    // //   title:
    // //     "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym.",
    // //   status: TaskStatus.notEstimated
    // // }
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
      const tasks = state.tasks;
      const taskIndex = tasks.findIndex(t => t.id === newTask.id);
      tasks[taskIndex] = newTask;
      return { ...state, tasks };
    }
  }
});
