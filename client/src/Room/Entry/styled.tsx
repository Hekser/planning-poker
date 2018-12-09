import styled, { css } from "styled-components";

import { PaneStyles } from "../../Common/styles";
import { Button } from "../../Common/Button";

export const UsersList = styled.div`
  font-size: 1.2em;
`;
export const UserRow = styled.div`
  padding: 4px 8px;
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const UserRowName = styled.span<{ isAdmin: boolean }>`
  ${props =>
    props.isAdmin &&
    css`
      color: red;
      font-weight: bold;
    `}
`;

export const GetReadyWrapper = styled.div`
  width: 96%;
  max-width: 400px;
  ${PaneStyles};
`;
export const GetReadyHeader = styled.h2`
  font-size: 1.4em;
`;
export const GetReadyStartButton = styled(Button)`
  margin-top: 20px;
`;
