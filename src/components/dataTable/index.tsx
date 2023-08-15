import React from "react";
import { compare } from "../../utils/comparator.utils";
import { useWindowSize } from "../../hooks/useWindowSize";
import { VirtualTable } from "../virtualTable";
import { type DataTableProps } from "./types";
import { type ColumnType } from "antd/es/table";
import "./styles.scss";
import { type SortOrder } from "antd/es/table/interface";

export const DataTable = (props: DataTableProps): React.ReactElement => {
  const {
    data,
    columns,
    sortKeys,
    isVirtualization,
    rowHeight,
    isScroll = true,
    otherProps = {},
    comparatorFn,
    handleInfiniteScroll,
  } = props;

  const { height } = useWindowSize();

  columns.forEach((column: ColumnType<any>) => {
    if (sortKeys?.length && sortKeys.includes(column.dataIndex as string)) {
      column.sorter = (a: any, b: any, sortOrder?: SortOrder) => {
        return comparatorFn?.[column?.dataIndex as string]
          ? comparatorFn?.[column?.dataIndex as string]?.(a, b, sortOrder)
          : compare(
              a[column.dataIndex as string],
              b[column.dataIndex as string]
            );
      };
    }
  });

  if (isScroll) {
    // @TODO: Need to revisit the height - 220
    otherProps.scroll = { y: height - 220 };
  }

  return (
    <VirtualTable
      className="data__table"
      columns={columns}
      dataSource={data}
      handleInfiniteScroll={handleInfiniteScroll}
      isVirtualization={isVirtualization}
      pagination={false}
      rowHeight={rowHeight}
      size="small"
      {...otherProps}
    />
  );
};
