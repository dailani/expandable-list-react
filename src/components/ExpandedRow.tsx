import { Descriptions } from "antd";
import React, { ReactNode, useState, useEffect } from "react";
import GeneralList, { TableColumn } from "../GeneralList";
import { useApi, User } from "../useApi";
import { useApiSingleUser } from "../useApiSingleUser";
import "./ExpandedRow.scss";

function ExpandedRow<T>(props: any) {
  const { fetchUsers } = useApi();
  const { fetchSingleUser } = useApiSingleUser(props.dataPoint.login);
  const [singleUsers, setSingleUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //added

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((u) => {
        setIsLoading(false);
      })
      .catch(console.error);
    fetchSingleUser().then((u) => {
      setSingleUsers(u);
    });
  }, [fetchUsers, fetchSingleUser]);

  return (
    <>
      {/* {console.log(
        "This is console from Expanded Row " + JSON.stringify(props.dataPoint)
      )} */}
      <GeneralList<User>
        data={singleUsers}
        isLoading={isLoading}
        columns={[
          {
            header: "Name",
            key: "name",
          },
          {
            header: "Location",
            key: "location",
          },
          {
            header: "Email",
            key: "email",
          },
          {
            header: "Hireable",
            key: "hireable",
          },
        ]}
      />
    </>
  );
}

export default ExpandedRow;
