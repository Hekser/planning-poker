import React, { Component } from 'react';
import * as SignalR from '@aspnet/signalr';

import { Button } from "../Common/Button";

interface ChattProps { }
interface ChatState {
  connection: SignalR.HubConnection;
  user: string;
  messages: string[];
  inputValue: string;
}

export class Chat extends Component<ChattProps, ChatState> {
  constructor(props: ChatState) {
    super(props);

    this.state = {
      connection: new SignalR.HubConnectionBuilder()
        .withUrl("http://localhost:7000/roomHub")
        .build(),
      user: 'Hekser',
      messages: [],
      inputValue: ''
    }
  }

  componentDidMount = () => {
    this.state.connection.on("receiveMessage", (user, message) => {
      this.setState({ messages: [ ...this.state.messages, `${user}: ${message}` ] })
    });
 
    this.state.connection.on("generateRoomName", (roomName) => {
      this.setState({ messages: [ ...this.state.messages, `Created room ${roomName}` ] })
    });

    this.state.connection.on("memberJoined", (res) => {
      this.setState({ messages: [ ...this.state.messages, `${res}` ] })
    });

    this.state.connection
      .start()
      .then(() => this.state.connection.invoke("sendMessage", this.state.user, "Hello"))
      .catch(err => console.log('Error while establishing connection.'));
  }
  
  componentWillUnmount = () => {
    this.state.connection.stop().then(() => {});
  }
  
  getMessages() {
    const messages = [];
    for (let i = 0; i < this.state.messages.length; i++) {
      messages.push(<li>{this.state.messages[i]}</li>);
    }
    return messages;
  }

  createRoom() {
    this.state.connection.invoke("createRoom", this.state.user);
  }

  joinRoom() {
    this.state.connection.invoke("joinRoom", this.state.inputValue);
  }

  updateInputValue(evt: any) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return <div>
      <Button onClick={() => this.createRoom()}>Stwórz nowy pokój</Button>
      <br />
      <input type="text" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="Nazwa pokoju"/>
      <Button onClick={() => this.joinRoom()}>Dołącz do pokoju</Button>
      <ul>
        { this.getMessages() }
      </ul>
    </div>;
  }
}
