import { Dispatch } from "redux";

import { IApplicationState } from "../interfaces";
import { setUIState } from "./ui.actions";
import { API } from "../api/api.service";
import { LoginFormState } from "../components/Login";

export const FETCH_SESSION = "FETCH_SESSION";
export const FETCH_SESSION_SUCCESS = "FETCH_SESSION_SUCCESS";
export const FETCH_SESSION_FAILURE = "FETCH_SESSION_FAILURE";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

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
  type: LOGIN_FAILURE,
  error
});

export const fetchSession = () => async (dispatch: Dispatch) => {
  await API.fetchSession()
    .then(response => {
      dispatch(setUIState(response.ui));
      dispatch(fetchSessionSuccess(response));
    })
    .catch(err => {
      dispatch(fetchSessionFailure(err));
    });
};

export const login = (loginState: LoginFormState) => (dispatch: Dispatch) => {
  API.login(loginState)
    .then(() => {
      fetchSession()(dispatch);
    })
    .catch(err => {
      dispatch(loginError(err));
    });
};

export const logout = () => (dispatch: Dispatch) => {
  API.logout().finally(() => {
    dispatch({ type: LOGOUT });
  });
};
