import { createModel } from "@rematch/core";

export interface UserModelState {
  ConnectionId?: string;
}

const initState: UserModelState = {};

export const UserModel = createModel({
  name: "user",
  state: initState,
  reducers: {
    changeConnectionId(state, ConnectionId: string) {
      return { ...state, ConnectionId };
    }
  }
});
