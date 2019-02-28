import React from "react";

import { IDominoViewColumn } from "../../interfaces";
import { ButtonChangeView } from "./ButtonChangeView";
import { ButtonSortView } from "./ButtonSortView";
import { getColumnClassNames } from "./view.util";

interface Props {
  columns: IDominoViewColumn[];
  onChangeView: (viewName: string) => void;
  onSort: (column: IDominoViewColumn) => void;
}

class ViewHead extends React.PureComponent<Props> {
  renderColumnTitle(column: IDominoViewColumn) {
    if (column.resortToViewName) {
      return (
        <ButtonChangeView column={column} onClick={this.props.onChangeView} />
      );
    } else if (column.sort) {
      return <ButtonSortView column={column} onClick={this.props.onSort} />;
    }

    return column.title;
  }

  render() {
    return (
      <thead>
        <tr className="view__head">
          {this.props.columns.map(column => (
            <th className={getColumnClassNames(column)}>
              <div className="view__col-title" title={column.title}>
                {this.renderColumnTitle(column)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default ViewHead;
