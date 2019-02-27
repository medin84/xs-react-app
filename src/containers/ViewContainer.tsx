import React from "react";
import { match, RouteComponentProps, withRouter } from "react-router-dom";

import { IDominoView, IDominoViewColumn, IDominoViewRow } from "../interfaces";
import { apiService } from "../api/api.service";
import View from "../components/view/View";
import Pagination from "../components/Pagination";

interface ModulePageRouteProps extends RouteComponentProps {
  moduleId: string;
  match: match<any>;
}

interface ModulePageRouteState {
  data: {
    view: IDominoView;
    param: any;
  };
}

class ViewContainer extends React.Component<
  ModulePageRouteProps,
  ModulePageRouteState
> {
  mounted: boolean = false;
  unlisten: any;
  promise: any;

  constructor(props: ModulePageRouteProps, state: ModulePageRouteState) {
    super(props, state);

    this.handleDocumentHover = this.handleDocumentHover.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleExpandableClick = this.handleExpandableClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.unlisten = this.props.history.listen((location: any, action: any) => {
      if (this.props.location.pathname === location.pathname) {
        // console.log("View::history.listen", location, this.props);
        this.fetchView(location);
      }
    });
    this.fetchView(this.props.history.location);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unlisten && this.unlisten();
    this.unlisten = null;
    // this.promise.abort();
  }

  fetchView(location: any) {
    if (!this.mounted) {
      return;
    }

    // const params = new URLSearchParams(location.search);
    this.promise = apiService.getViewEntries(location.search).then(response => {
      if (!this.mounted) {
        return;
      }

      this.setState({
        data: response
      });
    });
  }

  handleDocumentHover(row: IDominoViewRow) {
    // console.log("handleDocumentHover", row);
  }

  handleDocumentClick(row: IDominoViewRow) {
    console.log("handleDocumentClick", row);
  }

  handleExpandableClick(row: IDominoViewRow) {
    let { search } = this.props.location;
    const params = new URLSearchParams(search);
    params.delete("collapse");
    params.delete("expand");
    params.set(row.expanded ? "collapse" : "expand", row.pos);

    this.fetchView({ search: `?${params}` });
  }

  handleSort(column: IDominoViewColumn) {
    const { pathname, search } = this.props.location,
      params = new URLSearchParams(search);
    let sortDirection = null;

    switch (column.sort) {
      case "ASC":
      case "DESC":
        if (column.sort !== column.sorted) {
          sortDirection = column.sort.toLowerCase();
        }
        break;
      case "BOTH":
        switch (column.sorted) {
          case "ASC":
            sortDirection = null;
            break;
          case "DESC":
            sortDirection = "asc";
            break;
          default:
            sortDirection = "desc";
            break;
        }
        break;
    }

    if (sortDirection) {
      params.set("sort", `${column.index},${sortDirection}`);
    } else {
      params.delete("sort");
    }
    params.delete("page");

    this.props.history.push(`${pathname}?${params}`);
  }

  handleChangeView(viewName: string) {
    let { pathname, search } = this.props.location;
    const params = new URLSearchParams(search);
    params.set("view", viewName);
    params.delete("sort");
    params.delete("page");

    this.props.history.push(`${pathname}?${params}`);
  }

  handleChangePage(parameter: string, page: number) {
    console.log("handleChangePage", parameter, page);

    let { pathname, search } = this.props.location;
    const params = new URLSearchParams(search);
    params.set(parameter, `${page}`);

    this.props.history.push(`${pathname}?${params}`);
  }

  render() {
    if (!this.mounted || !this.state) {
      return null;
    }

    const {
      match: {
        params: { moduleId }
      }
    } = this.props;
    const { view, param } = this.state.data;

    return (
      <>
        <header className="content-header">
          <h1 className="content-title">{param.viewTitle}</h1>
          <div className="content-actions">
            {view.pageable && (
              <Pagination {...view.pageable} onChange={this.handleChangePage} />
            )}
          </div>
        </header>
        <View
          moduleId={moduleId}
          data={this.state.data}
          selectedIds={[]}
          onDocumentHover={this.handleDocumentHover}
          onDocumentClick={this.handleDocumentClick}
          onExpandableClick={this.handleExpandableClick}
          onSort={this.handleSort}
          onChangeView={this.handleChangeView}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}

export default withRouter(ViewContainer);
