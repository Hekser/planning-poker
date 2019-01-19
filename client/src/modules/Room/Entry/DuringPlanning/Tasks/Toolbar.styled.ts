import styled from "styled-components";

import { Input } from "../../../../Common/components/Input";

export const Wrapper = styled.div`
  height: 55px;
  display: flex;
  flex-flow: row nowrap;
  & > * + * {
    margin-left: 10px;
  }
`;

export const StyledInput = styled(Input)`
  flex: 1;
`;
