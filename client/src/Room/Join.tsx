import React from "react";

import { EnterForm } from "./EnterForm";

export const Join = () => (
  <EnterForm type="join" onSubmit={values => console.log(values)} />
);
