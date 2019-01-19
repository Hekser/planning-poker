import React, { FunctionComponent } from "react";

import { Wrapper } from "./Toolbar.styled";
import { Button } from "../../../../Common/components/Button";
import { Textarea } from "../../../../Common/components/Textarea";

const Toolbar: FunctionComponent = () => (
  <Wrapper>
    <Textarea />
    <Button>Dodaj</Button>
  </Wrapper>
);

export default Toolbar;
