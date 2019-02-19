export type PopUpType = "CONFIRM" | "INFO" | "SUCCESS" | "WARN" | "ERROR";

export interface PopUp {
  type?: PopUpType;
  title: string;
  message?: string;
  progress?: boolean;
}
