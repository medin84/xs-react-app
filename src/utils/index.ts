export function isMobileBrowser(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isMobile(): boolean {
  return isMobileBrowser() || window.innerWidth < 1024;
}

export function assert(
  condition: any,
  message?: string | undefined,
  props?: any
) {
  if (!condition) {
    if (props) {
      console.error && console.error(message || "Assertion Failed", props);
    }
    throw new Error(message || "Assertion Failed");
  }
}
