import React, { Component } from "react";
import { connect } from "react-redux";

import { Wrapper, StyledButton, ConfirmationWrapper } from "./styled";
import { WithSignalR } from "../../../../../Common/HOC/SignalR";
import { RootState } from "../../../../../../config/rematch";
import { StyledInput } from "../../Tasks/Toolbar.styled";
import { isNumber } from "util";

interface StateProps {
  isEstimating: boolean;
  isAllMembersProposedEstimationTime: boolean;
  avgProposedTime: number;
}

interface State {
  estimatedTime?: number;
}

type Props = StateProps;

class AdminPanel extends Component<Props, State> {
  state: State = {};

  componentDidMount() {
    this.setState({ estimatedTime: this.props.avgProposedTime });
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.avgProposedTime &&
      prevProps.avgProposedTime !== this.props.avgProposedTime
    ) {
      this.setState({ estimatedTime: this.props.avgProposedTime });
    }
  }

  changeEstimationTime = (estimatedTime: number) =>
    this.setState({ estimatedTime });

  render = () => {
    const { isEstimating, isAllMembersProposedEstimationTime } = this.props;
    return (
      <Wrapper>
        <WithSignalR>
          {({ startEstimating, confirmEstimationTime }) =>
            isEstimating ? (
              isAllMembersProposedEstimationTime ? (
                <ConfirmationWrapper>
                  <StyledInput
                    type="number"
                    onChange={() => this.changeEstimationTime}
                    value={this.state.estimatedTime}
                  />
                  <StyledButton
                    onClick={() =>
                      confirmEstimationTime(this.state.estimatedTime)
                    }
                    disabled={!this.state.estimatedTime}
                  >
                    Zatwierdź czas estymacji
                  </StyledButton>
                </ConfirmationWrapper>
              ) : (
                <div>Poczekaj aż wszyscy uczestnicy zaproponują czas</div>
              )
            ) : (
              <StyledButton onClick={startEstimating}>
                Rozpocznij estymację
              </StyledButton>
            )
          }
        </WithSignalR>
      </Wrapper>
    );
  };
}

const mapState = (state: RootState) => {
  const proposedTime = state.room.proposeEstimationTime
    .map(p => p.estimationTimePropose)
    .filter(t => isNumber(t));
  const avgProposedTime = proposedTime.length
    ? Math.round(proposedTime.reduce((a, b) => a + b, 0) / proposedTime.length)
    : 0;

  return {
    isAllMembersProposedEstimationTime:
      state.room.members.length === state.room.proposeEstimationTime.length,
    avgProposedTime
  };
};

export default connect(mapState)(AdminPanel);
