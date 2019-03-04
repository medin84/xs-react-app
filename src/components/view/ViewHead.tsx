import React from "react";

import { IDominoParam, IDominoViewColumn } from "../../interfaces";
import { ButtonChangeView } from "./ButtonChangeView";
import { ButtonSortView } from "./ButtonSortView";
import { getColumnClassNames } from "./view.util";

interface Props {
  param: IDominoParam;
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
          {this.props.param.selectable && (
            <th className="view__col view__col--select">
              <label className="view__select-label view__select-label--all">
                {this.props.param.multiSelect && (
                  <input
                    type="checkbox"
                    className="view__select-input view__select-input--all"
                    name="document--all"
                  />
                )}
              </label>
            </th>
          )}
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
