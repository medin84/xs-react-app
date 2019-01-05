import { apiService } from "../api/api.service";
import StateService from "./state.service";

import mockData from "../api/mockData";
import { LoginState } from "../components/Login";

export default class AppService {
  isReady: boolean = false;
  state: StateService;

  constructor() {
    this.state = new StateService();
  }

  fetchSession() {
    return apiService.fetchSession();
  }

  login(credentials: LoginState) {
    // return Promise.resolve(mockData.authSession).then(response => {
    //   this.state.user = response.user;
    //   this.state.user.name = credentials.login;
    //   return response;
    // });
    return apiService.login(
      credentials.login,
      credentials.pwd,
      credentials.saveAuth
    );
  }

  logout() {
    // return Promise.resolve(mockData.unAuthsession).then(response => {
    //   this.state.user = response.user;
    //   return response;
    // });
    return apiService.logout();
  }
}
