import styled from "styled-components";
import { Button } from "../Common/Button";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  border: 1px dotted red;
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 2.6em;
`;

export const StartButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const JoinButton = styled(Button)``;
export const CreateButton = styled(Button)``;
