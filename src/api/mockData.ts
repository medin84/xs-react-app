import { IApplicationState } from "../interfaces";

const sideNavItems: any[] = [];

const authSession: IApplicationState = {
  ui: {
    orgName: "mt",
    title: "Title",
    logo: "/static/logo.png",
    theme: "cinzento",
    langs: [],
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
    mailLink: "/XSmart/mail"
  }
};

const unAuthsession: IApplicationState = {
  ui: {
    orgName: "mt",
    title: "Title",
    logo: "/static/logo.png",
    theme: "cinzento",
    langs: [],
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
    mailLink: ""
  }
};

export default {
  authSession,
  unAuthsession
};
