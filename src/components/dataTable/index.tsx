import React from "react";
import { compare } from "../../utils/comparator.utils";
import { useWindowSize } from "../../hooks/useWindowSize";
import { VirtualTable } from "../virtualTable";
import { type DataTableProps } from "./types";
import { type ColumnType } from "antd/es/table";
import "./styles.scss";
import { type SortOrder } from "antd/es/table/interface";
import { Input, Row, Space } from "antd";
import { searchGrid } from "../../utils/searchGrid.utils";
import { useBearStore } from "../../store";

const { Search } = Input;
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
    isSearch,
    handleInfiniteScroll,
  } = props;

  let filteredGrid: any[] = [];
  const { height } = useWindowSize();
  const { screen } = useBearStore.appStore();
  const [searchValue, setSearchValue] = React.useState("");

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

  const onSearch = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  if (searchValue) {
    filteredGrid = searchGrid(searchValue, data);
  }

  return (
    <Row>
      {isSearch && (
        <Search
          placeholder="Search here"
          onSearch={onSearch}
          style={{ width: screen === "MOBILE" ? "100%" : "40%" }}
          size="large"
        />
      )}
      <VirtualTable
        className="data__table"
        columns={columns}
        dataSource={searchValue ? filteredGrid : data}
        handleInfiniteScroll={handleInfiniteScroll}
        isVirtualization={isVirtualization}
        pagination={false}
        rowHeight={rowHeight}
        size="small"
        {...otherProps}
      />
    </Row>
  );
};
