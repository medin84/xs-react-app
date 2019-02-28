import React from "react";

import { IDominoViewColumn } from "../../interfaces";

interface Props {
  column: IDominoViewColumn;
  onClick: (viewName: string) => void;
}

export function ButtonChangeView(props: Props) {
  const { column, onClick } = props,
    names = column.resortToViewName.split("|"),
    viewName = names.length ? names[names.length - 1] : names[0];

  return (
    <button
      type="button"
      className="view__change-view-btn"
      onClick={() => {
        onClick(viewName);
      }}
    >
      {column.title}
    </button>
  );
}
