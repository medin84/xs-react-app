import { PopUp } from "./PopUp";

type ActionType = "ACTION" | "CLOSE" | "BACK" | "LINK" | "RELOAD";
type ActionPayloadType = "MODEL" | "ACTION_PAYLOAD";

export interface IAction {
  type: ActionType;
  id: string;
  payloadType?: ActionPayloadType;
  target?: "MULTIPLE" | "SINGLE" | "NONE";
  url?: string;
  caption?: string;
  hint?: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  primary?: boolean;
  warning?: boolean;
  confirm?: PopUp;
  notify?: PopUp;
}

export interface IActionPayload<T, P> {
  target: T;
  payload?: P;
}
