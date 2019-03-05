export interface INavEntry {
  id: string;
  url: string;
  defaultUrl?: string;
  caption: string;
  icon: string;
  count?: number;
  unread?: number;
  children?: INavEntry[];
  expanded?: boolean;
}
