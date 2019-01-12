import React from "react";

import { EnterForm } from "./EnterForm";
import { WithSignalR } from "../Common/HOC/SignalR";

export const Create = () => (
  <WithSignalR>
    {({ createRoom }) => (
      <EnterForm
        type="create"
        onSubmit={values => createRoom(values.nickname, values.roomName)}
      />
    )}
  </WithSignalR>
);
