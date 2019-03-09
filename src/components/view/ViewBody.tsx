import React from "react";
import { Link } from "react-router-dom";

import config from "../../config";
import {
  IDominoView,
  IDominoViewColumn,
  IDominoViewRow,
  IDominoParam
} from "../../interfaces";
import { Pagination } from "../Pagination";
import { ButtonExpandableToggle } from "./ButtonExpandableToggle";
import {
  getRowClassNames,
  getColumnClassNames,
  getCellStyle
} from "./view.util";

interface Props {
  dbid: string;
  data: {
    view: IDominoView;
    param: IDominoParam;
  };
  onDocumentHover: (row: IDominoViewRow) => void;
  onDocumentClick: (row: IDominoViewRow) => void;
  onExpandableClick: (row: IDominoViewRow) => void;
  onChangePage: (parameter: string, page: number) => void;
}

interface State {
  selectedIds: string[];
}

class ViewBody extends React.Component<Props, State> {
  getDocumentLinkProps(unid: string) {
    return {
      pathname: config.URL_DOCUMENT,
      search: `?dbid=${this.props.dbid}&database=${
        this.props.data.param.database
      }&document=${unid}`
    };
  }

  renderDocumentLink(column: IDominoViewColumn, unid: string, value: string) {
    if (!unid) {
      return value;
    }

    if (this.props.data.param.readOnly) {
      return (
        <span className="view__text" style={getCellStyle(column)}>
          {value}
        </span>
      );
    }

    return (
      <span className="view__text">
        <Link
          className="view__link"
          style={getCellStyle(column)}
          to={this.getDocumentLinkProps(unid)}
        >
          {value}
        </Link>
      </span>
    );
  }

  renderCell(
    row: IDominoViewRow,
    column: IDominoViewColumn,
    colSpan: number,
    value: string
  ) {
    if (!value) {
      return <td className={getColumnClassNames(column)} colSpan={colSpan} />;
    }

    if (column.icon) {
      const { iconPath, iconPrfx, iconExt } = this.props.data.param;
      return (
        <td className="view__col view__col--icon">
          <img src={`${iconPath}${iconPrfx}${value}${iconExt}`} />
        </td>
      );
    } else if (value === this.props.data.param.indentValue) {
      return <td className="view__col view__col--category-indent" />;
    }

    switch (row.type) {
      case "TOTAL":
        return (
          <td>
            <span className="view__total-count">{value}</span>
          </td>
        );
      case "CATEGORY":
        if (column.twistie) {
          return (
            <td
              className="view__col"
              colSpan={colSpan}
              style={getCellStyle(column)}
            >
              <ButtonExpandableToggle
                row={row}
                onClick={this.props.onExpandableClick}
              />
              {value}
            </td>
          );
        }
        break;
    }

    let indenter = null;
    if (column.twistie && row.type === "RESPONSE") {
      indenter = (
        <div className="view__response-indent">
          <div
            className={`view__response-indent-level __il${row.indentLevel}`}
          />
        </div>
      );
    }

    return (
      <td className="view__col" colSpan={colSpan}>
        {indenter}
        {column.twistie && (
          <ButtonExpandableToggle
            row={row}
            onClick={this.props.onExpandableClick}
          />
        )}
        {this.renderDocumentLink(column, row.unid, value)}
      </td>
    );
  }

  render() {
    const {
      data: { view, param },
      onDocumentHover,
      onChangePage
    } = this.props;
    let rowCellsCount: number,
      colCount: number,
      colSpan = 0,
      checkColSpan = false;

    return (
      <tbody>
        {view.rows.map(row => {
          rowCellsCount = row.cells.length;
          colCount = Math.max(view.cols.length, view.columnCount);
          checkColSpan = colCount > rowCellsCount;
          colSpan = 0;

          if (row.pageable) {
            if (param.selectable) {
              colCount++;
            }
            return (
              <tr key={row.pageable.query} className="view__sub-pagination">
                <td className="view__col" colSpan={colCount}>
                  <Pagination {...row.pageable} onChange={onChangePage} />
                </td>
              </tr>
            );
          }

          return (
            <tr
              className={getRowClassNames(row)}
              key={param.viewName + row.pos}
              data-pos={row.pos}
              onMouseEnter={() => onDocumentHover(row)}
            >
              {param.selectable && (
                <td className="view__col view__col--select">
                  {(row.type === "DOCUMENT" || row.type === "RESPONSE") && (
                    <label className="view__select-label">
                      <input
                        type={param.multiSelect ? "checkbox" : "radio"}
                        className="view__select-input"
                        name="document"
                      />
                    </label>
                  )}
                </td>
              )}
              {row.cells.map((value, index) => {
                if (checkColSpan) {
                  // isLastRowCell = index + 1 === rowCellsCount;
                  if (index + 1 === rowCellsCount) {
                    colSpan = colCount - index;
                  }
                }

                return this.renderCell(row, view.cols[index], colSpan, value);
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default ViewBody;
