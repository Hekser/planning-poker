import React from "react";

import { EnterForm } from "./EnterForm";
import { WithSignalR } from "../HOC/SignalR";

export const Join = () => (
  <WithSignalR>
    {({ joinRoom }) => <EnterForm type="join" onSubmit={joinRoom} />}
  </WithSignalR>

);
