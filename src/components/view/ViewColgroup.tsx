import React from "react";

import { IDominoViewColumn } from "../../interfaces";

interface Props {
  columns: IDominoViewColumn[];
}

class ViewColgroup extends React.PureComponent<Props> {
  getColCssClassName(column: IDominoViewColumn): string {
    if (column.icon) {
      return "view__col--icon";
    } else if (column.category) {
      return "view__col--category-indent";
    }
    return "";
  }

  getColStyle(column: IDominoViewColumn, isLast: boolean): React.CSSProperties {
    if (column.icon || column.category || isLast) {
      return {};
    }

    return {
      width: column.computedWidth
    };
  }

  render() {
    const { columns } = this.props,
      lastColIndex = columns.length - 1;

    return (
      <colgroup>
        {columns.map((column, index) => (
          <col
            className={this.getColCssClassName(column)}
            style={this.getColStyle(column, index === lastColIndex)}
          />
        ))}
      </colgroup>
    );
  }
}

export default ViewColgroup;
