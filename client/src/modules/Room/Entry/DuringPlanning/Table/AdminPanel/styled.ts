import styled from "styled-components";

import { Button } from "../../../../../Common/components/Button";
import { Input } from "../../../../../Common/components/Input";

export const Wrapper = styled.div`
  margin-top: 10px;
`;

export const StyledButton = styled(Button)``;

export const StyledInput = styled(Input)``;

export const ConfirmationWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 280px;
  margin: 0 auto;
  & > * + * {
    margin-left: 10px;
  }
`;
