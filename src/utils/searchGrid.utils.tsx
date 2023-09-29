import React, { type Dispatch } from "react";
import { GenericJsonType } from "../types";

export const searchGrid = (
  searchText: string,
  data: GenericJsonType[],
  searchKeys?: string[]
): GenericJsonType[] => {
  let filteredData = data;
  if (searchKeys?.length) {
    filteredData = data.filter((item: GenericJsonType) => {
      return Object.entries(item).some(
        (val) =>
          searchKeys.includes(val[0]) &&
          val?.[1]
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase())
      );
    });
  } else {
    filteredData = data.filter((item: GenericJsonType) => {
      return Object.values(item).some((val) =>
        val?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      );
    });
  }
  return filteredData;
};
