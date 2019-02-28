import React from "react";
import { ModuleLinks } from "./ModuleLinks";
import { INavEntry } from "../interfaces";

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
