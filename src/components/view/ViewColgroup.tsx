import React from "react";

import { IDominoParam, IDominoViewColumn } from "../../interfaces";
import { getColumnClassNames, getColumnStyle } from "./view.util";

interface Props {
  param: IDominoParam;
  columns: IDominoViewColumn[];
}

export function ViewColgroup(props: Props) {
  const { param, columns } = props,
    lastColIndex = columns.length - 1;

  return (
    <colgroup>
      {param.selectable && <col className="view__col--select" />}
      {columns.map((column, index) => (
        <col
          className={getColumnClassNames(column)}
          style={getColumnStyle(column, index === lastColIndex)}
        />
      ))}
    </colgroup>
  );
}
