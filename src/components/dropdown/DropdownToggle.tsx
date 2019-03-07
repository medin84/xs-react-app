import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function DropdownToggle(props: Props): React.ReactElement {
  return (
    <div className={`dropdown-toggle ${props.className}`}>{props.children}</div>
  );
}
