import { type ColumnsType } from "antd/es/table";
import { type DataTableType } from "../../types";
import { type TableProps } from "antd";
import { type SortOrder } from "antd/es/table/interface";
import { DataTableBaseProps } from "primereact/datatable";
import { ColumnFilterElementTemplateOptions } from "primereact/column";

export type DataTableColumnType = {
  key: string;
  dataIndex: string;
  title: string;
  render?: (data: any, options?: ColumnBodyOptions) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  dataType?: "text" | "numeric" | "date" | string | undefined;
  filterElement?:
    | React.ReactNode
    | ((options: ColumnFilterElementTemplateOptions) => React.ReactNode);
};

export type DataTableProps = {
  isSearch?: boolean;
  data: DataTableType[];
  columns: DataTableColumnType[];
  sortKeys?: string[];
  isVirtualization?: boolean;
  otherProps?: DataTableBaseProps;
  rowHeight?: number;
  isScroll?: boolean;
  comparatorFn?: Record<
    string,
    (a: any, b: any, sortOrder?: SortOrder) => number
  >;
  handleInfiniteScroll?: (item: GridOnItemsRenderedProps) => void;
};
