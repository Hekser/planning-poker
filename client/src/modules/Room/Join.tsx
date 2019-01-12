import React from "react";

import { EnterForm } from "./EnterForm";
import { WithSignalR } from "../Common/HOC/SignalR";

export const Join = () => (
  <WithSignalR>
    {({ joinRoom }) => <EnterForm type="join" onSubmit={joinRoom} />}
  </WithSignalR>

);
