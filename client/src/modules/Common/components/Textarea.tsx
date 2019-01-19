import styled from "styled-components";

import { InputStyles } from "../styles";

const StyledTextarea = styled.textarea`
  ${InputStyles};
  &:focus {
    outline: 2px dashed lightblue;
  }
  width: 100%;
`;

export const Textarea = StyledTextarea;
