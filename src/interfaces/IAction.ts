import { PopUp } from "./PopUp";

export type ActionType = "CLOSE" | "BACK" | "LINK" | "RELOAD" | "ACTION";
export type ActionPayloadType = "ID" | "MODEL" | "ACTION_PAYLOAD";

export interface IAction {
  type?: ActionType;
  payloadType?: ActionPayloadType;
  target?: "MULTIPLE" | "SINGLE" | "NONE";
  method?: "POST" | "PUT" | "DELETE";
  url?: string;
  id: string;
  caption?: string;
  hint?: string;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  confirm?: PopUp;
  notify?: PopUp;
}

export interface IActionPayload<T, P> {
  target: T;
  payload?: P;
}
