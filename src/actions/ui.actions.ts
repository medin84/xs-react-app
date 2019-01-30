import { IUIState, INavEntry } from "../interfaces";

export const UI_SET_STATE = "UI_SET_STATE";
export const UI_TOGGLE_SIDENAV = "UI_TOGGLE_SIDENAV";
export const UI_TOGGLE_NAV_ENTRY_EXPANDED = "UI_TOGGLE_NAV_ENTRY_EXPANDED";

export const setUIState = (ui: IUIState) => ({
  type: UI_SET_STATE,
  ui
});

export const toggleSidenav = () => ({
  type: UI_TOGGLE_SIDENAV
});

export const toggleSidenavEntryExpanded = (entry: INavEntry) => ({
  type: UI_TOGGLE_NAV_ENTRY_EXPANDED,
  entry
});
