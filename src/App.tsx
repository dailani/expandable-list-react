import "./styles.scss";
import GeneralList from "./GeneralList";
import { useApi, User } from "./useApi";
import { useEffect, useState } from "react";

export default function App(): JSX.Element {
  const { fetchUsers } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((u) => {
        setUsers(u);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [fetchUsers]);

  return (
    <GeneralList<User>
      data={users}
      isLoading={isLoading}
      columns={[
        {
          header: "Image",
          display: (v) => <img src={v.avatar_url} width="30" alt={v.login} />
        },
        {
          header: "Login",
          key: "login"
        }
      ]}
    />
  );
}
