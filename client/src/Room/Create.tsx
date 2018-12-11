import React from "react";

import { EnterForm } from "./EnterForm";

export const Create = () => (
  <EnterForm type="create" onSubmit={values => console.log(values)} />
);
