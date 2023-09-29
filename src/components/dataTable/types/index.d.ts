import { type ColumnsType } from "antd/es/table";
import { type DataTableType } from "../../types";
import { type TableProps } from "antd";
import { type SortOrder } from "antd/es/table/interface";

export type DataTableProps = {
  isSearch?: boolean;
  data: DataTableType[];
  columns: ColumnsType<DataTableType>;
  sortKeys?: string[];
  isVirtualization?: boolean;
  otherProps?: TableProps<any>;
  rowHeight?: number;
  isScroll?: boolean;
  comparatorFn?: Record<
    string,
    (a: any, b: any, sortOrder?: SortOrder) => number
  >;
  handleInfiniteScroll?: (item: GridOnItemsRenderedProps) => void;
};
