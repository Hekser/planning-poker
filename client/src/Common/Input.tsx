import React from "react";
import styled from "styled-components";

import { InputStyles } from "./styles";

const StyledInput = styled.input`
  ${InputStyles};
  &:focus {
    outline: 2px dashed lightblue;
  }
  width: 100%;
`;

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => <StyledInput {...props} />;
