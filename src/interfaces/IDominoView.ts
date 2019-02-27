export interface IDominoView {
  cols: IDominoViewColumn[];
  rows: IDominoViewRow[];
  columnCount: number;
  pageable: IPageable;
}

export interface IDominoViewColumn {
  category: boolean;
  response: boolean;
  fontBold: boolean;
  fontItalic: boolean;
  twistie: boolean;
  icon: boolean;
  total: boolean;
  index: number;
  sort: "ASC" | "DESC" | "BOTH";
  sorted: "ASC" | "DESC";
  title: string;
  name: string;
  resortToViewName: string;
  color: string;
  alignment: number;
  width: number;
  computedWidth: string;
}

export interface IDominoViewRow {
  type: "CATEGORY" | "DOCUMENT" | "RESPONSE" | "TOTAL";
  disabled: boolean;
  valid: boolean;
  expandable: boolean;
  expanded: boolean;
  indentLevel: number;
  pageable: IPageable;
  startPos: string;
  endPos: string;
  pos: string;
  unid: string;
  form: string;
  cells: string[];
  children?: IDominoViewRow[];
}

export interface IPageable {
  query: string;
  prev: boolean;
  next: boolean;
  page: number;
}
