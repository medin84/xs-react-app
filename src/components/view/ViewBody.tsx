import React from "react";
import { Link } from "react-router-dom";

import {
  IDominoView,
  IDominoViewColumn,
  IDominoViewRow
} from "../../interfaces";
import Pagination from "../Pagination";

interface Props {
  moduleId: string;
  data: {
    view: IDominoView;
    param: any;
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
  getColumnStyle(column: IDominoViewColumn): React.CSSProperties {
    return {
      color: column.color,
      fontWeight: column.fontBold ? "bold" : "normal"
    };
  }

  getDocumentLinkProps(unid: string) {
    return {
      pathname: `/bd/${this.props.moduleId}/documents`,
      search: `?database=${this.props.data.param.database}&document=${unid}`
    };
  }

  renderDocumentLink(column: IDominoViewColumn, unid: string, value: string) {
    return (
      <Link
        className="view__link"
        style={this.getColumnStyle(column)}
        to={this.getDocumentLinkProps(unid)}
      >
        {value}
      </Link>
    );
  }

  renderExpandableToggleButton(row: IDominoViewRow) {
    let indentBlock;
    // if (row.indentLevel > 0) {
    //   indentBlock = (
    //     <div className="view__response-indent">
    //       <div
    //         className={`view__response-indent-level __il${row.indentLevel}`}
    //       />
    //     </div>
    //   );
    // }

    if (!row.expandable) {
      return (
        <>
          {indentBlock}
          <button
            type="button"
            className="view__toggle-response-btn-placeholder"
          />
        </>
      );
    }

    return (
      <>
        {indentBlock}
        <button
          type="button"
          className={`view__toggle-response-btn view__toggle-response-btn--${
            row.expanded ? "collapsible" : "expandable"
          }`}
          onClick={() => {
            this.props.onExpandableClick(row);
          }}
        />
      </>
    );
  }

  renderIconTd(icon: string) {
    const { iconPath, iconPrfx, iconExt } = this.props.data.param;
    return (
      <td className="view__col view__col--icon">
        <img src={`${iconPath}${iconPrfx}${icon}${iconExt}`} />
      </td>
    );
  }

  renderCategoryIndentTd() {
    return <td className="view__col view__col--category-indent" />;
  }

  renderTd(
    row: IDominoViewRow,
    column: IDominoViewColumn,
    colSpan: number,
    value: string
  ) {
    if (column.icon) {
      return value ? this.renderIconTd(value) : <td />;
    } else if (value === this.props.data.param.indentValue) {
      return this.renderCategoryIndentTd();
    }

    if (row.type === "TOTAL") {
      return (
        <td>{value && <span className="view__total-count">{value}</span>}</td>
      );
    }

    let showExp;
    if (row.type === "CATEGORY") {
      showExp = column.twistie && !!value;
    } else {
      showExp = column.twistie; // && row.expandable;
    }

    return (
      <td
        className={`view__col ${
          !value && row.expandable && !column.twistie
            ? "view__col--category-indent"
            : ""
        }`}
        colSpan={colSpan}
        style={this.getColumnStyle(column)}
      >
        {showExp && this.renderExpandableToggleButton(row)}
        {value && row.type === "CATEGORY" ? (
          <span style={this.getColumnStyle(column)}>
            {row.unid
              ? this.renderDocumentLink(column, row.unid, value)
              : value}
          </span>
        ) : row.unid && value ? (
          this.renderDocumentLink(column, row.unid, value)
        ) : (
          value
        )}
      </td>
    );
  }

  render() {
    const {
      data: { view, param }
    } = this.props;

    return (
      <tbody>
        {view.rows.map(row => {
          const cellsCount = row.cells.length;
          const colCount =
            view.cols.length > view.columnCount
              ? view.cols.length
              : view.columnCount;
          const b = colCount > cellsCount;

          let indenter = [];
          let rowClassName;
          switch (row.type) {
            case "CATEGORY":
              rowClassName = "view__row view__category";
              break;
            case "DOCUMENT":
              rowClassName = "view__row view__doc";
              break;
            case "RESPONSE":
              rowClassName = "view__row view__doc view__doc--response";
              // for (let i = 0; i < row.indentLevel; i++) {
              //   indenter.push(<td />);
              // }
              break;
            case "TOTAL":
              rowClassName = "view__row view__total";
              break;
          }

          if (row.pageable) {
            return (
              <tr
                key={`pageable-row-${row.pageable.query}`}
                className="view__sub-pagination"
              >
                <td className="view__col" colSpan={colCount}>
                  <Pagination
                    key={`pageable${row.pageable.query}`}
                    {...row.pageable}
                    onChange={this.props.onChangePage}
                  />
                </td>
              </tr>
            );
          }

          return (
            <tr
              className={rowClassName}
              key={`${param.viewName}${row.pos}`}
              data-pos={row.pos}
              onMouseEnter={() => this.props.onDocumentHover(row)}
            >
              {row.cells.map((value, i) => {
                if (b) {
                  const needColspan = b && i + 1 == cellsCount,
                    colSpan = needColspan ? colCount - i : 0;

                  return this.renderTd(row, view.cols[i], colSpan, value);
                }

                return this.renderTd(row, view.cols[i], 0, value);
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default ViewBody;
