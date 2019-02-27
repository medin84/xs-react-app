import React from "react";

interface Props {
  query: string;
  prev: boolean;
  next: boolean;
  page: number;
  onChange: (query: string, page: number) => void;
}

class Pagination extends React.PureComponent<Props> {
  render() {
    const { query, prev, next, page, onChange } = this.props;

    return (
      <div className="pagination">
        <button
          type="button"
          className="pagination__page -arrow -prev"
          disabled={!prev}
          onClick={() => {
            onChange(query, page - 1);
          }}
        >
          &nbsp;
        </button>
        <div className="pagination__select">
          <div className="pagination__select_header">
            {query} = <b>{page}</b>
          </div>
        </div>
        <button
          type="button"
          className="pagination__page -arrow -next"
          disabled={!next}
          onClick={() => {
            onChange(query, page + 1);
          }}
        >
          &nbsp;
        </button>
      </div>
    );
  }
}

export default Pagination;
