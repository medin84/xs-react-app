import axios from "axios";

//
import mockData from "./mock-data/session";
import InFormSchema from "./mock-data/in";
import KrFormSchema from "./mock-data/kr";
import kiFormSchema from "./mock-data/ki";
import DefaultFormSchema from "./mock-data/default-schema";
//
import config from "../config";
import {
  IAction,
  IDocument,
  IApplicationState,
  IApiResponse,
  IApiViewResponse,
  IApiDocumentResponse
} from "../interfaces";
import { isMobile } from "../utils";
import { loadState } from "../store/localeStorage";
import { LoginFormState } from "../components/Login";

const fetchSession = (): Promise<IApplicationState> => {
  return axios
    .get(`${config.HOST}/session`)
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
          theme: resp.user ? resp.user.theme : "",
          error: null
        }
      }; // as IApplicationState;
    });
};

const login = (login: LoginFormState): Promise<any> => {
  const authCredentials = new URLSearchParams();
  authCredentials.set("login", login.login);
  authCredentials.set("pwd", login.pwd);
  authCredentials.set("saveauth", login.saveAuth ? "1" : "");

  return axios({
    url: `${config.HOST}/Login`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: authCredentials
  });
};

const logout = (): Promise<any> => {
  return axios.post(`${config.HOST}/Logout`);
};

const getView = (
  search: URLSearchParams,
  params?: { cancelToken?: any }
): Promise<IApiResponse<IApiViewResponse>> => {
  return axios
    .get(`${config.API_HOST}/view?${search}`, params)
    .then(response => response.data)
    .then(data => {
      const _data: IApiResponse<IApiViewResponse> = data;
      _data.data.actions = [
        {
          type: "RELOAD",
          id: "RELOAD",
          icon: "fa fa-refresh"
        }
      ];
      return _data;
    });
};

const getDocuments = (
  search: URLSearchParams,
  params?: { cancelToken?: any }
): Promise<IApiResponse<IApiViewResponse>> => {
  return axios
    .get(`${config.API_HOST}/documents?${search}`, params)
    .then(response => response.data);
};

const getDocument = (
  search: URLSearchParams,
  params?: { cancelToken?: any }
): Promise<IApiResponse<IApiDocumentResponse>> => {
  return axios
    .get(`${config.API_HOST}/document?${search}`, params)
    .then(response => response.data)
    .then(data => {
      const _data: IApiResponse<IApiDocumentResponse> = data;
      _data.data.schema = getFormSchema(_data.data.document["@form"]);
      return _data;
    });
};

const doDocumentsActionRequest = (
  action: IAction,
  documents: IDocument<any>[],
  payload: any
): Promise<IApiResponse<IApiDocumentResponse>> => {
  return axios
    .post(`${config.API_HOST}`, {
      method: action.id,
      id: action.id,
      params: { documents, payload }
    })
    .then(response => response.data);
};

////////////
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
////////////

export const apiService = {
  fetchSession: config.isEnvProduction ? fetchSession : _fetchSession,
  login: config.isEnvProduction ? login : _login,
  logout: config.isEnvProduction ? logout : _logout,
  getView,
  getDocuments,
  getDocument,
  doDocumentsActionRequest
};
