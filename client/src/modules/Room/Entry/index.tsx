import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { GetReady } from "./GetReady";
import DuringPlanning from "./DuringPlanning";
import { RoomStatus } from "../model";
import { connect } from "react-redux";
import { RootState } from "../../../config/rematch";
import PlanningFinished from "./PlanningFinished";

export interface RoomEntryState {}

export interface RoomEntryProps
  extends RouteComponentProps<{ roomId: string }> {
  status: RoomStatus;
}

class RoomEntryComponent extends Component<RoomEntryProps, RoomEntryState> {
  render() {
    switch (this.props.status) {
      case "beforeStart":
        return <GetReady />;
      case "duringPlanning":
        return <DuringPlanning />;
      case "planningFinished":
        return <PlanningFinished />;
    }
  }
}

const mapState = (state: RootState) => ({ status: state.room.status });

export const RoomEntry = withRouter(connect(mapState)(RoomEntryComponent));
