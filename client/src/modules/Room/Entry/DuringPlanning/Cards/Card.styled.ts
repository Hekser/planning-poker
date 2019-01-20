import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100px;
  height: 160px;
  background-color: #eeeeee;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: rotateX(30deg);
  }
`;

export const TopLeft = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const BottomRight = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
