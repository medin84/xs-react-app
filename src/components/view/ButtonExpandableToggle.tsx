import React from "react";

import { IDominoViewRow } from "../../interfaces";

const EXPAND_BTN_CLS =
  "view__toggle-response-btn view__toggle-response-btn--expandable";
const COLLAPS_BTN_CLS =
  "view__toggle-response-btn view__toggle-response-btn--collapsible";

interface Props {
  row: IDominoViewRow;
  onClick: (row: IDominoViewRow) => void;
}

export function ButtonExpandableToggle(props: Props) {
  if (!props.row.expandable) {
    return (
      <button type="button" className="view__toggle-response-btn-placeholder" />
    );
  }

  return (
    <button
      type="button"
      className={props.row.expanded ? COLLAPS_BTN_CLS : EXPAND_BTN_CLS}
      onClick={() => {
        props.onClick(props.row);
      }}
    />
  );
}
