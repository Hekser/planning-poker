import React, { Component } from "react";
import { EnterFormWrapper, EnterFormSubmitButton } from "./styled";
import { Input } from "../Common/Input";

export interface EnterFormProps {
  type: "create" | "join";
  onSubmit?: (values: EnterFormState) => void;
}

export interface EnterFormState {
  roomName: string;
  nickname: string;
}

export class EnterForm extends Component<EnterFormProps, EnterFormState> {
  state: EnterFormState = {
    nickname: "",
    roomName: ""
  };

  render() {
    const { type, onSubmit } = this.props;
    return (
      <EnterFormWrapper>
        <form
          onSubmit={values => {
            values.preventDefault();
            onSubmit(this.state);
          }}
        >
          <Input
            value={this.state.nickname}
            onChange={e => this.setState({ nickname: e.target.value })}
          />
          <Input
            value={this.state.roomName}
            onChange={e => this.setState({ roomName: e.target.value })}
          />
          <EnterFormSubmitButton>{type}</EnterFormSubmitButton>
        </form>
      </EnterFormWrapper>
    );
  }
}
