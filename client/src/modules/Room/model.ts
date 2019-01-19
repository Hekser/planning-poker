import { createModel } from "@rematch/core";

import { Member } from "../Common/HOC/SignalR";

export type RoomStatus = "beforeStart" | "duringPlanning" | "planningFinished";

export interface RoomModelState {
  status: RoomStatus;
  members: Member[];
}

const initState: RoomModelState = {
  status: "duringPlanning",
  members: []
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
    }
  }
});
