export interface INavEntry {
  id: string;
  url: string;
  caption: string;
  children?: INavEntry[];
  expanded?: boolean;
}
