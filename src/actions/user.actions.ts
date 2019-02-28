import { Dispatch } from "redux";

import { URL_LOGIN, URL_WS } from "../constants/UrlConstants";
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

export const fetchSession = (history?: any) => async (dispatch: Dispatch) => {
  await apiService
    .fetchSession()
    .then(response => {
      dispatch(fetchSessionSuccess(response));
      dispatch(setUIState(response.ui));
      history && history.push(URL_WS);
    })
    .catch(err => {
      dispatch(fetchSessionFailure(err));
    });
};

export const login = (history: any, loginState: LoginState) => (
  dispatch: Dispatch
) => {
  apiService
    .login(loginState)
    .then(() => {
      fetchSession(history)(dispatch);
      history.push(URL_WS);
    })
    .catch(err => {
      dispatch(loginError(err));
    });
};

export const logout = (history: any) => (dispatch: Dispatch) => {
  apiService.logout().finally(() => {
    history.push(URL_LOGIN);
    dispatch({ type: LOGOUT });
  });
};
