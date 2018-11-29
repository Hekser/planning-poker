import React, { Component } from 'react';
import * as SignalR from '@aspnet/signalr';

interface ChattProps { }
interface ChatState {
  user: string;
  messages: string[];
}

export class Chat extends Component<ChattProps, ChatState> {
  constructor(props: ChatState) {
    super(props);

    this.state = {
      user: 'Hekser',
      messages: []
    }
  }

  componentDidMount = () => {
    let connection = new SignalR.HubConnectionBuilder()
      .withUrl("http://localhost:7000/roomHub")
      .build();
 
    connection.on("receiveMessage", (user, message) => {
      this.setState({ messages: [ ...this.state.messages, `${user}: ${message}` ] })
    });
 
    connection
      .start()
      .then(() => connection.invoke("sendMessage", this.state.user, "Hello"))
      .catch(err => console.log('Error while establishing connection.'));
  }
  
  getMessages() {
    const messages = [];
    for (let i = 0; i < this.state.messages.length; i++) {
      messages.push(<li>{this.state.messages[i]}</li>);
    }
    return messages;
  }

  render() {
    return <ul>
      { this.getMessages() }
    </ul>;
  }
}
