export interface INavEntry {
  id: string;
  url: string;
  caption: string;
  count?: number;
  unread?: number;
  children?: INavEntry[];
  expanded?: boolean;
}
