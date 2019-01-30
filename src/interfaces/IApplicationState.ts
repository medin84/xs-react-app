import { IUserState } from "./IUserState";
import { IUIState } from "./IUIState";

export interface IApplicationState {
  user: IUserState;
  ui: IUIState;
  error?: any;
}
