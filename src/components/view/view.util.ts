import { CSSProperties } from "react";

import { IDominoViewColumn, IDominoViewRow } from "../../interfaces";

export function getColumnClassNames(column: IDominoViewColumn): string {
  if (column.icon) {
    return "view__col view__col--icon";
  } else if (column.category) {
    return "view__col view__col--category-indent";
  }
  return "view__col";
}

export function getRowClassNames(row: IDominoViewRow): string {
  switch (row.type) {
    case "CATEGORY":
      return "view__row view__category";
    case "DOCUMENT":
      return "view__row view__doc";
    case "RESPONSE":
      return "view__row view__doc view__doc--response";
    case "TOTAL":
      return "view__row view__total";
    default:
      return "view__row";
  }
}

export function getColumnStyle(
  column: IDominoViewColumn,
  isLast: boolean
): CSSProperties {
  if (column.icon || column.category || isLast) {
    return {};
  }

  return {
    width: column.computedWidth
  };
}

export function getCellStyle(column: IDominoViewColumn): CSSProperties {
  return {
    color: column.color,
    fontWeight: column.fontBold ? "bold" : "normal"
  };
}
