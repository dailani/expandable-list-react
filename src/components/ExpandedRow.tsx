import { Descriptions } from "antd";
import React, { ReactNode, useState } from "react";
import { TableColumn } from "../GeneralList";
import "./ExpandedRow.scss";

function ExpandedRow<T>(props: any) {
  return (
    <tr className="expandedDescription">
      <td>
        <div>
          <Descriptions.Item label="This is the label">
            {" "}
            This is an description Item
          </Descriptions.Item>
        </div>
      </td>
    </tr>
  );
}

export default ExpandedRow;
