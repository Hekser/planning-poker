import styled from "styled-components";

export const Wrapper = styled.button`
  width: 100px;
  height: 160px;
  background-color: #eeeeee;
  position: relative;
  transition: border 0.2s;
  border: 2px solid #aaaaaa;
  border-radius: 4px;
  font-weight: bold;
  &:enabled {
    &:hover {
      cursor: pointer;
      border: 2px solid lightblue;
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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
