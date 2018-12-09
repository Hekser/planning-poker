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
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 4em;
  color: #442277;
`;

export const StartButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const JoinButton = styled(Button)``;
export const CreateButton = styled(Button)``;

export const EnterFormWrapper = styled.div`
  background-color: white;
  border-radius: 2px;
  width: 96%;
  max-width: 480px;
  padding: 3% 4%;
  & > form {
    display: flex;
    flex-direction: column;
  }
`;
export const EnterFormSubmitButton = styled(Button)`
  margin-top: 20px;
`;
export const EnterFormGroup = styled.div`
  & + & {
    margin-top: 15px;
  }
`;
export const EnterFormLabel = styled.label``;
