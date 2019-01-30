import { UI_SET_STATE, UI_TOGGLE_SIDENAV } from "../actions/ui.actions";
import { IUIState } from "../interfaces";

interface IAction {
  type: string;
  ui: IUIState;
}

const initialState: IUIState = {
  orgName: "",
  title: "",
  logo: "",
  theme: "",
  langs: [],
  sidenav: {
    gamburger: true,
    open: true,
    items: []
  }
};

const ui = (state = initialState, action: IAction): IUIState => {
  switch (action.type) {
    case UI_SET_STATE:
      return { ...action.ui };

    case UI_TOGGLE_SIDENAV:
      const sidenav = { ...state.sidenav, open: !state.sidenav.open };
      return { ...state, sidenav };

    default:
      return state;
  }
};

export default ui;
