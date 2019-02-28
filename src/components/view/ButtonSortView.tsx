import React from "react";

import { IDominoViewColumn } from "../../interfaces";

interface Props {
  column: IDominoViewColumn;
  onClick: (column: IDominoViewColumn) => void;
}

function getClassName(column: IDominoViewColumn) {
  if (column.sort === column.sorted) {
    return `${column.sorted.toLowerCase()}-active`;
  } else {
    switch (column.sorted) {
      case "ASC":
        return "both-asc";
      case "DESC":
        return "both-desc";
      default:
        return column.sort.toLowerCase();
    }
  }
}

export function ButtonSortView(props: Props) {
  const { column, onClick } = props;

  return (
    <button
      type="button"
      className={`view__sort-btn __${getClassName(column)}`}
      onClick={() => {
        onClick(column);
      }}
    >
      {column.title}
    </button>
  );
}
