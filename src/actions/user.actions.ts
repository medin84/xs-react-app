import { Dispatch } from "redux";

import { IApplicationState } from "../interfaces";
import { setUIState } from "./ui.actions";
import { apiService } from "../api/api.service";
import { LoginState } from "../components/Login";

export const FETCH_SESSION = "FETCH_SESSION";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

const fetchSessionSuccess = (state: IApplicationState) => ({
  type: FETCH_SESSION_SUCCESS,
  ...state
});

const fetchSessionFailure = (state: IApplicationState) => ({
  type: FETCH_SESSION_FAILURE
});

const loginSuccess = (state: IApplicationState) => ({
  type: LOGIN_SUCCESS,
  ...state
});

const loginError = (error: any) => ({
  type: LOGIN_SUCCESS,
  error
});

export const fetchSession = () => async (dispatch: Dispatch) => {
  const response = await apiService.fetchSession();

  if (response.error) {
    dispatch(fetchSessionFailure(response.error));
    return;
  }

  dispatch(fetchSessionSuccess(response));
  dispatch(setUIState(response.ui));
};

export const login = (history: any, loginState: LoginState) => async (
  dispatch: Dispatch
) => {
  const response = await apiService.login(loginState);

  if (response.error) {
    dispatch(loginError(response.error));
    return;
  }

  dispatch(loginSuccess(response));
  dispatch(setUIState(response.ui));
  history.push("/ws");
};

export const logout = (history: any) => async (dispatch: Dispatch) => {
  const response = await apiService.logout();
  history.push("/login");
  dispatch({ type: LOGOUT });
};
