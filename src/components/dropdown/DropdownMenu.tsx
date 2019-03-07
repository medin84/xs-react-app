import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function DropdownMenu(props: Props): React.ReactElement {
  return (
    <div className={`dropdown-menu ${props.className}`}>{props.children}</div>
  );
}
