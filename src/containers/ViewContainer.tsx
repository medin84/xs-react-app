import React from "react";
import { connect } from "react-redux";
import { match, RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import {
  IApplicationState,
  IDominoView,
  IDominoViewColumn,
  IDominoViewRow,
  IDominoParam
} from "../interfaces";
import { apiService } from "../api/api.service";
import View from "../components/view/View";
import { Pagination } from "../components/Pagination";

interface ModulePageRouteProps extends IApplicationState, RouteComponentProps {
  match: match<any>;
}

interface ModulePageRouteState {
  data: {
    view: IDominoView;
    param: IDominoParam;
  };
}

class ViewContainer extends React.Component<
  ModulePageRouteProps,
  ModulePageRouteState
> {
  historyListener: any;
  request: any;

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
    console.log(this.props);

    const { pathname, search } = this.props.location;
    this.historyListener = this.props.history.listen(location => {
      const isSameModule = pathname === location.pathname;
      if (isSameModule) {
        this.fetchView(location);
      }
      // const params = new URLSearchParams(location.search);
      // if (!params.get("view")) {
      //   const dbid = params.get("dbid");
      //   const entry = this.props.ui.sidenav.items.filter(
      //     item => item.id === dbid
      //   );
      //   if (entry && entry[0].children) {
      //     const url = entry[0].children[0].url + "&dbid=" + dbid;
      //     this.props.history.push(`${pathname}?${url}`);
      //   }
      // }
    });

    // const params = new URLSearchParams(this.props.location.search);
    // if (!params.get("view")) {
    //   const dbid = params.get("dbid");
    //   const entry = this.props.ui.sidenav.items.filter(
    //     item => item.id === dbid
    //   );
    //   if (entry && entry[0].children) {
    //     const url = entry[0].children[0].url + "&dbid=" + dbid;
    //     this.props.history.push(`${pathname}?${url}`);
    //   }
    // } else {
    this.fetchView(this.props.history.location);
    //}
  }

  componentWillUnmount() {
    this.historyListener && this.historyListener();
    this.request && this.request.cancel();
  }

  fetchView(location: any) {
    // let { search } = location.search;
    // const params = new URLSearchParams(search);
    // if (!params.get("view")) {
    //   return;
    // }

    this.request && this.request.cancel();
    this.request = axios.CancelToken.source();

    // const params = new URLSearchParams(location.search);
    apiService
      .getView(location.search, { cancelToken: this.request.token })
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          // handle error
        }
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
    if (!this.state) {
      return null;
    }

    const { match, location } = this.props;
    const { view, param } = this.state.data;
    const search = new URLSearchParams(location.search);
    const dbid = search.get("dbid") || "";

    return (
      <>
        <header className="content-header">
          <h1 className="header-title">{param.viewTitle}</h1>
        </header>
        <div className="content-actions">
          {view.pageable && (
            <Pagination {...view.pageable} onChange={this.handleChangePage} />
          )}
        </div>
        <div className="content-body" style={{ padding: 0 }}>
          <View
            dbid={dbid}
            data={this.state.data}
            selectedIds={[]}
            onDocumentHover={this.handleDocumentHover}
            onDocumentClick={this.handleDocumentClick}
            onExpandableClick={this.handleExpandableClick}
            onSort={this.handleSort}
            onChangeView={this.handleChangeView}
            onChangePage={this.handleChangePage}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    ...state
  };
};

export default withRouter(connect(mapStateToProps)(ViewContainer));
