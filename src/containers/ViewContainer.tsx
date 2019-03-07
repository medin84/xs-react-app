import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

import {
  IApiViewResponse,
  IApplicationState,
  IDominoViewColumn,
  IDominoViewRow
} from "../interfaces";
import { apiService } from "../api/api.service";
import View from "../components/view/View";
import { Pagination } from "../components/Pagination";
import { LoadSpinner } from "../components/LoadSpinner";

interface Props extends IApplicationState, RouteComponentProps {
  embedded?: boolean;
  query?: string;
}

interface State {
  loading: boolean;
  dbid: string;
  query: string;
  data?: IApiViewResponse;
}

class ViewContainer extends React.Component<Props, State> {
  historyListener: any;
  request: any;

  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      loading: false,
      query: props.location.search,
      dbid: ""
    };

    this.handleDocumentHover = this.handleDocumentHover.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleExpandableClick = this.handleExpandableClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    if (this.props.embedded) {
      if (this.props.query) {
        this.fetchView(new URLSearchParams(this.props.query));
      }
    } else {
      const { pathname, search } = this.props.location;
      this.fetchView(new URLSearchParams(search));

      this.historyListener = this.props.history.listen(location => {
        const isSamePath = pathname === location.pathname;
        if (isSamePath) {
          this.fetchView(new URLSearchParams(location.search));
        }
      });
    }
  }

  componentWillReceiveProps() {
    if (this.props.embedded && this.props.query) {
      this.doQuery(new URLSearchParams(this.props.query));
    }
  }

  componentWillUnmount() {
    this.historyListener && this.historyListener();
    this.request && this.request.cancel();
  }

  doQuery(search: URLSearchParams) {
    if (this.props.embedded) {
      this.fetchView(search);
    } else {
      const { pathname } = this.props.location;
      this.props.history.push(`${pathname}?${search}`);
    }
  }

  fetchView(params: URLSearchParams) {
    if (!params.get("view")) {
      return;
    }

    this.request && this.request.cancel();
    this.request = axios.CancelToken.source();

    this.setState(state => ({ ...state, loading: true }));

    const dbid = params.get("dbid") || "";

    apiService
      .getView(`?${params}`, { cancelToken: this.request.token })
      .then(response => {
        this.setState({
          loading: false,
          query: `?${params}`,
          dbid: dbid,
          data: response.data
        });
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          this.setState(state => ({ ...state, loading: false }));
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
    const params = new URLSearchParams(this.state.query);
    params.delete("collapse");
    params.delete("expand");
    params.set(row.expanded ? "collapse" : "expand", row.pos);

    this.fetchView(params);
  }

  handleSort(column: IDominoViewColumn) {
    const params = new URLSearchParams(this.state.query);
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

    params.delete("page");
    params.delete("sort");

    if (sortDirection) {
      params.set("sort", `${column.index},${sortDirection}`);
    }

    this.doQuery(params);
  }

  handleChangeView(viewName: string) {
    const params = new URLSearchParams(this.state.query);
    params.set("view", viewName);
    params.delete("sort");
    params.delete("page");

    this.doQuery(params);
  }

  handleChangePage(parameter: string, page: number) {
    const params = new URLSearchParams(this.state.query);
    params.set(parameter, `${page}`);

    this.doQuery(params);
  }

  render() {
    if (this.props.embedded && !this.props.query) {
      return (
        <div>
          [ViewContainer configuration error] > when embedded "query" is
          required
        </div>
      );
    }

    const { loading, dbid, data } = this.state;
    if (loading && !data) {
      return <LoadSpinner />;
    }

    if (!data) {
      return null;
    }

    const { actions, view, param } = data;

    return (
      <>
        {this.state.loading && <LoadSpinner />}
        <header className="content-header">
          <h1 className="header-title">{param.viewTitle}</h1>
        </header>
        {(actions || view.pageable) && (
          <div className="content-actions">
            {view.pageable && (
              <Pagination
                {...view.pageable}
                label="Page"
                onChange={this.handleChangePage}
              />
            )}
          </div>
        )}
        <div className="content-body" style={{ padding: 0 }}>
          <View
            dbid={dbid}
            data={data}
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
