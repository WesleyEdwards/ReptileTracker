
export function setTokenToLocalStorage(token: string) {
  localStorage.setItem("reptile-token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("reptile-token");
}

export function removeToken() {
  localStorage.removeItem("reptile-token");
}

export function camelToTitleCase(camelCase: string): string {
  // Returns title case from either camelCase or snake_case
  return camelCase
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());
}
