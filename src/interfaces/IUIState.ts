import { INavEntry } from "./INavEntry";

export interface IUIState {
  orgName: string;
  title: string;
  logo: string;
  theme: string;
  langs: string[];
  isMobile: boolean;
  navbarModuleSwitcherVisible: boolean;
  sidenav: {
    gamburger: boolean;
    open: boolean;
    items: INavEntry[];
    expanded: string[];
  };
}
