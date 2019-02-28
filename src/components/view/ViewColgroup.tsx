import React from "react";

import { IDominoViewColumn } from "../../interfaces";
import { getColumnClassNames, getColumnStyle } from "./view.util";

interface Props {
  columns: IDominoViewColumn[];
}

export function ViewColgroup(props: Props) {
  const { columns } = props,
    lastColIndex = columns.length - 1;

  return (
    <colgroup>
      {columns.map((column, index) => (
        <col
          className={getColumnClassNames(column)}
          style={getColumnStyle(column, index === lastColIndex)}
        />
      ))}
    </colgroup>
  );
}
