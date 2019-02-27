import React from "react";

import { IDominoViewColumn } from "../../interfaces";

interface Props {
  columns: IDominoViewColumn[];
  onChangeView: (viewName: string) => void;
  onSort: (column: IDominoViewColumn) => void;
}

class ViewHead extends React.PureComponent<Props> {
  renderChangeViewButton(column: IDominoViewColumn) {
    const names = column.resortToViewName.split("|"),
      viewName = names.length ? names[names.length - 1] : names[0];

    return (
      <button
        type="button"
        className="view__change-view-btn"
        onClick={() => {
          this.props.onChangeView(viewName);
        }}
      >
        {column.title}
      </button>
    );
  }

  renderSortButton(column: IDominoViewColumn) {
    let sortCls;

    if (column.sort === column.sorted) {
      sortCls = `${column.sorted.toLowerCase()}-active`;
    } else {
      switch (column.sorted) {
        case "ASC":
          sortCls = "both-asc";
          break;
        case "DESC":
          sortCls = "both-desc";
          break;
        default:
          sortCls = column.sort.toLowerCase();
          break;
      }
    }

    return (
      <button
        type="button"
        className={`view__sort-btn __${sortCls}`}
        name="sort"
        value={`${column.index},${sortCls}`}
        onClick={() => {
          this.props.onSort(column);
        }}
      >
        {column.title}
      </button>
    );
  }

  renderColumnTitle(column: IDominoViewColumn) {
    if (column.resortToViewName) {
      return this.renderChangeViewButton(column);
    } else if (column.sort) {
      return this.renderSortButton(column);
    }

    return column.title;
  }

  getColCssClassName(column: IDominoViewColumn): string {
    if (column.icon) {
      return "view__col view__col--icon";
    } else if (column.category) {
      return "view__col view__col--category-indent";
    }
    return "view__col";
  }

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr className="view__head">
          {columns.map(column => (
            <th className={this.getColCssClassName(column)}>
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
