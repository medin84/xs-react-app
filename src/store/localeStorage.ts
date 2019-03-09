import { IApplicationState } from "../interfaces";

export const loadState = (): IApplicationState | undefined => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {}
  return undefined;
};

export const saveState = (state: IApplicationState) => {
  try {
    const savedState = {
      // : IApplicationState
      ui: {
        sidenav: {
          open: state.ui.sidenav.open,
          expanded: state.ui.sidenav.expanded
        }
      }
    };
    const serializedState = JSON.stringify(savedState);
    localStorage.setItem("state", serializedState);
  } catch (err) {}
};
