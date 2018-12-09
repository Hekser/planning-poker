import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

import { InputStyles } from "./styles";

const StyledButton = styled.button`
  ${InputStyles};
  cursor: pointer;
  user-select: none;
  &:focus {
    outline: none;
  }
`;

const PrimaryButton = styled(StyledButton)`
  background-color: #9977cc;
  border-color: #8866bb;
  color: whitesmoke;
  text-transform: uppercase;
  font-weight: bolder;
  &:hover {
    background-color: #9f7fcf;
  }
`;

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "primary";
}

export const Button = ({ type = "primary", ...props }: ButtonProps) => {
  switch (type) {
    case "primary":
      return <PrimaryButton {...props} />;
  }
};
