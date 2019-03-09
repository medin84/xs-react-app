import { IApplicationState } from "../interfaces";

const sideNavItems: any[] = [];

const authSession: IApplicationState = {
  ui: {
    orgName: "MT",
    title: "Title",
    logo: "/static/logo.png",
    theme: "cinzento",
    langs: [],
    isMobile: false,
    navbarModuleSwitcherVisible: true,
    sidenav: {
      gamburger: true,
      open: true,
      items: sideNavItems,
      expanded: []
    }
  },
  user: {
    isAuthenticated: true,
    name: "medin",
    theme: "cinzento",
    displayMailLink: true,
    token: "",
    mailFilePath: "",
    mailLink: "",
    error: null
  }
};

const unAuthsession: IApplicationState = {
  ui: {
    orgName: "MT",
    title: "Title",
    logo: "/static/logo.png",
    theme: "cinzento",
    langs: [],
    isMobile: false,
    navbarModuleSwitcherVisible: false,
    sidenav: {
      gamburger: true,
      open: true,
      items: sideNavItems,
      expanded: []
    }
  },
  user: {
    isAuthenticated: false,
    name: "",
    theme: "",
    displayMailLink: false,
    token: "",
    mailFilePath: "",
    mailLink: "",
    error: null
  }
};

export default {
  authSession,
  unAuthsession
};
