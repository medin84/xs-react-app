import {
  FETCH_SESSION,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  FETCH_USER_PROFILE,
  UPDATE_USER_PROFILE
} from "../actions/user.actions";
import { IUserState } from "../interfaces";

interface IAction {
  type: string;
  user: IUserState;
  loginError: any;
}

const initialState: IUserState = {
  isAuthenticated: false,
  name: "",
  token: "",
  displayMailLink: false,
  mailFilePath: "",
  mailLink: "",
  theme: ""
};

const user = (state = initialState, action: IAction): IUserState => {
  switch (action.type) {
    case FETCH_SESSION:
      return { ...action.user };

    case FETCH_SESSION_SUCCESS:
      return { ...action.user };

    case FETCH_SESSION_FAILURE:
      return initialState;

    case LOGIN:
      return { ...action.user };

    case LOGIN_SUCCESS:
      return { ...action.user };

    case LOGIN_FAILURE:
      return { initialState, ...action.loginError };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default user;
