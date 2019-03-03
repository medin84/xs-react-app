import React from "react";

import { INavEntry } from "../interfaces";
import { ModuleLinks } from "./ModuleLinks";

interface Props {
  modules: INavEntry[];
}

export function WorkspaceDbGrid(props: Props) {
  return (
    <div className="ws_modules_grid__container animation-slide-down">
      <ModuleLinks style="GRID" modules={props.modules} />
    </div>
  );
}
