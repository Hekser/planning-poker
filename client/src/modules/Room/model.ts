import { Model, createModel } from "@rematch/core";

import { Member } from "../Common/HOC/SignalR";

export interface RoomModelState {
  members: Member[];
}

const initState: RoomModelState = {
  members: []
};

export const RoomModel = createModel({
  name: "room",
  state: initState,
  reducers: {
    changeMembers(state, members: Member[]) {
      state.members = members
      return state
    }
  }
})
