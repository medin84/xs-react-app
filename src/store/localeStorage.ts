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
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {}
};
