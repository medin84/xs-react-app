import { IAction } from "./IAction";

export interface IFormElement {
  type: string; // "actions" | "block" | "tabs" | "tab" | "fieldset" | "text" | "list" | "date" | "datetime" | "richtext";
  title?: string;
  name?: string;
  icon?: IIcon;
  active?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autofocus?: boolean;
  className?: string;
  placeholder?: string;
  hint?: string;
  value?: {
    datalist?: { value: string; label: string }[];
    url?: string;
    enum?: string[];
    multiple?: boolean;
  };
  children?: IFormElement[];
  actions?: IAction[];
}

export interface IIcon {
  type: "fa" | "image";
  source: string;
}
