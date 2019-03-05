import React from "react";

export function LoadSpinner() {
  const styles: React.CSSProperties = {
    color: "red",
    position: "absolute",
    top: "1%",
    left: "50%",
    zIndex: 999
  };

  return <div style={styles}>Loading</div>;
}
