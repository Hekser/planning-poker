import { Model } from "@rematch/core";

export interface RoomModelState {
  members: string[];
}

const initState: RoomModelState = {
  members: ["Janek", "Dzbanek"]
};

export const RoomModel: Model<RoomModelState> = {
  name: "room",
  state: initState,
  reducers: {}
};
