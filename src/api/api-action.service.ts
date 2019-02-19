export const doActionRequest = async (query: string) => {
  return await fetch(`/api/document${query}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  }).then(response => response.json());
};
