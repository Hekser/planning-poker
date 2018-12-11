import React, { Component } from "react";
import {
  EnterFormWrapper,
  EnterFormSubmitButton,
  EnterFormGroup,
  EnterFormLabel
} from "./styled";
import { Input } from "../Common/Input";
// import * as SignalR from '@aspnet/signalr';

export interface EnterFormProps {
  type: "create" | "join";
  onSubmit?: (values: EnterFormState) => void;
}

export interface EnterFormState {
  roomName: string;
  nickname: string;
  // connection: SignalR.HubConnection;
}

const t = {
  create: "stwórz pokój",
  join: "dołącz do pokoju"
};

export class EnterForm extends Component<EnterFormProps, EnterFormState> {
  state: EnterFormState = {
    nickname: "",
    roomName: "",
    // connection: new SignalR.HubConnectionBuilder()
    //   .withUrl("http://localhost:7000/roomHub")
    //   .build(),
  };

  // componentDidMount = () => {
  //   this.state.connection.on("receiveMessage", (message) => {
  //     console.log(message);
  //   });
 
  //   this.state.connection.on("generateRoomName", (roomName) => {
  //   });

  //   this.state.connection.on("refreshRoomMembers", (res) => {
  //     console.log(res);
  //   });

  //   this.state.connection
  //     .start()
  //     .catch(err => console.log('Error while establishing connection.'));
  // }
  
  // componentWillUnmount = () => {
  //   this.state.connection.stop().then(() => {});
  // }
  
  render() {
    const { type, onSubmit } = this.props;
    return (
      <EnterFormWrapper>
        <form
          onSubmit={values => {
            values.preventDefault();
            onSubmit(this.state);
            // this.state.connection.invoke("createRoom", this.state.nickname, this.state.roomName);
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
