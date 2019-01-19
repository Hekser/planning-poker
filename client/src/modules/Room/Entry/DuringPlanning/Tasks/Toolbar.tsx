import React, { FunctionComponent, Component } from "react";

import { Wrapper } from "./Toolbar.styled";
import { Button } from "../../../../Common/components/Button";
import { Textarea } from "../../../../Common/components/Textarea";
import { WithSignalR } from "../../../../Common/HOC/SignalR";

interface State {
  textarea: string;
}

class Toolbar extends Component<{}, State> {
  state: State = {
    textarea: ""
  };

  changeTextarea = (textarea: string) => this.setState({ textarea });

  render = () => (
    <Wrapper>
      <Textarea
        onChange={({ target: { value } }) => this.changeTextarea(value)}
      />
      <WithSignalR>
        {({ addTask }) => (
          <Button
            onClick={() => {
              addTask(this.state.textarea);
              this.setState({ textarea: "" });
            }}
          >
            Dodaj
          </Button>
        )}
      </WithSignalR>
    </Wrapper>
  );
}

export default Toolbar;
