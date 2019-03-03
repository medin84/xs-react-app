import { IDominoView, IDominoParam } from "./IDominoView";
import { IAction } from "./IAction";
import { IFormElement } from "./IFormSchema";

export interface IApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  error: {
    code: number;
    message: string;
    errors: { code: number; message: string }[];
  };
}

export interface IApiViewResponse {
  actions: IAction[];
  view: IDominoView;
  param: IDominoParam;
}

export interface IApiDocumentResponse {
  actions: IAction[];
  document: any;
  schema: IFormElement;
}
