import React from "react";

import {
  IDominoView,
  IDominoViewColumn,
  IDominoViewRow,
  IDominoParam
} from "../../interfaces";
import { ViewColgroup } from "./ViewColgroup";
import ViewHead from "./ViewHead";
import ViewBody from "./ViewBody";

interface ViewProps {
  view: IDominoView;
  param: IDominoParam;
  selectedIds: string[];
  onDocumentHover: (row: IDominoViewRow) => void;
  onDocumentClick: (row: IDominoViewRow) => void;
  onExpandableClick: (row: IDominoViewRow) => void;
  onSort: (column: IDominoViewColumn) => void;
  onChangeView: (viewName: string) => void;
  onChangePage: (parameter: string, page: number) => void;
}

class View extends React.Component<ViewProps> {
  render() {
    const { view, param, onChangeView, onSort } = this.props;
    const hasRows = view.rows && view.rows.length > 0;

    return (
      <div className="view">
        <div className="view__container">
          <table className="view-table">
            <ViewColgroup param={param} columns={view.cols} />
            <ViewHead
              param={param}
              columns={view.cols}
              onChangeView={onChangeView}
              onSort={onSort}
            />
            {hasRows && <ViewBody {...this.props} />}
          </table>
          {!hasRows && (
            <h4 className="view__no-entry">{param.textNoEntries}</h4>
          )}
        </div>
      </div>
    );
  }
}

export default View;
