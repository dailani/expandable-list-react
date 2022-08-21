import { useMemo } from "react";

export interface User {
  login: string;
  avatar_url: string;
  //added
  html_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  hireable: string;
  email: string;
}

//Updated API so it returns the expanded list of users data (...login , name , email ...)
export function useApi() {
  const usersUrl = "https://api.github.com/users?per_page=10";
  const userNameUrl = "https://api.github.com/users/";

  return useMemo(
    () => ({
      fetchUsers: async () => {
        //first we stream users of page 10
        const usersJson = await fetch(usersUrl).then((r) => r.json());
        let expandedUsers = [];
        //Than for each user we create a costum url so we can fetch the expanded user data
        for (const user of usersJson) {
          let url = userNameUrl + user.login;
          expandedUsers.push(await fetch(url).then((r) => r.json()));
        }
        return expandedUsers as User[];
      },
    }),
    []
  );
}
