export interface IUserState {
  isAuthenticated: boolean;
  errors?: any;
  name: string;
  token: string;
  displayMailLink: boolean;
  mailLink: string;
  theme: string;
}
