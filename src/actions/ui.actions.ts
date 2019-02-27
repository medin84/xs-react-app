import { IUIState, INavEntry } from "../interfaces";

export const UI_SET_STATE = "UI_SET_STATE";
export const UI_TOGGLE_SIDENAV = "UI_TOGGLE_SIDENAV";
export const UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY =
  "UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY";

export const setUIState = (ui: IUIState) => ({
  type: UI_SET_STATE,
  ui
});

export const toggleSidenav = () => ({
  type: UI_TOGGLE_SIDENAV
});

export const toggleCollapsibleSidenavEntry = (entry: INavEntry) => ({
  type: UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY,
  entry
});
