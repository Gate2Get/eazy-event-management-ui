import React from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { DataTableColumnType, type DataTableProps } from "./types";
import "./styles.scss";
import { searchGrid } from "../../utils/searchGrid.utils";
import { useBearStore } from "../../store";
import {
  DataTable as PrimeDataTable,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { Input } from "antd";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

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
  const { height, width } = useWindowSize();
  const { screen, collapsed } = useBearStore.appStore();
  const [searchValue, setSearchValue] = React.useState("");
  const [globalFilterValue, setGlobalFilterValue] = React.useState<string>("");
  const [filters, setFilters] = React.useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  React.useEffect(() => {
    const filterColumns = columns
      .filter((column) => column.filterable)
      .reduce((result: any, column) => {
        result[column.key] = {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        };
        return result;
      }, {});
    setFilters(filterColumns);
  }, []);

  const rowRender = (record: any, id: string) => {
    return record[id];
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <Input
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  let tableWidth = width;
  if (screen === "MOBILE") {
    tableWidth = width;
  } else {
    tableWidth = width - (width * 24) / 100;
  }

  if (isSearch) {
    otherProps.globalFilterFields = columns
      .filter((column) => column.filterable)
      .map((column) => column.key);
  }

  const filterElement = (
    options: ColumnFilterElementTemplateOptions,
    column: DataTableColumnType
  ) => {
    return (
      <Input
        value={options.value}
        type="text"
        placeholder={`Search ${column.title}`}
        onChange={(e) => options.filterApplyCallback(e.target.value)}
        className="p-column-filter"
        style={{ width: "100%" }}
        allowClear
      />
    );
  };

  const header = renderHeader();

  return (
    <div style={{ overflowX: "auto", paddingLeft: "10px" }}>
      <PrimeDataTable
        value={data}
        sortMode="multiple"
        removableSort
        showGridlines
        stripedRows
        size="normal"
        scrollable
        scrollHeight={`${height}px`}
        className="data__table"
        filterDisplay="row"
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        // header={header}
        filterIcon={<FilterAltOutlinedIcon />}
        filterClearIcon={<FilterAltOffOutlinedIcon />}
        {...otherProps}
      >
        {otherProps.selectionMode && (
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
        )}
        {columns.map((column) => {
          const otherColProps: any = {};
          if (column.filterElement) {
            otherColProps.filterElement = column.filterElement;
          } else {
            otherColProps.filterElement = (
              options: ColumnFilterElementTemplateOptions
            ) => filterElement(options, column);
          }
          return (
            <Column
              field={column.key as string}
              header={column.title as string}
              sortable={column.sortable}
              body={(record) =>
                column?.render
                  ? column?.render?.(record)
                  : rowRender(record, column.key)
              }
              filter={column.filterable}
              filterPlaceholder={
                column.filterPlaceholder || `Search ${column.title}`
              }
              showFilterMatchModes={true}
              {...otherColProps}
            ></Column>
          );
        })}
      </PrimeDataTable>
    </div>
  );
};
