export function isMobileBrowser(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function isMobile(): boolean {
  return isMobileBrowser() || window.innerWidth < 1024;
}
