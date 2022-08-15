import { useMemo } from "react";

export interface User {
  login: string;
  avatar_url: string;
  html_url: string; //added
}

export interface ExpandedUser {
  //added
  id: number;
}

export function useApi() {
  const usersUrl = "https://api.github.com/users?per_page=10";

  return useMemo(
    () => ({
      fetchUsers: async () => {
        const result = await fetch(usersUrl).then((r) => r.json());

        return result as User[];
      },
    }),
    []
  );
}
