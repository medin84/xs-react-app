import React from "react";

interface Props {
  label?: string;
  query: string;
  prev: boolean;
  next: boolean;
  page: number;
  onChange: (query: string, page: number) => void;
}

export function Pagination(props: Props) {
  const { label = "Page", query, prev, next, page, onChange } = props;

  return (
    <div className="pagination">
      <button
        type="button"
        className={`pagination__page -arrow -prev ${prev ? "" : "-disabled"}`}
        disabled={!prev}
        onClick={() => {
          onChange(query, page - 1);
        }}
      >
        &nbsp;
      </button>
      <div className="pagination__select">
        <div className="pagination__select_header">
          {label} <b>{page}</b>
        </div>
      </div>
      <button
        type="button"
        className={`pagination__page -arrow -next ${next ? "" : "-disabled"}`}
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
