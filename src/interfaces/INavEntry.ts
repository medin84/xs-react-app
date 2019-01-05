export interface INavEntry {
  item: string;
  id: string;
  tid: string;
  type: string;
  url: string;
  hint: string;
  caption: string;
  children?: INavEntry[];
  expanded?: boolean;
}
