import { useMemo } from "react";
import { User } from "./useApi";

export function useApiSingleUser(login: string) {
  const userNameUrl = "https://api.github.com/users/";

  return useMemo(
    () => ({
      fetchSingleUser: async () => {
        //first we stream users of page 10
        let expandedUsers = [];
        //Than for each user we create a costum url so we can fetch the expanded user data

        let url = userNameUrl + login;
        expandedUsers.push(await fetch(url).then((r) => r.json()));

        return expandedUsers as User[];
      },
    }),
    []
  );
}
