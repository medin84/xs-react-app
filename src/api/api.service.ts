import axios from "axios";

import mockData from "./mockData";
import {
  IApplicationState,
  IApiResponse,
  IApiViewResponse,
  IApiDocumentResponse
} from "../interfaces";
import { isMobile } from "../utils";
import { loadState } from "../store/localeStorage";
import { LoginFormState } from "../components/Login";

import InFormSchema from "./form-schema/in";
import KrFormSchema from "./form-schema/kr";
import kiFormSchema from "./form-schema/ki";
import DefaultFormSchema from "./form-schema/default-schema";

const context = "XSmart"; // window.location.pathname.split("/")[1];

const fetchSession = (): Promise<IApplicationState> => {
  return axios
    .get(`/${context}/session`)
    .then(response => {
      return response.data ? response.data : Object.create({});
    })
    .then((resp: any) => {
      const modules = mockData.authSession.ui.sidenav.items;
      let expandedIds: string[] = [];
      let sidenavOpen = true;
      const state = loadState();
      if (state) {
        try {
          expandedIds = state.ui.sidenav.expanded;
          sidenavOpen = state.ui.sidenav.open;
        } catch (e) {}
      }

      return {
        ui: {
          orgName: resp.orgName,
          title: resp.title,
          logo: resp.logo,
          theme: resp.theme,
          langs: [],
          isMobile: isMobile(),
          navbarModuleSwitcherVisible: true,
          sidenav: {
            gamburger: true,
            open: sidenavOpen,
            items: modules, // resp.sidenav ? resp.sidenav.items : []
            expanded: expandedIds
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

const login = (login: LoginFormState): Promise<any> => {
  // const formData = new FormData();
  const params: any = { ...login };
  // Object.keys(params).map(key => {
  //   formData.set(key, params[key]);
  // });
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

  return axios({
    url: `/${context}/Login`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: searchParams
  });
};

const logout = (): Promise<any> => {
  return axios.post(`/${context}/Logout`);
};

const _fetchSession = async (): Promise<IApplicationState> => {
  return await Promise.resolve(mockData.authSession);
};

const _login = async (login: LoginFormState) => {
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

const getView = (
  query: string,
  params?: { cancelToken?: any }
): Promise<IApiResponse<IApiViewResponse>> => {
  return axios
    .get(`/${context}/api/view${query}`, params)
    .then(response => response.data);
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

const getDocument = async (
  query: string,
  params?: { cancelToken?: any }
): Promise<IApiResponse<IApiDocumentResponse>> => {
  return axios
    .get(`/${context}/api/document${query}`, params)
    .then(response => response.data)
    .then(data => {
      const _data: IApiResponse<IApiDocumentResponse> = data;
      _data.data.schema = getFormSchema(_data.data.document["@form"]);
      return _data;
    });
};

const getFormSchema = (formName: string) => {
  switch (formName) {
    case "IN":
      return InFormSchema;
    case "KR":
      return KrFormSchema;
    case "KI":
      return kiFormSchema;
    default:
      return DefaultFormSchema;
  }
};

const isEnvProduction = process.env.NODE_ENV === "production";

export const apiService = {
  fetchSession: isEnvProduction ? fetchSession : _fetchSession,
  login: isEnvProduction ? login : _login,
  logout: isEnvProduction ? logout : _logout,
  getView,
  getDocuments,
  getDocument,
  getFormSchema
};
