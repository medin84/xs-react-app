import { combineReducers } from "redux";

import user from "./user.reducer";
import ui from "./ui.reducer";

export default combineReducers({
  user,
  ui
});
