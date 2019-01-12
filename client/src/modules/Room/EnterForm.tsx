import React, { Component } from "react";
import {
  EnterFormWrapper,
  EnterFormSubmitButton,
  EnterFormGroup,
  EnterFormLabel
} from "./styled";
import { Input } from "../Common/components/Input";

export interface EnterFormProps {
  type: "create" | "join";
  onSubmit?: (values: EnterFormState) => void;
}

export interface EnterFormState {
  roomName: string;
  nickname: string;
}

const t = {
  create: "stwórz pokój",
  join: "dołącz do pokoju"
};

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
          <EnterFormGroup>
            <EnterFormLabel>
              Nick
              <Input
                value={this.state.nickname}
                onChange={e => this.setState({ nickname: e.target.value })}
              />
            </EnterFormLabel>
          </EnterFormGroup>
          <EnterFormGroup>
            <EnterFormLabel>
              Nazwa pokoju
              <Input
                value={this.state.roomName}
                onChange={e => this.setState({ roomName: e.target.value })}
              />
            </EnterFormLabel>
          </EnterFormGroup>

          <EnterFormSubmitButton>{t[type]}</EnterFormSubmitButton>
        </form>
      </EnterFormWrapper>
    );
  }
}
