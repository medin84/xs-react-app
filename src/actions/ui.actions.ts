import { IUIState, INavEntry } from "../interfaces";

export const UI_SET_STATE = "UI_SET_STATE";
export const UI_MOBILE = "UI_MOBILE";
export const UI_MODULE_SWITCHER_VISIBLE = "UI_MODULE_SWITCHER_VISIBLE";
export const UI_MODULE_SWITCHER_HIDDEN = "UI_MODULE_SWITCHER_HIDDEN";
export const UI_SIDENAV_OPEN = "UI_SIDENAV_OPEN";
export const UI_SIDENAV_CLOSE = "UI_SIDENAV_CLOSE";
export const UI_TOGGLE_SIDENAV = "UI_TOGGLE_SIDENAV";
export const UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY =
  "UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY";

export const setUIState = (ui: IUIState) => ({
  type: UI_SET_STATE,
  ui
});

export const setMobile = (isMobile: boolean) => ({
  type: UI_MOBILE,
  isMobile
});

export const setModuleSwitcherVisible = () => ({
  type: UI_MODULE_SWITCHER_VISIBLE
});

export const setModuleSwitcherHidden = () => ({
  type: UI_MODULE_SWITCHER_HIDDEN
});

export const setSidenavOpen = () => ({
  type: UI_SIDENAV_OPEN
});

export const setSidenavClose = () => ({
  type: UI_SIDENAV_CLOSE
});

export const toggleSidenav = () => ({
  type: UI_TOGGLE_SIDENAV
});

export const toggleCollapsibleSidenavEntry = (entry: INavEntry) => ({
  type: UI_TOGGLE_COLLAPSIBLE_NAV_ENTRY,
  entry
});
