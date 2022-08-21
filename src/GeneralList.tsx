import React, { ReactNode, useState } from "react";
import { Table } from "react-bootstrap";

import "./GeneralList.scss";
import LoadingArea from "./LoadingArea";
import { User } from "./useApi";
import { Descriptions } from "antd";
import "bootstrap/js/src/collapse.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpandedRow from "./components/ExpandedRow";
export interface TableColumn<T> {
  /** What is displayed as the header of this column */
  header: string;
  /** Use this to simply show the content of this data property inside the current cell */
  key?: keyof T;
  /** Use this to customize the content of a cell, if specified it will take precedence over `key` */
  display?: (v: T) => ReactNode;
}

export interface GeneralListProps<T> {
  /** Config for the columns */
  columns: TableColumn<T>[];
  /** The data to display */
  data: T[];
  /** If true, shows a loading animation */
  isLoading?: boolean;
  /** Styles for the table component */
  style?: React.CSSProperties;
}

/**
 * Renders the header of the table.
 */
function ListHeader<T>({ columns }: Partial<GeneralListProps<T>>) {
  return (
    <thead>
      <tr>
        {columns?.map((c) => (
          <th key={c.header}>{c.header}</th>
        ))}
      </tr>
    </thead>
  );
}

export interface ListRowProps<T> extends Omit<GeneralListProps<T>, "data"> {
  dataPoint: T;
  index: number;
}

//added
function getUserUrl(dataPoint: any): string {
  let url = (dataPoint as User).html_url;
  return url;
}

/**
 * Renders a single row of the table.
 */
function ListRow<T>({ columns, dataPoint, index }: ListRowProps<T>) {
  function displayFn<T>(c: TableColumn<T>) {
    return c.display ?? ((a) => (c.key ? a[c.key] : a));
  }

  return (
    <>
      <tr
        className="tableRow"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target={"#multiCollapseExample" + index}
        aria-expanded="true"
        aria-controls={"multiCollapseExample" + index}
      >
        {columns.map((c, j) =>
          c.header == "Login" ? (
            <td key={j}>
              <a href={getUserUrl(dataPoint)}>
                <div>{displayFn(c)(dataPoint)}</div>
              </a>
            </td>
          ) : (
            <td key={j}>{displayFn(c)(dataPoint)}</td>
          )
        )}
      </tr>
      {columns.map(
        (c, j) =>
          c.header == "Image" && (
            <div
              className="collapse multi-collapse"
              id={"multiCollapseExample" + index}
            >
              {console.log(
                "The original with index " + index + JSON.stringify(dataPoint)
              )}
              <ExpandedRow dataPoint={dataPoint}></ExpandedRow>
            </div>
          )
      )}
    </>
  );
}

/**
 * Renders the table body
 */
//<ExpandedRow className={""}></ExpandedRow>
function ListBody<T>({ columns, data }: GeneralListProps<T>) {
  return (
    <tbody>
      {data.map((dataPoint, i) => (
        <>
          <ListRow key={i} {...{ columns }} dataPoint={dataPoint} index={i} />
        </>
      ))}
    </tbody>
  );
}

/**
 * A simple list displayed as a table.
 */
function GeneralList<T>({
  columns,
  data,
  isLoading,
  style,
}: GeneralListProps<T>) {
  return (
    <Table striped style={style} hover>
      <ListHeader columns={columns} />
      <LoadingArea isLoading={isLoading || false}>
        {data.length ? (
          <ListBody {...{ columns, data }} />
        ) : (
          <tbody>
            <tr className="text-center p-5">
              <td colSpan={columns.length}>Keine Daten verfügbar.</td>
            </tr>
          </tbody>
        )}
      </LoadingArea>
    </Table>
  );
}

export default GeneralList;
