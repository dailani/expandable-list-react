import React, { ReactNode } from "react";
import { Table } from "react-bootstrap";

import "./GeneralList.scss";
import LoadingArea from "./LoadingArea";
import { User } from "./useApi";

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

function getUserUrl(dataPoint: any): string {
  let url = (dataPoint as User).html_url;
  console.log(url);
  return url;
}

/**
 * Renders a single row of the table.
 */
function ListRow<T>({ columns, dataPoint }: ListRowProps<T>) {
  function displayFn<T>(c: TableColumn<T>) {
    return c.display ?? ((a) => (c.key ? a[c.key] : a));
  }

  return (
    <>
      <tr onClick={() => window.location.assign(getUserUrl(dataPoint))}>
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
        {/* {columns.map((c, j) => (
          <td key={j}>{displayFn(c)(dataPoint)}</td>
        ))} */}
      </tr>
    </>
  );
}

/**
 * Renders the table body
 */
function ListBody<T>({ columns, data }: GeneralListProps<T>) {
  return (
    <tbody>
      {data.map((dataPoint, i) => (
        <ListRow key={i} {...{ columns }} dataPoint={dataPoint} index={i} />
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
    <Table striped style={style}>
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
