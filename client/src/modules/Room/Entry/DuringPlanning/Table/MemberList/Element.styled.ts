import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  & + & {
    border-top: 1px solid #eeeeee;
  }
`;

export const MemberNick = styled.div<{ isEstimated: boolean }>`
  ${props =>
    props.isEstimated &&
    css`
      color: green;
      font-weight: bold;
      &::before {
        content: "✓";
        margin-right: 5px;
      }
    `}
`;

export const ProposedTimeWrapper = styled.div``;
