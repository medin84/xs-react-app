import mockData from "./mockData";
import { IApplicationState } from "../interfaces";
import { LoginState } from "../components/Login";

const context = window.location.pathname.split("/")[1];

const fetchSession = async (): Promise<IApplicationState> => {
  return await fetch(`/${context}/session`)
    .then(response => {
      return response.json ? response.json() : Object.create({});
    })
    .then(resp => {
      return {
        ui: {
          orgName: resp.orgName,
          title: resp.title,
          logo: resp.logo,
          theme: resp.theme,
          langs: [],
          sidenav: {
            gamburger: true,
            open: true,
            items: mockData.authSession.ui.sidenav.items // resp.sidenav ? resp.sidenav.items : []
          }
        },
        user: {
          isAuthenticated: resp.isAuthenticated,
          name: resp.user ? resp.user.name : "",
          token: resp.user ? resp.user.token : "",
          displayMailLink: resp.user ? resp.user.displayMailLink : false,
          mailFilePath: resp.user ? resp.user.mailFilePath : "",
          mailLink: resp.user ? resp.user.mailLink : "",
          theme: resp.user ? resp.user.theme : ""
        }
      }; // as IApplicationState;
    });
};

const login = async (login: LoginState) => {
  const params: any = { ...login };
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return await fetch(`/${context}/Login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: searchParams
  }).then(response => response.json());
};

const logout = async () => {
  return await fetch(`/${context}/Logout`, {
    credentials: "include",
    method: "POST"
  });
};

const _fetchSession = async (): Promise<IApplicationState> => {
  return await Promise.resolve(mockData.authSession);
};

const _login = async (login: LoginState) => {
  if (login.login == "developer") {
    return await Promise.resolve(mockData.authSession);
  }
  return await Promise.reject(mockData.unAuthsession);
};

const _logout = async () => {
  return await Promise.resolve(mockData.unAuthsession).then(response => {
    return response;
  });
};

const getViewEntries = async (query: string) => {
  return await fetch(`/${context}/api/view${query}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }).then(response => response.json());
};

const getDocuments = async (query: string) => {
  return await fetch(`/${context}/api/documents${query}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }).then(response => response.json());
};

const getDocument = async (query: string) => {
  return await fetch(`/${context}/api/document${query}`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }).then(response => response.json());
};

export const apiService = {
  fetchSession: fetchSession,
  login: login,
  logout: logout,
  getViewEntries,
  getDocuments,
  getDocument
};
