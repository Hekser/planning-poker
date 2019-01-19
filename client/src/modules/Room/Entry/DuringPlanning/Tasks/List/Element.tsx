import React, { FunctionComponent } from "react";

import { Wrapper, Badge, EstimateButton } from "./Element.styled";
import { Task } from "../../../../model";

interface Props {
  task: Task;
  startEstimateTask?: (id: number) => void;
}

const Element: FunctionComponent<Props> = ({ task, startEstimateTask }) => (
  <Wrapper>
    {task.estimatedTime && <Badge>{task.estimatedTime}</Badge>}
    {!task.estimatedTime && startEstimateTask && (
      <EstimateButton onClick={() => startEstimateTask(task.id)}>
        ROZPOCZNIJ SZACOWANIE
      </EstimateButton>
    )}
    {task.title}
  </Wrapper>
);

export default Element;
