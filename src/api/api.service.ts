import mockData from "./mockData";
import { IApplicationState } from "../interfaces/IApplicationState";

const context = "XSmart"; // window.location.pathname.split("/")[1];

const fetchSession = (): Promise<IApplicationState> => {
  return fetch(`/${context}/session`)
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
            items: resp.sidenav ? resp.sidenav.items : []
          }
        },
        user: {
          isAuthenticated: resp.isAuthenticated,
          name: resp.user ? resp.user.name : "",
          token: resp.user ? resp.user.token : "",
          displayMailLink: resp.user ? resp.user.displayMailLink : false,
          mailLink: resp.user ? resp.user.mailLink : "",
          theme: resp.user ? resp.user.theme : ""
        }
      }; // as IApplicationState;
    });
};

const login = (login: string, pwd: string, saveauth: boolean) => {
  const params: any = { login, pwd, saveauth };
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return fetch(`/${context}/Login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: searchParams
  }).then(response => response.json());
};

const logout = () => {
  return fetch(`/${context}/Logout`, {
    credentials: "include",
    method: "POST"
  });
};

const _session = () => {
  return Promise.resolve(mockData.authSession).then(response => {
    return response;
  });
};

const _login = (login: string, pwd: string, saveauth: boolean) => {
  return Promise.resolve(mockData.authSession).then(response => {
    return response;
  });
};

const _logout = () => {
  return Promise.resolve(mockData.unAuthsession).then(response => {
    return response;
  });
};

export const apiService = {
  fetchSession: fetchSession,
  login: login,
  logout: logout
};
