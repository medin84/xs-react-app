import {
  UI_SET_STATE,
  UI_MODULE_SWITCHER_VISIBLE,
  UI_MODULE_SWITCHER_HIDDEN,
  UI_SIDENAV_VISIBLE,
  UI_SIDENAV_HIDDEN,
  UI_TOGGLE_SIDENAV,
  UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY
} from "../actions/ui.actions";
import { IUIState } from "../interfaces";

interface IAction {
  type: string;
  ui: IUIState;
}

const initialState: IUIState = {
  orgName: "",
  title: "",
  logo: "",
  theme: "",
  langs: [],
  navbarModuleSwitcherVisible: false,
  sidenav: {
    gamburger: true,
    open: true,
    items: [],
    expanded: []
  }
};

const ui = (state = initialState, action: any): IUIState => {
  let sidenav;

  switch (action.type) {
    case UI_SET_STATE:
      return { ...action.ui };

    case UI_TOGGLE_SIDENAV:
      sidenav = { ...state.sidenav, open: !state.sidenav.open };
      return { ...state, sidenav };

    case UI_MODULE_SWITCHER_VISIBLE:
      return { ...state, navbarModuleSwitcherVisible: true };

    case UI_MODULE_SWITCHER_HIDDEN:
      return { ...state, navbarModuleSwitcherVisible: false };

    case UI_SIDENAV_VISIBLE:
      return { ...state, sidenav: { ...state.sidenav, open: true } };

    case UI_SIDENAV_HIDDEN:
      return { ...state, sidenav: { ...state.sidenav, open: false } };

    case UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY:
      const entryIndex = state.sidenav.expanded.indexOf(action.entry.id),
        isExpanded = entryIndex != -1;
      let expanded;

      if (isExpanded) {
        expanded = [...state.sidenav.expanded];
        expanded.splice(entryIndex, 1);
      } else {
        expanded = [...state.sidenav.expanded];
        expanded.push(action.entry.id);
      }

      sidenav = { ...state.sidenav, expanded };
      return { ...state, sidenav };

    default:
      return state;
  }
};

export default ui;
